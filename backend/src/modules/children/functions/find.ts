import { response } from "graphql-response-parser";
import { IResponse } from "../../../interfaces/IResponse";
import db from "../../../vendors/postgre";
import { TBNAME } from "../constant";

export default async ({ query: { limit = 10, offset = 0, ...props } }): Promise<IResponse> => {
  const ids = (props && props.ids && props.ids instanceof Array)
    ? `'${props.ids.join("','")}'`
    : "";

  const [[{ result, totalCount }]] = await db.query(queryGenerator(
    (ids && ids.length)
      ? `select * from "${TBNAME}" where id in (${ids})`
      : `select id from "${TBNAME}" ${condition(props)} LIMIT ${limit} OFFSET ${offset}`,
  ));
  return response(
    ids ? result || [] : ((result && result.length) ? result.map(({ id }) => id) : []),
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

const condition = (props) => {
  if (props && Object.keys(props).length) {
    return `WHERE ${Object.keys(props).map((key) => `"${key}"=$$${props[key]}$$`).join(" AND ")}`;
  }
  return "";
};