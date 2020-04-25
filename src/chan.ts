import { Cancel, Channel, Consumer, Producer } from "./types";

class Chan<T> implements Channel<T> {
  private _consumers: Consumer<T>[];
  private _producers: Producer<T>[];

  public constructor() {
    this._consumers = [];
    this._producers = [];
  }

  public consume(consumer: Consumer<T>): Cancel {
    const handle = setImmediate(() => this._update());

    this._consumers.push(consumer);

    return () => {
      clearImmediate(handle);
      this._consumers = this._consumers.filter((c) => c !== consumer);
    };
  }

  public produce(producer: Producer<T>): Cancel {
    const handle = setImmediate(() => this._update());

    this._producers.push(producer);

    return () => {
      clearImmediate(handle);
      this._producers = this._producers.filter((p) => p !== producer);
    };
  }

  private _update() {
    for (;;) {
      const producer = this._producers.shift();

      if (!producer) {
        break;
      }

      const consumer = this._consumers.shift();

      if (!consumer) {
        this._producers.unshift(producer);
        break;
      }

      producer(consumer);
    }
  }
}

export function chan<T>(): Channel<T> {
  return new Chan<T>();
}
