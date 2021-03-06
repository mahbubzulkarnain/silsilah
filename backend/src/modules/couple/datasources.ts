import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';
import constant from '../../constants';
import find from './functions/find';
import { ICoupleInput } from './interface';

export default class CoupleAPI extends RESTDataSource {
  private dataLoader = new DataLoader(async (ids: string[]) => {
    const { edges } = await find({ query: { ids, limit: 0, offset: 0 } });
    return edges || [];
  });

  public getById(id): Promise<unknown> {
    if (!id) return null;
    return this.dataLoader.load(id);
  }

  public async getList(
    { limit = 10, offset = 0, ...props }: ICoupleInput = { limit: constant.limit, offset: constant.offset },
  ): Promise<unknown[]> {
    const { edges } = await find({ query: { limit, offset, ...props } });
    return this.dataLoader.loadMany(edges);
  }

  protected willSendRequest(request): void {
    request.headers.set('Authorization', this.context.token);
  }
}
