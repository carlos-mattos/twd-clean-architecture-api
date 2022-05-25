import { Either, left } from "../shared/Either";
import Email from "./Email";
import InvalidEmailError from "./errors/invalidEmailError";
import UserData from "./userData";

export default class User {
  static create(userData: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) return left(new InvalidEmailError());
  }
}
