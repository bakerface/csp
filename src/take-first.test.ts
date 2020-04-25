import * as csp from ".";

describe("takeFirst", () => {
  it("should return values in the order they are consumed", async () => {
    const chB = csp.chan<boolean>();
    const chN = csp.chan<number>();
    const chS = csp.chan<string>();

    setTimeout(() => csp.put(chB, true), 10);
    setTimeout(() => csp.put(chN, 42), 20);
    setTimeout(() => csp.put(chS, "foo"), 30);

    let selection = await csp.takeFirst(chB, chN, chS);

    if (!csp.selected(selection, chB)) {
      throw new Error("Expected boolean channel to be selected");
    }

    if (selection.value !== true) {
      throw new Error("Expected the value to be 'true'");
    }

    selection = await csp.takeFirst(chB, chN, chS);

    if (!csp.selected(selection, chN)) {
      throw new Error("Expected number channel to be selected");
    }

    if (selection.value !== 42) {
      throw new Error("Expected the value to be '42'");
    }

    selection = await csp.takeFirst(chB, chN, chS);

    if (!csp.selected(selection, chS)) {
      throw new Error("Expected string channel to be selected");
    }

    if (selection.value !== "foo") {
      throw new Error("Expected the value to be 'foo'");
    }
  });
});
