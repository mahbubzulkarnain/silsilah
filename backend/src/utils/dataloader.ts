import DataLoader from 'dataloader';

export default (fn): any => new DataLoader(
  (ids) => fn(ids),
  { cacheKeyFn: (key): string => `${key}` },
);
