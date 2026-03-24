import { ConfigType } from './constants';
import { Config } from './type';
import fs from 'fs';
import { getProperties } from './utils/property';
import type { NestedRecord } from './types';

class Horae<T extends NestedRecord> {
  private config: Config<T> = {
    name: 'config',
  };

  constructor(name: string, type: ConfigType = ConfigType.JSON) {
    this.config.name = name;
    this.config.type = type;
    this.initialize();
  }

  private initialize() {
    const fileName = `${this.config.name}.${this.config.type}`;
    const hasFile = fs.existsSync(fileName);

    if (hasFile) {
      const data: T = JSON.parse(
        fs.readFileSync(`${this.config.name}.${this.config.type}`, 'utf8')
      );
      this.config.data = data;
    } else {
      this.config.data = {} as T;
    }
  }

  set(key: string, value: unknown): void {
    const keys = getProperties(key);
    const obj: NestedRecord = Object.assign({}, this.config.data);

    keys.reduce((acc, curr) => {
      if (curr === keys[keys.length - 1]) {
        acc[curr] = value;
      } else if (!acc[curr]) {
        acc[curr] = {};
      }
      return acc[curr] as NestedRecord;
    }, obj);

    this.config.data = obj as T;
  }

  get(key: string): unknown {
    if (!this.config.data) return undefined;

    let current: unknown = this.config.data;
    const properties = getProperties(key);

    for (const property of properties) {
      if (typeof current !== 'object' || current === null || !Object.prototype.hasOwnProperty.call(current, property)) {
        return undefined;
      }
      current = (current as NestedRecord)[property];
    }

    return current;
  }

  has(property: string): boolean {
    if (!this.config.data) return false;

    let current: unknown = this.config.data;
    const properties = getProperties(property);

    for (const prop of properties) {
      if (typeof current !== 'object' || current === null || !Object.prototype.hasOwnProperty.call(current, prop)) {
        return false;
      }
      current = (current as NestedRecord)[prop];
    }

    return true;
  }

  delete(key: string): void {
    const keys = getProperties(key);
    const obj: NestedRecord = Object.assign({}, this.config.data);

    keys.reduce((acc, curr, index) => {
      if (index === keys.length - 1) {
        delete acc[curr];
        return acc;
      }
      return acc[curr] as NestedRecord;
    }, obj);

    this.config.data = obj as T;
  }

  clear(): void {
    this.config.data = {} as T;
  }

  reload(): void {
    this.initialize();
  }

  getOrDefault<D>(key: string, defaultValue: D): unknown | D {
    const value = this.get(key);
    return value !== undefined ? value : defaultValue;
  }

  save() {
    const fileName = `${this.config.name}.${this.config.type}`;

    fs.writeFileSync(fileName, JSON.stringify(this.config.data, null, 2));
  }
}

export { Horae };
