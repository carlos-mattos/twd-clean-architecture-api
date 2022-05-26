import { Either, left, right } from "../../shared/Either";
import Email from "../email/Email";
import InvalidEmailError from "../errors/InvalidEmailError";
import InvalidNameError from "../errors/InvalidNameError";
import UserData from "../userData";
import Name from "./Name";

export default class User {
  public readonly name: Name;
  public readonly email: Email;

  private constructor(name: Name, email: Email) {
    this.name = name;
    this.email = email;
  }

  static create(
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name);

    if (nameOrError.isLeft()) return left(new InvalidNameError());

    const emailOrError = Email.create(userData.email);

    if (emailOrError.isLeft()) return left(new InvalidEmailError());

    return right(new User(nameOrError.value, emailOrError.value));
  }
}
