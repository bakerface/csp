# CSP
**Communicating Sequential Processes in TypeScript**


## Example

``` typescript
import * as csp from "@bakerface/csp";

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function producer(
  ch: csp.OutputChannel<string>,
  id: string,
  idle: number
) {
  for (;;) {
    await sleep(idle);
    await csp.put(ch, id);
  }
}

async function consumer(ch: csp.InputChannel<string>) {
  for (;;) {
    const id = await csp.take(ch);
    console.log(id);
  }
}

async function main() {
  const ch = csp.chan<string>();

  await Promise.all([
    producer(ch, "250ms", 250),
    producer(ch, "1s", 1000),
    consumer(ch),
  ]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
