const getProperties = (property: string) =>
  property
    .split('.')
    .flatMap((segment) => segment.split(/\[(\d+)\]/).filter(Boolean))
    .filter(Boolean);

export { getProperties };
