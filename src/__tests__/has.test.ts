import fs from 'fs';
import { Horae } from '..';
import { mockConfig } from '../constants/mock';

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;
const config = JSON.stringify(mockConfig);

describe('FileReader initialization', () => {
  it('should read the file correctly', () => {
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(config);

    const horae = new Horae('config');

    const hasPositionXProperty = horae.has('position.x');
    const hasPositionYProperty = horae.has('position.y');
    const hasMultiNestedProperty = horae.has('a.b.c.d');
    const hasMultiNestedFalseProperty = horae.has('a.b.c.d.e');

    expect(hasPositionXProperty).toBe(true);
    expect(hasPositionYProperty).toBe(true);
    expect(hasMultiNestedProperty).toBe(true);
    expect(hasMultiNestedFalseProperty).toBe(false);
  });
});
