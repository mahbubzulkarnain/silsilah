import { response } from 'graphql-response-parser';
import { IResponse } from '../../../interfaces/IResponse';
import db, { q } from '../../../vendors/postgre';
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

export default async ({ query: { id: peopleId, limit = 10, offset = 0 } }): Promise<IResponse> => {
  const [[{ result, totalCount }]] = await db.query(queryGenerator(`
    SELECT people.id FROM people
    LEFT JOIN (
        SELECT husband_id, wife_id, date_of_marriage, date_of_divorce FROM couple
    ) C ON C.husband_id = people.id OR C.wife_id = people.id
    WHERE (C.husband_id = ${q(peopleId)} OR C.wife_id = ${q(peopleId)}) AND people.id != ${q(peopleId)}
    GROUP BY people.id, C.date_of_marriage, C.date_of_divorce
    ORDER BY C.date_of_marriage, C.date_of_divorce
  `));
  return response(
    ((result && result.length) ? result.map(({ id }) => id) : []),
    { limit, offset, totalCount },
  );
};
