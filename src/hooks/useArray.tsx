import { useState } from "react";

export default function useArray<T>(defaultValue: T[]) {
  const [array, setArray] = useState(defaultValue);

  function push(ele: T) {
    setArray((e) => [...e, ele]);
  }

  function filter(cb: (value: T, index: number, array: T[]) => boolean) {
    setArray((e) => e.filter(cb));
  }

  function update(index: number, element: T) {
    setArray((a) => [
      ...a.slice(0, index),
      element,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function remove(index: number) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  return { push, array, set: setArray, filter, update, remove, clear };
}
