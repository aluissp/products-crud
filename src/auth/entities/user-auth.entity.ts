import { Expose } from 'class-transformer';

export class UserAuth {
  @Expose()
  id: string;

  @Expose()
  email: string;

  constructor(partial: Partial<UserAuth>) {
    Object.assign(this, partial);
  }
}
