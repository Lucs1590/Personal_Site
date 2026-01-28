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
    this.country = input?.country;
    this.countryCapital = input?.country_capital;
    this.countryName = input?.country_name;
    this.ip = input?.ip;
    this.languages = input?.languages;
    // Handle both string and number types for latitude/longitude from ipgeolocation API
    this.latitude = typeof input?.latitude === 'string' ? parseFloat(input.latitude) : input?.latitude;
    this.longitude = typeof input?.longitude === 'string' ? parseFloat(input.longitude) : input?.longitude;
    this.region = input?.region || input?.state_prov;
    this.timezone = input?.timezone || input?.time_zone?.name;
    return this;
  }
}
