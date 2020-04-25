import { OutputChannel } from "./types";

export function put<T>(ch: OutputChannel<T>, value: T) {
  return new Promise<T>((resolve) =>
    ch.produce((consumer) => {
      consumer(value);
      resolve(value);
    })
  );
}
