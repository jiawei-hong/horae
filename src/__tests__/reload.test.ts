import fs from 'fs';
import { Horae } from '..';

const mockConfig = { name: 'horae' };
const updatedConfig = { name: 'updated' };

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Horae reload', () => {
  it('should discard in-memory changes and re-read from file', () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(JSON.stringify(mockConfig));

    const horae = new Horae('config');
    horae.set('name', 'modified');
    expect(horae.get('name')).toBe('modified');

    mockFs.readFileSync.mockReturnValue(JSON.stringify(updatedConfig));
    horae.reload();

    expect(horae.get('name')).toBe('updated');
  });
});
