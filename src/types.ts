export type Cancel = () => void;
export type Consumer<T> = (value: T) => void;
export type Producer<T> = (consumer: Consumer<T>) => void;

export interface InputChannel<T> {
  consume(consumer: Consumer<T>): Cancel;
}

export interface OutputChannel<T> {
  produce(producer: Producer<T>): Cancel;
}

export interface Channel<T> extends InputChannel<T>, OutputChannel<T> {}

export interface InputSelection<T> {
  readonly channel: InputChannel<T>;
  readonly value: T;
}

export interface OutputSelection<T> {
  readonly channel: OutputChannel<T>;
  readonly value: T;
}
