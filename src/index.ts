import { ConfigType } from './constants';
import { Config } from './type';
import fs from 'fs';
import { getProperties } from './utils/property';

class Horae<T extends Object> {
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

  set(key: string, value: any): void {
    const keys = getProperties(key);
    let obj: Record<string, any> = Object.assign({}, this.config.data);

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
    if (!this.config.data) return undefined;

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

  save() {
    const fileName = `${this.config.name}.${this.config.type}`;

    fs.writeFileSync(fileName, JSON.stringify(this.config.data, null, 2));
  }
}

export { Horae };
