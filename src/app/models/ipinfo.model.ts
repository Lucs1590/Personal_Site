import { Deserializable } from './deserializable.model';

export class IPInfo implements Deserializable {
    city?: string;
    country?: string;
    countryCapital?: string;
    countryName?: string;
    ip?: string;
    languages?: string;
    latitude?: number;
    longitude?: number;
    region?: string;
    timezone?: string;

  deserialize(input: {
    city?: string;
    country?: string;
    country_code2?: string;
    country_area?: number;
    country_capital?: string;
    country_name?: string;
    ip?: string;
    languages?: string;
    latitude?: string | number;
    longitude?: string | number;
    region?: string;
    state_prov?: string;
    timezone?: string;
    time_zone?: {
        name?: string;
    };
  }): this {
    Object.assign(this, {});
    this.city = input?.city;
    // Map country_code2 (2-letter code) to country field for backward compatibility
    this.country = input?.country || input?.country_code2;
    this.countryCapital = input?.country_capital;
    this.countryName = input?.country_name;
    this.ip = input?.ip;
    this.languages = input?.languages;
    // Handle both string and number types for latitude/longitude from ipgeolocation API
    // Validate and handle invalid string values
    if (input?.latitude) {
      const lat = typeof input.latitude === 'string' ? parseFloat(input.latitude) : input.latitude;
      this.latitude = !isNaN(lat) ? lat : undefined;
    }
    if (input?.longitude) {
      const lng = typeof input.longitude === 'string' ? parseFloat(input.longitude) : input.longitude;
      this.longitude = !isNaN(lng) ? lng : undefined;
    }
    this.region = input?.region || input?.state_prov;
    this.timezone = input?.timezone || input?.time_zone?.name;
    return this;
  }
}
