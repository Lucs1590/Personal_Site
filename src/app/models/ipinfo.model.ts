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
    latitude?: number;
    longitude?: number;
    region?: string;
    timezone?: string;
  }): this {
    Object.assign(this, {});
    this.city = input?.city;
    this.country = input?.country;
    this.countryCapital = input?.country_capital;
    this.countryName = input?.country_name;
    this.ip = input?.ip;
    this.languages = input?.languages;
    this.latitude = input?.latitude;
    this.longitude = input?.longitude;
    this.region = input?.region;
    this.timezone = input?.timezone;
    return this;
  }
}
