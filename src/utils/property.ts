const getProperties = (property: string) => property.split('.').filter(Boolean);

export { getProperties };
