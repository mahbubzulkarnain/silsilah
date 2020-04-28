interface IPagination {
  after: string;
  limit: number;
  data: any[];
  getCursor: any;
}

export default ({
  after: cursor, limit = 10, data, getCursor = (): null => null,
}: IPagination): any => {
  if (limit < 1) {
    return [];
  }
  if (!cursor) {
    return data.slice(0, limit);
  }
  const cursorIndex = data.findIndex((item = { cursor: '' }) => {
    const itemCursor = (item && item.cursor) ? item.cursor : getCursor(item);
    return itemCursor ? cursor === itemCursor : false;
  });

  if (cursorIndex >= 0) {
    return cursorIndex === data.length - 1
      ? []
      : data.slice(cursorIndex + 1, Math.min(data.length, cursorIndex + 1 + limit));
  }

  return data.slice(0, limit);
};
