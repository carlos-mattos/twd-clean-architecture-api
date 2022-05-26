import InvalidEmailError from "../../entities/errors/InvalidEmailError";
import InvalidNameError from "../../entities/errors/InvalidNameError";
import User from "../../entities/user/User";
import UserData from "../../entities/userData";
import { Either, left, right } from "../../shared/Either";
import UserRepository from "./ports/userRepository";

export default class RegisterUserOnMailingList {
  constructor(private readonly userRepo: UserRepository) {}

  public async execute({
    email,
    name,
  }: UserData): Promise<
    Either<InvalidEmailError | InvalidNameError, UserData>
  > {
    const userOrError: Either<InvalidEmailError | InvalidNameError, User> =
      User.create({ email, name });

    if (userOrError.isLeft()) return left(userOrError.value);

    const userAlreadyExists = await this.userRepo.exists({ email, name });

    if (userAlreadyExists) return left(new Error("User already exists"));

    const user = await this.userRepo.add({ email, name });

    return right(user);
  }
}
