import DataLoader from "dataloader";

export default (fn) => new DataLoader(
  (ids) => fn(ids),
  { cacheKeyFn: (key) => key.toString() },
);
