import fs from 'fs';
import { Horae } from '..';

const mockConfig = {
  name: 'horae',
  position: { x: 100, y: 200 },
};

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Horae clear', () => {
  it('should remove all properties', () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

    const horae = new Horae('config');
    horae.clear();

    expect(horae.has('name')).toBe(false);
    expect(horae.has('position')).toBe(false);
  });
});
