import fs from 'fs';
import { Horae } from '..';

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Horae set', () => {
  beforeEach(() => {
    mockFs.existsSync.mockReturnValue(false);
  });

  it('should set a top-level property', () => {
    const horae = new Horae('config');
    horae.set('name', 'horae');

    expect(horae.get('name')).toBe('horae');
  });

  it('should set a nested property', () => {
    const horae = new Horae('config');
    horae.set('position.x', 100);

    expect(horae.get('position.x')).toBe(100);
  });

  it('should create intermediate objects when setting a deeply nested property', () => {
    const horae = new Horae('config');
    horae.set('a.b.c.d', 100);

    expect(horae.get('a.b.c.d')).toBe(100);
  });

  it('should overwrite an existing property', () => {
    const horae = new Horae('config');
    horae.set('name', 'old');
    horae.set('name', 'new');

    expect(horae.get('name')).toBe('new');
  });
});
