import Notification from '../infra/typeorm/schemas/Notification';

import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

export default interface INoticationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
}
