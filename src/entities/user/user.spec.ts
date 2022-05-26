import { left } from "../../shared/Either";
import InvalidEmailError from "../errors/InvalidEmailError";
import InvalidNameError from "../errors/InvalidNameError";
import User from "./User";

describe("User domain entity", () => {
  test("Should not create user with invalid email", () => {
    const invalidEmail = "invalidEmail";

    const error = User.create({ name: "any_name", email: invalidEmail });

    expect(error).toEqual(left(new InvalidEmailError()));
  });

  test("Should not create a user with invalid name (too few characters)", () => {
    const invalidName = "a";

    const error = User.create({
      name: invalidName,
      email: "any_email@any.com",
    });

    expect(error).toEqual(left(new InvalidNameError()));
  });

  test("Should not create a user with invalid name (too many characters)", () => {
    const invalidName = "a".repeat(257);

    const error = User.create({
      name: invalidName,
      email: "any_email@any.com",
    });

    expect(error).toEqual(left(new InvalidNameError()));
  });

  test("Should create a user with valid data", () => {
    const { email, name } = User.create({
      name: "any_name",
      email: "any_email@any.com",
    }).value as User;

    expect(name.value).toEqual("any_name");
    expect(email.value).toEqual("any_email@any.com");
  });
});
