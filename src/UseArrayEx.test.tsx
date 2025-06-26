import { act, renderHook } from "@testing-library/react";
import useArray from "./hooks/useArray";

describe("Use array hook test", () => {
  describe("with numbers", () => {
    it("should rednder initial arr", () => {
      const nums = [1, 2, 3, 4];
      const renderRs = renderHook(() => useArray(nums));
      expect(renderRs.result.current.array).toEqual(nums);
    });
    it("should add elemrnt arr", () => {
      const nums = [1, 2, 3, 4];
      const renderRs = renderHook(() => useArray(nums));
      act(() => {
        renderRs.result.current.push(6);
      });
      expect(renderRs.result.current.array).toEqual([...nums, 6]);
    });
    it("should update elemrnt arr", () => {
      const nums = [1, 2, 3, 4];
      const renderRs = renderHook(() => useArray(nums));
      act(() => {
        renderRs.result.current.update(2, 2);
      });
      expect(renderRs.result.current.array[2]).toEqual(2);
    });
    it("should remove elemrnt arr", () => {
      const nums = [1, 2, 3, 4];
      const renderRs = renderHook(() => useArray(nums));
      act(() => {
        renderRs.result.current.remove(0);
      });
      expect(renderRs.result.current.array).not.toContain(1);
    });
    it("should filter elemrnt arr", () => {
      const nums = [1, 2, 3, 4];
      const renderRs = renderHook(() => useArray(nums));
      act(() => {
        renderRs.result.current.filter((n) => n < 4);
      });
      expect(renderRs.result.current.array).toEqual([1, 2, 3]);
    });
    it("should clear elemrnt arr", () => {
      const nums = [1, 2, 3, 4];
      const renderRs = renderHook(() => useArray(nums));
      act(() => {
        renderRs.result.current.clear();
      });
      expect(renderRs.result.current.array).toEqual([]);
    });
  });
  describe("with strings", () => {
    it("filter string", () => {
      const initialArray = ["A", "B", "apple", "Map"];
      const renderResult = renderHook(() => useArray(initialArray));
      act(() => {
        renderResult.result.current.filter((n) => {
          const firstChar = n.charAt(0);
          return firstChar === firstChar.toUpperCase();
        });
      });
      expect(renderResult.result.current.array).toEqual(["A", "B", "Map"]);
    });
  });
});
