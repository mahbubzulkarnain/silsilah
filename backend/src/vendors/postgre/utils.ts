export const quote = `$SilsilaH_${Math.floor(Math.random() * (new Date()).getTime())}$`;

export const q = (value) => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (!value) {
    return "";
  }
  if (Array.isArray(value)) {
    return quote + value?.join(`${quote}, ${quote}`) + quote;
  }
  return quote + value + quote;
};

export const qPagination = (limit, offset) => !!+limit ? `LIMIT ${limit} OFFSET ${offset}` : '';