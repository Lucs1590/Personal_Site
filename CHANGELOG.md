# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## v1.7.0 (2025-11-16)

### Feat

- **home**: enhance glitch subtitle animations for smoother transitions and effects
- add subtitles to home section for enhanced personal branding
- **home**: enhance glitch subtitle effect with improved styling and animation timing
- **home**: rotating glitch subtitle (translations + interval + styles)
- update sub_title styling and apply class to HTML structure

### Fix

- update LinkedIn profile URL in JSON-LD structured data
- change heading level for 'home.about' section for better semantics
- downgrade @ngx-translate/http-loader to version 16.0.0
- update translate loader configuration to use TranslateLoader and HttpClient
- remove unused HttpClient and simplify translate loader configuration
- simplify httpLoaderFactory by removing unnecessary HttpClient parameter
- update eslint plugins to latest versions and remove unused dependencies
- simplify httpLoaderFactory by removing unnecessary parameters

### Refactor

- streamline metadata update process by removing redundant comments and improving clarity
- update job title and description in JSON-LD structured data; enhance SEO metadata in SeparadorComponent

### Perf

- **home**: smooth enter/leave transitions for rotating subtitle (glitch wrapper)

## v1.6.0 (2025-11-03)

### Feat

- add sorting functionality to book filters
- add filters for book search and year selection in books component
- update date format for book reading year to 'dd/MM/yyyy'
- update currentBook details and add default cover image
- adjust font sizes for logo and reading info for better readability
- integrate ngx-ui-loader for improved loading experience in books component
- add styling for book year and adjust shelf margins for consistency
- update book card to display reading date and link to Goodreads review
- adjust layout and spacing for improved book display and readability
- enhance book display with description and improve current book logic
- update Read More link to direct to user review for each book
- add description property to Book model and update deserialize method
- add shelves property to Book model and update API service to fetch user shelves
- enhance title deserialization to remove additional text
- update title deserialization to remove subtitle
- implement Book model and integrate Goodreads API for book fetching
-  improve structure and add lifecycle methods
- add Books section and update navigation, sitemap, and translations
- add new publication
- remove unused ngx-skeleton-loader dependencies and clean up publications component
- add styles for dataset publication type
- implement 3D book cover effect and improve shelf styling in BooksComponent
- enhance BooksComponent layout and functionality with improved structure and tab navigation
- add route for BooksComponent in app routing module
- implement BooksComponent with styling and functionality for displaying books and authors

### Fix

- update search title and placeholder for clarity
- add timers package as a dependency
- restore margin-bottom for book cover wrapper in current book display
- update padding in host selector for improved layout
- adjust padding in container-fluid for better layout
- correct book assignment logic in getAllBooks method
- adjust margin for social media icons in publications component
- update image paths in BooksComponent to correct directory structure
- correct file extension for Malibu Rising cover image

### Refactor

- refine search and review labels in i18n files for clarity
- rename variable for clarity in applyFilters method
- clean up HTML structure and CSS styles for better readability
- update Sci Publications section to remove link from title
- remove unused properties from Publication model

## v1.5.0 (2025-10-29)

### Feat

- add image display for blog publications in publications component
- add comprehensive Copilot instructions for AI agents
- enhance CanonicalService to set canonical URL with improved URL cleaning
- update website name and search target URL in index.html
- update personal branding in meta tags and routing titles
- add CanonicalService to manage canonical URLs and update app.component to set canonical URL on navigation
- add changes
- refactor addUtmSource to addUtmParameters for improved URL parameter handling
- enhance URL handling in publications component by adding UTM source
- add @angular/localize/init to polyfills for localization support
- add target="_blank" to external links in publications component for better user experience
- :memo: add missing papaers
- update navbar translations and add missing entries for portfolio and privacy policy
- add showInfo property to Repository model
- enhance portfolio layout with improved filtering and search functionality

### Fix

- add timeout to API requests for improved error handling
- clean up whitespace and improve link accessibility in publications component
- add missing radix
- clean up package-lock.json by removing unused dependencies
- update eslint plugins to latest versions and remove unused dependencies
- correct route path for privacy policy
- :bug: downgrade version
- exclude e2e directory from TypeScript compilation
- update project info display logic to use repo name instead of id
- remove popularity sorting from portfolio component
- update import path for PrivacyPolicyComponent to secondary-components directory
- update privacy policy text for clarity and compliance with data protection standards
- update privacy policy text for i18n support

### Refactor

- move MenuItem interface to a separate model file for better organization
- simplify trackBy functions by removing unused index parameter
- remove unused imports from app.module.ts for cleaner code
- add type annotations for publication mapping in getBlogPublications
- refine image assignment logic in Publication model
- updating params according to new version
- simplify angular.json structure and improve build configurations
- update utils to utilsService for clarity in navbar component
- rename utils to utilsService for clarity in NavbarComponent
- addUtmSource to addUtmParameters for consistency in URL parameter handling
- simplify portfolio and publications components by removing unused methods and updating promise handling
- remove unused modifyLinks method from MHomeComponent
- update component metadata to include standalone option and adjust tsconfig settings
- update footer styles for improved layout and alignment
- remove back-to-top link from footer component
- clean up footer component and improve privacy policy link
- restructure project detail components and remove unused files
- move ProjectDetailComponent tests to secondary-components directory
- move ProjectDetailComponent to secondary-components directory

## v1.4.0 (2025-10-29)

### Feat

- add image display for blog publications in publications component
- add comprehensive Copilot instructions for AI agents
- enhance CanonicalService to set canonical URL with improved URL cleaning
- update website name and search target URL in index.html
- update personal branding in meta tags and routing titles
- add CanonicalService to manage canonical URLs and update app.component to set canonical URL on navigation
- add changes
- refactor addUtmSource to addUtmParameters for improved URL parameter handling
- enhance URL handling in publications component by adding UTM source
- add @angular/localize/init to polyfills for localization support
- add target="_blank" to external links in publications component for better user experience
- :memo: add missing papaers
- update navbar translations and add missing entries for portfolio and privacy policy
- add showInfo property to Repository model
- enhance portfolio layout with improved filtering and search functionality

### Fix

- add timeout to API requests for improved error handling
- clean up whitespace and improve link accessibility in publications component
- add missing radix
- clean up package-lock.json by removing unused dependencies
- update eslint plugins to latest versions and remove unused dependencies
- correct route path for privacy policy
- :bug: downgrade version
- exclude e2e directory from TypeScript compilation
- update project info display logic to use repo name instead of id
- remove popularity sorting from portfolio component
- update import path for PrivacyPolicyComponent to secondary-components directory
- update privacy policy text for clarity and compliance with data protection standards
- update privacy policy text for i18n support

### Refactor

- move MenuItem interface to a separate model file for better organization
- simplify trackBy functions by removing unused index parameter
- remove unused imports from app.module.ts for cleaner code
- add type annotations for publication mapping in getBlogPublications
- refine image assignment logic in Publication model
- updating params according to new version
- simplify angular.json structure and improve build configurations
- update utils to utilsService for clarity in navbar component
- rename utils to utilsService for clarity in NavbarComponent
- addUtmSource to addUtmParameters for consistency in URL parameter handling
- simplify portfolio and publications components by removing unused methods and updating promise handling
- remove unused modifyLinks method from MHomeComponent
- update component metadata to include standalone option and adjust tsconfig settings
- update footer styles for improved layout and alignment
- remove back-to-top link from footer component
- clean up footer component and improve privacy policy link
- restructure project detail components and remove unused files
- move ProjectDetailComponent tests to secondary-components directory
- move ProjectDetailComponent to secondary-components directory

## v1.4.0 (2024-11-06)

### Feat

- using agibank english page
- preventing undefined error
- update about description
- iconList initialization using external data source

### Fix

- update home component title for improved SEO relevance
- add portfolio URL to sitemap.xml for improved SEO and indexing
- update robots.txt to improve search engine crawling and indexing directives
- update home component headings to include relevant keywords for better SEO

### Refactor

- improving code
- removing duplicated code
- using a simpler approach
- update language preference logic in navbar and utils service
- update language preference logic in navbar and utils service
- removing cookie consent page

## v1.3.0 (2024-03-25)

### Feat

- improving code
- Updated src/app/secondary-components/cookie-
- set language when accept cookies
- add a default language
- remove wrong code
- add missing spec file
- Updated src/app/secondary-components/cookie-
- Updated src/app/secondary-components/navbar/
- Updated src/app/app.component.ts
- Updated src/app/services/utils.service.ts
- Updated src/app/app.component.html
- Updated src/app/app.module.ts
- Add stylish cookie consent UI matching websi
- Added HTML structure for cookie consent UI
- Implement cookie consent component

### Fix

- remove setting lang pref in navbar component

### Refactor

- send setLanguage to utils
- color theme
- using bootstrap instead of css
- transform function to private

## [1.3.0](https://github.com/Lucs1590/Personal_Site/compare/v1.2.0...v1.3.0) (2024-03-25)


### Features

* add a default language ([cbfdbd1](https://github.com/Lucs1590/Personal_Site/commit/cbfdbd1804e104ea59f26c18999a17af4c5cf1ce))
* add missing spec file ([ad38d45](https://github.com/Lucs1590/Personal_Site/commit/ad38d454c29853a635ada8432efc4ca43d4bd3c0))
* Add stylish cookie consent UI matching websi ([8116bf5](https://github.com/Lucs1590/Personal_Site/commit/8116bf53224de0d9e638f6e47ad7fafc4525446e))
* Added HTML structure for cookie consent UI ([efcb68a](https://github.com/Lucs1590/Personal_Site/commit/efcb68a48266add73feaca58ba14e4e300e0e3c9))
* Implement cookie consent component ([5ee32be](https://github.com/Lucs1590/Personal_Site/commit/5ee32be724a7c4656888d70e6591acf891b1e82a))
* improving code ([6031cb4](https://github.com/Lucs1590/Personal_Site/commit/6031cb489a2bb7c95f9aee6fb91e59dd4413d7c4))
* remove wrong code ([2bceb58](https://github.com/Lucs1590/Personal_Site/commit/2bceb585c1b2519eaf926a489abf345b325e05c8))
* set language when accept cookies ([5dfde6c](https://github.com/Lucs1590/Personal_Site/commit/5dfde6c113894561dd068e96d3b651a241baceda))
* Updated src/app/app.component.html ([412cad2](https://github.com/Lucs1590/Personal_Site/commit/412cad2be7b55b14d75500c56eaa9fea722f4c15))
* Updated src/app/app.component.ts ([3ba03e3](https://github.com/Lucs1590/Personal_Site/commit/3ba03e38216100b50fea2c68116dafa1530e05dd))
* Updated src/app/app.module.ts ([9fd0364](https://github.com/Lucs1590/Personal_Site/commit/9fd036467d6786a874d03762979c884eb27e12d8))
* Updated src/app/secondary-components/cookie- ([2c7b6bb](https://github.com/Lucs1590/Personal_Site/commit/2c7b6bb977f73b9ba07c31a69f985b04b523980f))
* Updated src/app/secondary-components/cookie- ([e5e5702](https://github.com/Lucs1590/Personal_Site/commit/e5e57021d62eeb946d18f4a0569bdf626828c912))
* Updated src/app/secondary-components/navbar/ ([db2d7f7](https://github.com/Lucs1590/Personal_Site/commit/db2d7f7bd7f87a571c9b23858603f9c2e5c0aaf0))
* Updated src/app/services/utils.service.ts ([a673a92](https://github.com/Lucs1590/Personal_Site/commit/a673a928328cd4806e6f238a29b43fc62a1e638e))


### Bug Fixes

* remove setting lang pref in navbar component ([06fcba2](https://github.com/Lucs1590/Personal_Site/commit/06fcba2570f5e3595e2328920383eef58eca5878))

## [1.2.0](https://github.com/Lucs1590/Personal_Site/compare/v1.1.1...v1.2.0) (2024-03-21)


### Features

* improve setLanguage function ([5529135](https://github.com/Lucs1590/Personal_Site/commit/5529135ff0049172485902c0d1fe508fda7268ee))
* Updated src/app/app.component.ts ([635d94b](https://github.com/Lucs1590/Personal_Site/commit/635d94b704ab30373956f814e9268b15339101a1))
* Updated src/app/app.module.ts ([fe4ca80](https://github.com/Lucs1590/Personal_Site/commit/fe4ca801b8fbf9a1348d271ac51d5d46256a636b))
* Updated src/app/secondary-components/navbar/ ([e5cd12c](https://github.com/Lucs1590/Personal_Site/commit/e5cd12c5323982e047dfcb51935d01b1b745062e))
* Updated src/app/services/utils.service.ts ([e4261da](https://github.com/Lucs1590/Personal_Site/commit/e4261da29b767bee41336ba3696548988fd68a07))

### [1.1.1](https://github.com/Lucs1590/Personal_Site/compare/v1.1.0...v1.1.1) (2024-03-09)


### Bug Fixes

* height size ([66d1414](https://github.com/Lucs1590/Personal_Site/commit/66d141483fa6042acb75ce11e09a6684ddf6cc5d))

## [1.1.0](https://github.com/Lucs1590/Personal_Site/compare/v1.0.1...v1.1.0) (2024-03-09)


### Features

* add accessibility tasks ([9f944f6](https://github.com/Lucs1590/Personal_Site/commit/9f944f6d1b5a2e2a8e3f9719b8c7f2742ec66790))
* add adsense ([d09c24c](https://github.com/Lucs1590/Personal_Site/commit/d09c24ccca02b8c8d126b5c064534c210af03a26))
* add aria-label to icons ([08147b9](https://github.com/Lucs1590/Personal_Site/commit/08147b92570becea0aa4ff547bcf221a82863e1c))
* add category to publication class ([b06bb09](https://github.com/Lucs1590/Personal_Site/commit/b06bb09da7c1aadc2844e56c0e36c7cf0fb88a81))
* add google analytics ([86d2660](https://github.com/Lucs1590/Personal_Site/commit/86d266065a1207c5a9e12946e3671c438e291dd9))
* add initial portfolio code ([547417a](https://github.com/Lucs1590/Personal_Site/commit/547417aa899b44b24d22da743665a7392bc711b2))
* add loader to new tip ([7fb368c](https://github.com/Lucs1590/Personal_Site/commit/7fb368c36d8f933a23499f2cc910f1c4f4659451))
* add missing a11y tasks ([5e1f0c6](https://github.com/Lucs1590/Personal_Site/commit/5e1f0c65e626338fd5629ebe7ea8037ce121f7f4))
* add modal descriptions ([dae8191](https://github.com/Lucs1590/Personal_Site/commit/dae8191c096a26b661f69ef6fd8930491f1da9ad))
* add modal to all pages ([dbcd159](https://github.com/Lucs1590/Personal_Site/commit/dbcd1593f7112811754a94b3578935b103cf2310))
* add modal to show that it's offline ([d76a8cb](https://github.com/Lucs1590/Personal_Site/commit/d76a8cb6656abbe0d911db24c57b995d5236c4aa))
* add new publications ([f48c6ce](https://github.com/Lucs1590/Personal_Site/commit/f48c6ce7bb5251ba25a6a462b83bff5b5b319bf9))
* add online offline logic ([574ce8e](https://github.com/Lucs1590/Personal_Site/commit/574ce8e9d34a5729e35154bff088ebadd8f7cee4))
* add SEO tags ([0623329](https://github.com/Lucs1590/Personal_Site/commit/06233297212530473a695b4cd2c9653621e352c5))
* add styles and descriptions ([36e1aee](https://github.com/Lucs1590/Personal_Site/commit/36e1aee728141cece103f5046e7a7e86f15c2ad1))
* add target blank to sci publications ([83ab2bc](https://github.com/Lucs1590/Personal_Site/commit/83ab2bc2054a36374b762bbcee06572220dd63c0))
* change modal style ([92b0fde](https://github.com/Lucs1590/Personal_Site/commit/92b0fde3d15aedfd717f7f7c48b30dca72d2172e))
* creating directive ([4c59864](https://github.com/Lucs1590/Personal_Site/commit/4c59864d7a3912b3f5b31bca928016dbefe899f1))
* disable 'read more' when offline ([6c0ce32](https://github.com/Lucs1590/Personal_Site/commit/6c0ce3232bd0c1d1c102270594f94208bfc8ab93))
* disabling some elements when offline ([acc42f6](https://github.com/Lucs1590/Personal_Site/commit/acc42f6e992258259444f8c8cc1c08547c9a22f9))
* improve website SEO ([38ac982](https://github.com/Lucs1590/Personal_Site/commit/38ac982820c52a9d521e42a4abbeb33133ecb907))
* improving api service with good practices ([1e2115a](https://github.com/Lucs1590/Personal_Site/commit/1e2115a6eacef93977d39f199c9b3671a925a600))
* improving home and texts ([1c63b61](https://github.com/Lucs1590/Personal_Site/commit/1c63b616b2d8cd6f376e504794846e060cd672d0))
* remove adsense ([c63723c](https://github.com/Lucs1590/Personal_Site/commit/c63723c8b2ff75b41ba2a233fc4c98409f612607))
* set dynamic titles ([78d9864](https://github.com/Lucs1590/Personal_Site/commit/78d9864c9a987d2361b5294976a7011aa1d1339a))
* show modal at invalid click ([1892fb3](https://github.com/Lucs1590/Personal_Site/commit/1892fb3ede362ff2ad32459eeee86974b332af9a))
* style and is active for aria ([2802cf6](https://github.com/Lucs1590/Personal_Site/commit/2802cf6b4cc1f2d4f06c4efa6fe342f1f1e93217))
* Updated src/app/secondary-components/publica ([2aba612](https://github.com/Lucs1590/Personal_Site/commit/2aba6127076f164cd964f8fc20987f56aba44ffb))
* Updated src/app/secondary-components/publica ([d19a3c8](https://github.com/Lucs1590/Personal_Site/commit/d19a3c8d6b8844e3c9fbcc75e80d646db5766cd7))
* Updated src/app/secondary-components/publica ([1055321](https://github.com/Lucs1590/Personal_Site/commit/1055321d3ceb5decfaf9b320a00f3e026696b0c8))
* updating images with NgOptimizedImage ([7d23f5f](https://github.com/Lucs1590/Personal_Site/commit/7d23f5f01b4b6b468be7e54a9125be1e6bec3d0e))
* using directive instead of fixed code ([8e6134e](https://github.com/Lucs1590/Personal_Site/commit/8e6134e1c223d039c97ce6d9166729fcca41e727))
* using functions to split ([c417806](https://github.com/Lucs1590/Personal_Site/commit/c417806af51f738efd1a648c361806ecb54c7f9e))
* using multilanguage ([91a8daf](https://github.com/Lucs1590/Personal_Site/commit/91a8dafbf15e27431f24e942d4aa229eaa4120b0))


### Bug Fixes

* aria label ([24f55cd](https://github.com/Lucs1590/Personal_Site/commit/24f55cd6b19d5f0d3c38384f6bc2584e165b70d3))
* aria-label attribute ([271190b](https://github.com/Lucs1590/Personal_Site/commit/271190b60442f15edff31c13ffd832538f4564ec))
* DOM text reinterpreted as HTML ([cb28764](https://github.com/Lucs1590/Personal_Site/commit/cb2876468035891fdfd0d247c91c13710898cd3e))
* heading elements in a sequentially-descending ([28e8b0a](https://github.com/Lucs1590/Personal_Site/commit/28e8b0a99a316e8d325b3c60a445841c872e93f5))
* html divs positions ([a84fce6](https://github.com/Lucs1590/Personal_Site/commit/a84fce6e679b8098a81fa2998d9fd897e2c713cd))
* sanitize the code ([2b592fb](https://github.com/Lucs1590/Personal_Site/commit/2b592fbfa4731bab2c9c6c9b2020b6479a267543))

## Unreleased

### Feat

- add missing lazy loading
- using container fluid instead of row
- add project model file
- add routes again
- add function types
- subtitle l10n
- decreasing text size for sci articles
- spliting scientific and blog publications
- google scholar icon
- **app.component.ts**: removing useless console log
- **app.component.ts**: set language dynamically
- **ipinfo.model.ts**: defining ipinfo model
- **api.service.ts**: deserializing response
- add ipinfo request instead of class
- add initial api and model
- **app.component.ts**: add translate service
- **package-lock.json**: npm install
- **publications.component**: trying to use skeleton instead of loader
- **publications.component.ts**: set loading on publication page
- **app**: add loading lib and settings
- **portfolio.component.html**: changing initial display
- **portfolio.component.ts**: add repository type
- add github api request
- **repository.model.ts**: add model to repositories
- **app-routing.module.ts**: add portfolio route
- **portfolio.component**: add portfolio component
- **publications.component**: add skeleton on cards
- **navbar.component.ts**: applying filter after translate
- changing font weight
- **publications.component.ts**: change the publications range
- **publications.component**: add cover image to the page
- add translation to the publications
- **publications.component**: add image and effects
- **navbar.component.css**: removing animation
- **navbar.component**: add navbar language support
- **publications.component.ts**: get only the last 9 publications
- **publication.model.ts**: removing htlm tags
- **publications.models.ts**: removing html tags
- **publication.component**: initial version of publications
- **m-home.component.html**: change col size
- add publications route
- using a dynamic navbar
- **navbar**: add navbar component
- **not-found.component**: changing not-found place
- **home.component**: add hover element
- replace home.lang to lang
- **icones.component.ts**: add dev and sorting icons
- add another pages on the correct place
- **package-lock.json**: npm install
- **not-found.component.html**: making navigation to home
- add i18n to the back button
- add i18n support on 404 page
- **app.module.ts**: set default module
- **utils.service**: generating utils service
- **not-found.component**: sorting not found content
- **index.html**: making black background
- **not-found.component.css**: making animation to glitch effect
- **style.css**: removing animation to user preference
- **not-found.component.ts**: removing onInit
- **app-routing.module.ts**: add not found page
- **not-found.component**: generating component
- **icon.model.ts**: creating a icon model
- **index.html**: removing fontawesome style
- **app.module.ts**: add brand to the application
- **icones.component**: making the iconlist
- **icones.component.css**: add default icon size
- add seo
- **home.component.html**: particle draft
- removing ngOnInit
- **app.component.ts**: remove useless const
- **recommendations.component.html**: add authors infos
- add title of recommendations
- **recommendations.components.html**: add title and author's datas
- **recommendations.components.css**: add style of image
- **recommendations.component.ts**: add all recommendations
- **recommendations.component**: add recommendation list
- **recommendation.model.ts**: add model
- **recommendations.component**: add recommendations component]
- **technologies**: moving technologies
- **en.json**: update english text about myself
- **pt.json**: update text of myself
- **technologies.component**: add particle js at technologies
- **pt.json**: update potuguese text
- **icones.component.html**: comment phone number
- **publications.component.ts**: sort publications by date
- **publication.model.ts**: string manipulation
- get all publications
- **publication.model.ts**: deserializing datas
- **publication-request.model.ts**: add model to request
- **app.modules.ts**: add publication component
- **publication.model.ts**: renaming publication model
- **models**: add models to deserialize and publications
- **services**: add api service
- **tsfconfig.ts**: add root page config
- add publications page
- add icons in another dir

### Fix

- package ecosystem for ci
- hover underline
- fixing center align
- **icones.component.ts**: set type and fix url

### Refactor

- text-right to text-end
- hr bar
- changing left and right to start and end
- removing portfolio route
- changing 'read more' text
- changing text related to publications
- change loading time and number of publications
- using english instead of portuguese
- **app.component.ts**: using template string
- **publication.component.ts**: updating loading time
- using camelCase instead of snake case
- **app.module.ts**: remove default language
- **package*.json**: changing loader lib
- **repository.model.ts**: changing repositories url
- making the request generic
- **publication.model.ts**: using a better regexp
- **publication.model.ts**: add better element sort
- set by default bg black and text white
- migrating nav for a specific component
- **icones.component.ts**: remove useless onInit
- moving duplicate code to utils service
- **publication.model.ts**: optional chaining and indentation

### Perf

- applying lazy loading to images
