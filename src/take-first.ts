import { InputChannel, InputSelection } from "./types";

export function takeFirst(...chans: InputChannel<any>[]) {
  return new Promise<InputSelection<unknown>>((resolve) => {
    const cancels = chans.map((channel) =>
      channel.consume((value) => {
        cancels.forEach((cancel) => cancel());
        resolve({ channel, value });
      })
    );
  });
}
