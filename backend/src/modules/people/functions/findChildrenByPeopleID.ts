import { response } from "graphql-response-parser";
import { IResponse } from "../../../interfaces/IResponse";
import db from "../../../vendors/postgre";
import { TBNAME } from "../constant";

export default async ({ query: { id: peopleId, limit = 10, offset = 0 } }): Promise<IResponse> => {
  const [[{ result, totalCount }]] = await db.query(queryGenerator(`
    SELECT people.id FROM people
    LEFT JOIN (
        SELECT husband_id, wife_id, date_of_marriage, date_of_divorce, CH.child_id FROM couple C
        LEFT JOIN (
            SELECT parent_id, child_id FROM children
        ) CH ON CH.parent_id = C.id
    ) C ON C.child_id = people.id
    WHERE (C.husband_id = $$${peopleId}$$ OR C.wife_id = $$${peopleId}$$) AND people.id != $$${peopleId}$$
    GROUP BY people.id, people.date_of_birth
    ORDER BY people.date_of_birth;
  `));
  return response(
    ((result && result.length) ? result.map(({ id }) => id) : []),
    { limit, offset, totalCount },
  );
};

const queryGenerator = (query) => `
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
