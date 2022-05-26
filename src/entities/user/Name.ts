import { Either, left, right } from "../../shared/Either";
import InvalidNameError from "../errors/InvalidNameError";

export default class Name {
  private constructor(public readonly value: string) {}

  public static validate(name: string): boolean {
    if (!name) return false;

    name = name.trim();

    if (name.length < 2 || name.length > 256) return false;

    return true;
  }

  public static create(name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError());
    }

    return right(new Name(name));
  }
}
