type Cancel = () => void;
type Consumer<T> = (value: T) => void;
type Producer<T> = (consumer: Consumer<T>) => void;
interface InputChannel<T> {
    consume(consumer: Consumer<T>): Cancel;
}
interface OutputChannel<T> {
    produce(producer: Producer<T>): Cancel;
}
interface Channel<T> extends InputChannel<T>, OutputChannel<T> {
}
interface InputSelection<T> {
    readonly channel: InputChannel<T>;
    readonly value: T;
}
interface OutputSelection<T> {
    readonly channel: OutputChannel<T>;
    readonly value: T;
}
declare function chan<T>(): Channel<T>;
declare function put<T>(ch: OutputChannel<T>, value: T): Promise<T>;
declare function putFirst<T>(value: T, ...chans: OutputChannel<T>[]): Promise<OutputSelection<T>>;
declare function selected<T>(selection: InputSelection<any>, ch: InputChannel<T>): selection is InputSelection<T>;
declare function selected<T>(selection: OutputSelection<any>, ch: OutputChannel<T>): selection is OutputSelection<T>;
declare function take<T>(ch: InputChannel<T>): Promise<T>;
declare function takeFirst(...chans: InputChannel<any>[]): Promise<InputSelection<unknown>>;
export { chan, put, putFirst, selected, take, takeFirst, Cancel, Consumer, Producer, InputChannel, OutputChannel, Channel, InputSelection, OutputSelection };
