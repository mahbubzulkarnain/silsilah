interface IPagination {
  after: string;
  limit: number;
  data: any[];
  getCursor: any;
}

export default ({ after: cursor, limit = 10, data, getCursor = () => null }: IPagination) => {
  if (limit < 1) {
    return [];
  }
  if (!cursor) {
    return data.slice(0, limit);
  }
  const cursorIndex = data.findIndex((item = { cursor: "" }) => {
    const itemCursor = (item && item.cursor) ? item.cursor : getCursor(item);
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === data.length - 1 ? [] : data.slice(cursorIndex + 1, Math.min(data.length, cursorIndex + 1 + limit))
    : data.slice(0, limit);
};
