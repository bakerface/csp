import * as csp from ".";

describe("putFirst", () => {
  it("should return values in the order they are consumed", async () => {
    const chA = csp.chan<string>();
    const chB = csp.chan<string>();
    const chC = csp.chan<string>();

    setTimeout(() => csp.take(chA), 10);
    setTimeout(() => csp.take(chB), 20);
    setTimeout(() => csp.take(chC), 30);

    let selection = await csp.putFirst("foo", chA, chB, chC);

    if (!csp.selected(selection, chA)) {
      throw new Error("Expected channel A to be selected");
    }

    if (selection.value !== "foo") {
      throw new Error("Expected the value to be 'foo'");
    }

    selection = await csp.putFirst("bar", chA, chB, chC);

    if (!csp.selected(selection, chB)) {
      throw new Error("Expected channel B to be selected");
    }

    if (selection.value !== "bar") {
      throw new Error("Expected the value to be 'bar'");
    }

    selection = await csp.putFirst("baz", chA, chB, chC);

    if (!csp.selected(selection, chC)) {
      throw new Error("Expected channel C to be selected");
    }

    if (selection.value !== "baz") {
      throw new Error("Expected the value to be 'baz'");
    }
  });
});
