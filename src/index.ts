import { ConfigType } from './constants';
import { Config } from './type';
import fs from 'fs';
import { getProperties } from './utils/property';

class Horae<T extends Object> {
  config: Config<T> = {
    name: 'config',
  };

  constructor(name: string, type: ConfigType = ConfigType.JSON) {
    this.config.name = name;
    this.config.type = type;
    this.initialize();
  }

  initialize() {
    const fileName = `${this.config.name}.${this.config.type}`;
    const hasFile = fs.existsSync(fileName);

    if (hasFile) {
      const data: T = JSON.parse(
        fs.readFileSync(`${this.config.name}.${this.config.type}`, 'utf8')
      );
      this.config.data = data;
    } else {
      throw new Error(`[Error]: Not found file`);
    }
  }

  set(key: string, value: any): void {
    const keys = getProperties(key);
    let obj: Record<string, any> = {};

    keys.reduce((acc, curr) => {
      if (curr === keys[keys.length - 1]) {
        acc[curr] = value;
      } else if (!acc[curr]) {
        acc[curr] = {};
      }
      return acc[curr];
    }, obj);

    this.config.data = obj as T;
  }

  get(key: string) {
    if (!this.config.data) return;

    let current = this.config.data;
    const properties = getProperties(key);

    for (const property of properties) {
      if (!current.hasOwnProperty(property)) {
        return undefined;
      }
      current = current[property as keyof object];
    }

    return current;
  }

  has(property: string) {
    if (!this.config.data) return false;

    let current = this.config.data;
    const properties = getProperties(property);

    for (const property of properties) {
      if (!current.hasOwnProperty(property)) {
        return false;
      }
      current = current[property as keyof object];
    }

    return true;
  }
}

export { Horae };
