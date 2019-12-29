import { RESTDataSource } from "apollo-datasource-rest";
import DataLoader from "dataloader";
import constant from "../../constants";
import find from "./functions/find";
import findChildrenByPeopleID from "./functions/findChildrenByPeopleID";
import findCoupleByPeopleID from "./functions/findCoupleByPeopleID";
import { IPeopleInput } from "./interface";

export default class PeopleAPI extends RESTDataSource {
  private dataLoader = new DataLoader(async (ids: string[]) => {
    const { edges } = await find({ query: { ids, limit: 0, offset: 0 } });
    return edges || [];
  });

  public async getById(id) {
    return this.dataLoader.load(id);
  }

  public async getList(
    { limit = 10, offset = 0, ...props }: IPeopleInput = { limit: constant.limit, offset: constant.offset },
  ) {
    const { edges } = await find({ query: { limit, offset, ...props } });
    return this.dataLoader.loadMany(edges);
  }

  public async getPeopleCouple(
    { id, limit = 10, offset = 0 }: IPeopleInput = { limit: constant.limit, offset: constant.offset },
  ) {
    const { edges } = await findCoupleByPeopleID({ query: { id, limit, offset } });
    return this.dataLoader.loadMany(edges);
  }

  public async getPeopleChildren(
    { id, limit = 10, offset = 0 }: IPeopleInput = { limit: constant.limit, offset: constant.offset },
  ) {
    const { edges } = await findChildrenByPeopleID({ query: { id, limit, offset } });
    return this.dataLoader.loadMany(edges);
  }

  protected willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }
}
