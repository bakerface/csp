import { OutputChannel, OutputSelection } from "./types";

export function putFirst<T>(value: T, ...chans: OutputChannel<T>[]) {
  return new Promise<OutputSelection<T>>((resolve) => {
    const cancels = chans.map((channel) =>
      channel.produce((consumer) => {
        cancels.forEach((cancel) => cancel());
        consumer(value);
        resolve({ channel, value });
      })
    );
  });
}
