import Email from "./Email";

describe("Email validation", () => {
  test("Should not accept null string", () => {
    const email = null;
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept empty string", () => {
    const email = "";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should accept valid email", () => {
    const email = "any@any.com";
    expect(Email.validate(email)).toBe(true);
  });

  test("Should not accept local part larger than 64 chars", () => {
    const email = "l".repeat(65) + "@any.com";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept string larger than 320 chars", () => {
    const email = "l".repeat(321) + "@any.com";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept domain part larger than 255 chars", () => {
    const email = "any@" + "l".repeat(256) + ".com";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept empty local part", () => {
    const email = "@any.com";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept empty domain part", () => {
    const email = "any@";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept domain with a part larger than 63 chars", () => {
    const email = "any@" + "l".repeat(64) + ".com";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept local part with invalid char", () => {
    const email = "any email@any.com";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept local part with ending dot", () => {
    const email = "any@any.com.";
    expect(Email.validate(email)).toBe(false);
  });

  test("Should not accept string without at-sign", () => {
    const email = "any.com";
    expect(Email.validate(email)).toBe(false);
  });
});
