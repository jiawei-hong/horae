import fs from 'fs';
import { Horae } from '..';

const mockConfig = { name: 'horae' };

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Horae getOrDefault', () => {
  beforeEach(() => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));
  });

  it('should return the value when the key exists', () => {
    const horae = new Horae('config');

    expect(horae.getOrDefault('name', 'default')).toBe('horae');
  });

  it('should return the default value when the key does not exist', () => {
    const horae = new Horae('config');

    expect(horae.getOrDefault('missing', 'default')).toBe('default');
  });

  it('should return the default value for a missing nested key', () => {
    const horae = new Horae('config');

    expect(horae.getOrDefault('position.x', 0)).toBe(0);
  });
});
