import InvalidEmailError from "../../entities/errors/InvalidEmailError";
import InvalidNameError from "../../entities/errors/InvalidNameError";
import UserData from "../../entities/userData";
import { left } from "../../shared/Either";
import UserRepository from "./ports/userRepository";
import RegisterUserOnMailingList from "./registerUserOnMailingList";
import InMemoryUserRepository from "./repository/inMemoryUserRepository";

let userRepo: UserRepository;
let useCase: RegisterUserOnMailingList;
let users: UserData[];

describe("Register User on mailing list use case", () => {
  beforeEach(() => {
    users = [];
    userRepo = new InMemoryUserRepository(users);
    useCase = new RegisterUserOnMailingList(userRepo);
  });

  test("Should add User with complete data to mailing list", async () => {
    const name = "any_name";
    const email = "any@any.com";

    const result = await useCase.execute({ name, email });

    const user = await userRepo.findUserByEmail(email);

    expect(user.name).toBe(name);
    expect(result.value.name).toBe(name);
  });

  test("Should not add user with invalid email", async () => {
    const name = "any_name".repeat(300);
    const email = "any@any.com";

    const result = await useCase.execute({ name, email });

    const user = await userRepo.findUserByEmail(email);

    expect(user).toBeNull();
    expect(result).toEqual(left(new InvalidEmailError()));
  });

  test("Should not add user with invalid name", async () => {
    const name = "any_name";
    const email = "invalid_email";

    const result = await useCase.execute({ name, email });

    const user = await userRepo.findUserByEmail(email);

    expect(user).toBeNull();
    expect(result).toEqual(left(new InvalidNameError()));
  });
});
