import useArray from "./hooks/useArray";

const UseArrayEx = () => {
  const { array, set, remove, push, clear, filter, update } = useArray([
    1, 2, 4, 5, 5,
  ]);
  return (
    <div>
      UseArrayEx
      <div>
        Add commentMore actions
        <div>{array.join(", ")}</div>
        <button onClick={() => push(5)}>Add 5</button>
        <br />
        <button onClick={() => update(1, 8)}>Change Second Element To 8</button>
        <br />
        <button onClick={() => remove(1)}>Remove Second Element</button>
        <br />
        <button onClick={() => filter((n) => n < 3)}>
          Keep Numbers Less Than 3
        </button>
        <br />
        <button onClick={() => set([1, 2, 3])}>Set To 1, 2,3</button>
        <br />
        <button onClick={clear}>Clear</button>
        <br />
      </div>{" "}
    </div>
  );
};

export default UseArrayEx;
