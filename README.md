# Introduction

"horae" is a lightweight JavaScript library that provides methods to easily read JSON files and
manipulate data using the `set`, `get`, `has`, and `save` functions.

## Features

- Read JSON files effortlessly.
- Modify JSON data using `set` and `get` methods.
- Check if a specific property exists using `has`.
- Save the updated JSON data back to the file.

## Installation

You can install "horae" via npm:

```bash
npm install horae-configure
```

You can install "horae" via yarn:

```bash
yarn add horae-configure
```

# How to use?

You need to first prepare a JSON file in the outermost layer of the project

```json
{
  "position": {
    "x": 1,
    "y": 2
  }
}
```

and then initialize `horae` variable

```typescript
const horae = new Horae<{
  position: {
    x: number;
    y: number;
  };
}>('config');
```

### `get` method

```typescript
horae.get('position.x'); // 1
horae.get('position.y'); // 2
```

### `has` method

```typescript
horae.has('position.x'); // true
horae.has('position.y'); // true
horae.has('position.z'); // false
```

### `set` method

```typescript
horae.set('position.x', 100);
horae.get('position.x'); // 100
```

### `save` method

```typescript
horae.set('position.x', 1000);
horae.save();
```

Go back and view the JSON file

```json
{
  "position": {
    "x": 1000,
    "y": 2
  }
}
```
