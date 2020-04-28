import { RESTDataSource } from 'apollo-datasource-rest';
import DataLoader from 'dataloader';
import { auth } from 'firebase-admin';
import find from './functions/find';
import findByEmail from './functions/findByEmail';

export default class UserAPI extends RESTDataSource {
  private dataLoader = new DataLoader(async (ids: string[]) => {
    const { users } = await find();
    return ids.map((id) => users.find((data) => data.uid === id));
  });

  public getById(id): Promise<auth.UserRecord> {
    return this.dataLoader.load(id);
  }


  public async getByEmail(email): Promise<auth.UserRecord> {
    const { uid } = await findByEmail(email);
    return this.dataLoader.load(uid);
  }

  protected willSendRequest(request): void {
    request.headers.set('Authorization', this.context.token);
  }
}
