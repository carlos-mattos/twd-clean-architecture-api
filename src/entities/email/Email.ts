import { Either, left, right } from "../../shared/Either";
import InvalidEmailError from "../errors/InvalidEmailError";

export default class Email {
  private constructor(public readonly value: string) {}

  static validate(email: string): boolean {
    if (!email) return false;

    const [local, domain] = email.split("@");

    if (!local || !domain) return false;

    if (
      email.length > 320 ||
      local.length > 64 ||
      local.length === 0 ||
      domain.length > 255 ||
      domain.length === 0
    )
      return false;

    const domainParts = domain.split(".");
    if (domainParts.some((part) => part.length > 63)) return false;

    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!regexEmail.test(email)) return false;

    return true;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!Email.validate(email)) {
      return left(new InvalidEmailError());
    }

    return right(new Email(email));
  }
}
