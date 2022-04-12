import { Deserializable } from './deserializable.model';

export class IPInfo implements Deserializable {
    city?: string;
    country?: string;
    country_capital?: string;
    country_name?: string;
    country_population?: number;
    in_eu?: boolean;
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
    this.country_capital = input?.country_capital;
    this.country_name = input?.country_name;
    this.ip = input?.ip;
    this.languages = input?.languages;
    this.latitude = input?.latitude;
    this.longitude = input?.longitude;
    this.region = input?.region;
    this.timezone = input?.timezone;
    return this;
  }
}
