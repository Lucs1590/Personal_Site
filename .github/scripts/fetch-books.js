const https = require('https');
const fs = require('fs');
const path = require('path');

// Constants from api.service.ts
const BOOKS_API_BASE_URL = 'https://www.goodreads.com/review/list_rss/143641038?key=hjn8cKI_JcIl70XJBRdZu3qKOZpa_4Osfp86sTjvuktrxGPz';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const OUTPUT_PATH = path.join(__dirname, '../../src/assets/static_data/books.json');

// Install fast-xml-parser for XML parsing
const { XMLParser } = require('fast-xml-parser');

/**
 * Normalize XML values (same logic as api.service.ts)
 */
function normalize(val) {
  if (val == null) return undefined;
  if (Array.isArray(val)) val = val[0];
  if (typeof val === 'object') {
    if ('#text' in val) return val['#text'];
    const keys = Object.keys(val);
    if (keys.length === 1) return val[keys[0]];
    return JSON.stringify(val);
  }
  return val;
}

/**
 * Deserialize book data (same logic as Book.deserialize)
 */
function deserializeBook(input) {
  const book = {
    author: input.author,
    title: input.title ? input.title.split(':')[0].split('(')[0].trim() : undefined,
    description: input.description,
    rating: input.rating ? parseInt(input.rating, 10) : 0,
    user_read_at: input.user_read_at ? new Date(input.user_read_at).toISOString() : undefined,
    user_review: input.user_review,
    link: input.link,
    cover: input.cover,
    num_pages: input.num_pages ? parseInt(input.num_pages, 10) : undefined,
  };

  // Process shelves
  if (input.shelves) {
    if (typeof input.shelves === 'string') {
      book.shelves = input.shelves.split(',').map(shelf => shelf.trim());
    } else if (Array.isArray(input.shelves)) {
      book.shelves = input.shelves.map(shelf => shelf.trim());
    } else {
      book.shelves = ['read'];
    }
  } else {
    book.shelves = ['read'];
  }

  return book;
}

/**
 * Fetch data from URL with retry logic
 */
function fetchWithRetry(url, retries = 3, delay = 5000) {
  return new Promise((resolve, reject) => {
    const makeRequest = (attempt) => {
      console.log(`Fetching books data (attempt ${attempt}/${retries})...`);
      
      https.get(url, { timeout: 60000 }, (res) => {
        let data = '';

        if (res.statusCode !== 200) {
          console.error(`HTTP ${res.statusCode}: ${res.statusMessage}`);
          if (attempt < retries) {
            console.log(`Retrying in ${delay}ms...`);
            setTimeout(() => makeRequest(attempt + 1), delay * Math.pow(2, attempt - 1));
          } else {
            reject(new Error(`Failed after ${retries} attempts. Status: ${res.statusCode}`));
          }
          return;
        }

        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', (err) => {
        console.error(`Request error: ${err.message}`);
        if (attempt < retries) {
          console.log(`Retrying in ${delay * Math.pow(2, attempt - 1)}ms...`);
          setTimeout(() => makeRequest(attempt + 1), delay * Math.pow(2, attempt - 1));
        } else {
          reject(err);
        }
      });
    };

    makeRequest(1);
  });
}

/**
 * Main function to fetch and save books data
 */
async function fetchAndSaveBooks() {
  try {
    console.log('Starting books data fetch...');
    
    // Fetch XML from Goodreads via CORS proxy
    const url = `${CORS_PROXY}${encodeURIComponent(BOOKS_API_BASE_URL)}`;
    const xmlData = await fetchWithRetry(url);
    
    console.log('Parsing XML data...');
    const parser = new XMLParser();
    const result = parser.parse(xmlData);
    
    // Extract items (same logic as api.service.ts)
    const channel = result?.rss?.channel;
    const channelObj = Array.isArray(channel) ? channel[0] : channel;
    const itemsRaw = channelObj?.item;
    const items = itemsRaw ? (Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw]) : [];
    
    console.log(`Found ${items.length} books`);
    
    // Parse books data
    const books = items.map(item => {
      const bookData = {
        author: normalize(item.author_name),
        title: normalize(item.title),
        rating: normalize(item.user_rating),
        user_read_at: normalize(item.user_read_at),
        user_review: normalize(item.user_review),
        user_review_link: normalize(item.guid),
        link: normalize(item.link),
        description: normalize(item.book_description),
        cover: normalize(item.book_large_image_url) || normalize(item.book_medium_image_url) || normalize(item.book_small_image_url),
        shelves: normalize(item.user_shelves),
        num_pages: normalize(item.book?.num_pages),
      };
      return deserializeBook(bookData);
    });
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save to JSON file
    const jsonData = JSON.stringify(books, null, 2);
    fs.writeFileSync(OUTPUT_PATH, jsonData, 'utf8');
    
    console.log(`✓ Successfully saved ${books.length} books to ${OUTPUT_PATH}`);
    console.log(`✓ Last updated: ${new Date().toISOString()}`);
    
  } catch (error) {
    console.error('Failed to fetch books:', error);
    process.exit(1);
  }
}

// Run the script
fetchAndSaveBooks();
