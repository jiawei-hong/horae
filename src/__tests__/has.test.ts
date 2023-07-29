import fs from 'fs';
import { Horae } from '..';

jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('FileReader initialization', () => {
  it('should read the file correctly', () => {
    const config = JSON.stringify({
      name: 'horae',
      type: 'json',
      position: {
        x: 100,
        y: 200,
      },
      a: {
        b: {
          c: {
            d: 100,
          },
        },
      },
    });
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
