import * as csp from ".";

describe("take", () => {
  it("should return the value when it is consumed", async () => {
    const ch = csp.chan<string>();

    setTimeout(() => csp.put(ch, "foo"), 10);

    const value = await csp.take(ch);

    if (value !== "foo") {
      throw new Error("Expected the value to be 'foo'");
    }
  });
});
