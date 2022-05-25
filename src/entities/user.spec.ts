import { left } from "../shared/Either";
import InvalidEmailError from "./errors/invalidEmailError";
import User from "./User";

describe("User domain entity", () => {
  test("Should not create user with invalid email", async () => {
    const invalidEmail = "invalidEmail";

    const error = await User.create({ name: "any_name", email: invalidEmail });

    expect(error).toEqual(left(new InvalidEmailError()));
  });
});
