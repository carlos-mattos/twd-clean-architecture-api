import UserData from "../userData";
import InMemoryUserRepository from "./inMemoryUserRepository";

describe("In memory User repository", () => {
  test("Should return null if user was not found", async () => {
    const users: UserData[] = [];

    const userRepo = new InMemoryUserRepository(users);

    const user = await userRepo.findUserByEmail("any@any.com");

    expect(user).toBeNull();
  });

  test("Should return a User", async () => {
    const users: UserData[] = [];

    const name = "any_name";
    const email = "any@any.com";

    const userRepo = new InMemoryUserRepository(users);

    await userRepo.add({ name, email });

    const user = await userRepo.findUserByEmail(email);

    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
  });

  test("Should return a list of all Users", async () => {
    const users: UserData[] = [
      {
        email: "taunoger@jevibu.bd",
        name: "Teresa Little",
      },
      {
        email: "zubufsa@nug.sy",
        name: "Lucas Rose",
      },
    ];

    const userRepo = new InMemoryUserRepository(users);

    const usersList = await userRepo.findAllUsers();

    expect(usersList.length).toBe(2);
    expect(usersList[0].name).toBe("Teresa Little");
  });
});
