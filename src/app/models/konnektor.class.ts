import { DataService } from '../services/data.service';

export class Konnektor {
  public ram_usage_percent: number;
  public cpu_usage_percent: number;
  public pending_transactions: number;
  public alltime_uploads: number;
  public labels_24h: Array<string>;
  public labels_7d: Array<string>;
  public labels_30d: Array<string>;
  public ram_usage_24h: Array<number>;
  public ram_usage_7d: Array<number>;
  public ram_usage_30d: Array<number>;
  public cpu_usage_24h: Array<number>;
  public cpu_usage_7d: Array<number>;
  public cpu_usage_30d: Array<number>;
  public horizontal_line_24h: Array<number>;
  public horizontal_line_7d: Array<number>;
  public horizontal_line_30d: Array<number>;

  constructor(
    public id: number,
    public name: string,
    public is_active: Boolean,
    public online_since: string,
    public firmware_version: string,
    public update_available: Boolean
  ) {
    this.id = id;
    this.name = name;
    this.ram_usage_percent = this.getRandomIntValue(10, 79);
    this.cpu_usage_percent = this.getRandomIntValue(80, 100);
    this.is_active = is_active;
    this.online_since = online_since;
    this.firmware_version = firmware_version;
    this.update_available = update_available;
    this.pending_transactions = this.getRandomIntValue(0, 100);
    this.alltime_uploads = this.getRandomFloatValue(10, 100, 2);
    this.labels_24h = Array(24).fill('');
    this.labels_7d = Array(7).fill('');
    this.labels_30d = Array(30).fill('');
    this.ram_usage_24h = this.getRandomKonnektorValueArray(24, 10, 100);
    this.ram_usage_7d = this.getRandomKonnektorValueArray(7, 10, 100);
    this.ram_usage_30d = this.getRandomKonnektorValueArray(30, 10, 100);
    this.cpu_usage_24h = this.getRandomKonnektorValueArray(24, 1, 100);
    this.cpu_usage_7d = this.getRandomKonnektorValueArray(7, 1, 100);
    this.cpu_usage_30d = this.getRandomKonnektorValueArray(30, 1, 100);

    this.horizontal_line_24h = Array(24).fill(80);
    this.horizontal_line_7d = Array(7).fill(80);
    this.horizontal_line_30d = Array(30).fill(80);
  }

  getRandomKonnektorValueArray(length: number, max: number, min: number) {
    const randomArray = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
      randomArray.push(randomNumber);
    }
    return randomArray;
  }

  getRandomIntValue(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomFloatValue(max: number, min: number, decimalPlaces: number) {
    const randomFloat = Math.random() * (max - min) + min;
    return parseFloat(randomFloat.toFixed(decimalPlaces));
  }
}
