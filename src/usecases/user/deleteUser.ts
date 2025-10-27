import { IUserRepository } from "../../repositories/userRepository";

export class DeleteUser {
  constructor(private readonly repo: IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.repo.delete(id);
    return !!deleted;
  }
}
