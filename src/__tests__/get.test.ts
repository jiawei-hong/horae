import fs from 'fs';
import { Horae } from '..';
import { mockConfig } from '../constants/mock';

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;
const config = JSON.stringify(mockConfig);

describe('Horae get object properties', () => {
  it('should get object properties', () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(config);

    const horae = new Horae('config');
    const test1 = horae.get('a.b.c.d');
    const test2 = horae.get('position.x');
    const test3 = horae.get('position.y');
    const test4 = horae.get('name');
    const test5 = horae.get('type');

    expect(test1).toBe(100);
    expect(test2).toBe(100);
    expect(test3).toBe(200);
    expect(test4).toBe('horae');
    expect(test5).toBe('json');
  });
});
