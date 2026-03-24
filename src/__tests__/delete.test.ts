import fs from 'fs';
import { Horae } from '..';

const mockConfig = {
  name: 'horae',
  position: { x: 100, y: 200 },
  a: { b: { c: { d: 100 } } },
};

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Horae delete', () => {
  beforeEach(() => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));
  });

  it('should delete a top-level property', () => {
    const horae = new Horae('config');
    horae.delete('name');

    expect(horae.has('name')).toBe(false);
  });

  it('should delete a nested property', () => {
    const horae = new Horae('config');
    horae.delete('position.x');

    expect(horae.has('position.x')).toBe(false);
    expect(horae.has('position.y')).toBe(true);
  });

  it('should delete a deeply nested property', () => {
    const horae = new Horae('config');
    horae.delete('a.b.c.d');

    expect(horae.has('a.b.c.d')).toBe(false);
    expect(horae.has('a.b.c')).toBe(true);
  });
});
