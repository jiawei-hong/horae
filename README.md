# Introduction

"horae" is a lightweight TypeScript library that provides methods to easily read JSON files and manipulate data using dot-notation and array index property access.

## Features

- Read JSON files effortlessly.
- Get and set nested properties using dot-notation (e.g. `position.x`) or array index syntax (e.g. `items[0].name`).
- Check if a specific property exists using `has`.
- Delete properties with `delete`.
- Reset all data with `clear`.
- Reload data from file with `reload`.
- Safe property access with `getOrDefault`.
- Save updated data back to the file with `save`.

## Installation

```bash
npm install horae-configure
```

```bash
yarn add horae-configure
```

# How to use?

Prepare a JSON file in the root of your project:

```json
{
  "position": {
    "x": 1,
    "y": 2
  },
  "items": [
    { "name": "foo" }
  ]
}
```

Initialize a `Horae` instance with the filename (without extension):

```typescript
import { Horae } from 'horae-configure';

const horae = new Horae<{
  position: { x: number; y: number };
  items: { name: string }[];
}>('config');
```

### `get`

Retrieve a value using dot-notation or array index syntax.

```typescript
horae.get('position.x');    // 1
horae.get('items[0].name'); // "foo"
horae.get('position.z');    // undefined
```

### `has`

Check whether a property exists.

```typescript
horae.has('position.x'); // true
horae.has('position.z'); // false
```

### `set`

Set a value at a given path. Intermediate objects are created automatically.

```typescript
horae.set('position.x', 100);
horae.set('profile.address.city', 'Taipei');
```

### `delete`

Remove a property at a given path.

```typescript
horae.delete('position.x');
horae.has('position.x'); // false
horae.has('position.y'); // true
```

### `clear`

Reset all data to an empty object.

```typescript
horae.clear();
horae.has('position'); // false
```

### `reload`

Discard in-memory changes and re-read data from the file.

```typescript
horae.set('position.x', 999);
horae.reload();
horae.get('position.x'); // back to original value from file
```

### `getOrDefault`

Return the value if it exists, otherwise return the provided default.

```typescript
horae.getOrDefault('position.x', 0); // 1
horae.getOrDefault('position.z', 0); // 0
```

### `save`

Persist the current in-memory data back to the JSON file.

```typescript
horae.set('position.x', 1000);
horae.save();
```

The file will be updated to:

```json
{
  "position": {
    "x": 1000,
    "y": 2
  }
}
```
