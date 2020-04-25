import { InputChannel } from "./types";

export function take<T>(ch: InputChannel<T>) {
  return new Promise<T>((resolve) => ch.consume(resolve));
}
