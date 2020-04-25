import * as csp from ".";

describe("put", () => {
  it("should return the value when it is produced", async () => {
    const ch = csp.chan<string>();

    setTimeout(() => csp.take(ch), 10);

    const value = await csp.put(ch, "foo");

    if (value !== "foo") {
      throw new Error("Expected the value to be 'foo'");
    }
  });
});
