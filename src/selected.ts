import {
  InputChannel,
  InputSelection,
  OutputChannel,
  OutputSelection,
} from "./types";

export function selected<T>(
  selection: InputSelection<any>,
  ch: InputChannel<T>
): selection is InputSelection<T>;

export function selected<T>(
  selection: OutputSelection<any>,
  ch: OutputChannel<T>
): selection is OutputSelection<T>;

export function selected<T>(
  selection: InputSelection<any> | OutputSelection<any>,
  ch: InputChannel<T> | OutputChannel<T>
): selection is InputSelection<T> | OutputSelection<T> {
  return selection.channel === ch;
}
