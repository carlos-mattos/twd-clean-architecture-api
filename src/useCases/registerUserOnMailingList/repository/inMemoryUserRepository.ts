import UserRepository from "../ports/userRepository";
import UserData from "../userData";

export default class InMemoryUserRepository implements UserRepository {
  constructor(private users: UserData[]) {}

  async add(user: UserData): Promise<void> {
    const exists = await this.exists(user);

    if (exists) {
      throw new Error("User already exists");
    }

    this.users.push(user);
    return;
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findAllUsers(): Promise<UserData[]> {
    return this.users;
  }

  async exists(user: UserData): Promise<boolean> {
    return this.users.some((userStored) => userStored.email === user.email);
  }
}
