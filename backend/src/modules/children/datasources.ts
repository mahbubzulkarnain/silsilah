import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';
import constant from '../../constants';
import find from './functions/find';
import { IChildrenInput } from './interface';

export default class ChildrenAPI extends RESTDataSource {
  private dataLoader = new DataLoader(async (ids: string[]) => {
    const { edges } = await find({ query: { ids, limit: 0, offset: 0 } });
    return edges || [];
  });

  public async getById(id): Promise<unknown> {
    if (!id) return null;
    return this.dataLoader.load(id);
  }

  public async getList(
    { limit = 10, offset = 0, ...props }: IChildrenInput = { limit: constant.limit, offset: constant.offset },
  ): Promise<unknown[]> {
    const { edges } = await find({ query: { limit, offset, ...props } });
    return this.dataLoader.loadMany(edges);
  }

  public async getParent(
    { limit = 10, offset = 0, ...props }: IChildrenInput = { limit: constant.limit, offset: constant.offset },
  ): Promise<unknown> {
    const { edges } = await find({ query: { limit, offset, ...props } });
    if (edges?.length) {
      return this.dataLoader.load(edges[0]);
    }
    return {};
  }

  protected willSendRequest(request): void {
    request.headers.set('Authorization', this.context.token);
  }
}
