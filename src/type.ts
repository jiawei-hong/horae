import { ConfigType } from './constants';

export type Config<T> = {
  name: string;
  type?: ConfigType;
  data?: T;
};
