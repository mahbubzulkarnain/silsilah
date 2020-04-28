import { response } from 'graphql-response-parser';
import { IResponse } from '../../../interfaces/IResponse';
import db, { q } from '../../../vendors/postgre';
import { qPagination } from '../../../vendors/postgre/utils';
import { TBNAME } from '../constant';

const queryGenerator = (query): string => `
  select
    (
      select array_to_json(array_agg(e))
      from (
        ${query}
      ) e
    ) "result",
    (
      select count(id) from "${TBNAME}" e
    ) "totalCount"
`;

const condition = (props: object): string => {
  if (props && Object.keys(props).length) {
    return `WHERE ${Object.keys(props).map((key) => `"${key}"=${q(props[key])}`).join(' AND ')}`;
  }
  return '';
};

export default async ({ query: { limit = 10, offset = 0, ...props } }): Promise<IResponse> => {
  const ids = props?.ids instanceof Array ? `${q(props.ids)}` : '';

  const [[{ result, totalCount }]] = await db.query(queryGenerator(
    (ids?.length)
      ? `select * from "${TBNAME}" where id in (${ids})`
      : `select id from "${TBNAME}" ${condition(props)} ${qPagination(limit, offset)}`,
  ));

  const options = { limit, offset, totalCount };

  if (ids) {
    return response(result || [], options);
  }

  return response(
    result?.map(({ id }) => id) || [],
    options,
  );
};
