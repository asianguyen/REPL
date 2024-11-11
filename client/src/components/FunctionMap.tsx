import { REPLFunction } from "./REPLClasses/REPLFunction";
import { MockedREPLFunction } from "./MockedData/MockedREPLFunction";

/**
 * A class that represents the map of functions.
 * @returns the functions that can be used.
 */
export function FunctionMap() {
  const functionMap = new Map();

  /**
   * Adds a function to the function map.
   * @param key the name of the functions.
   * @param value the function itself.
   */
  const addFunction = (key: string, value: REPLFunction) => {
    functionMap.set(key, value);
  };

  /**
   * A function that adds a mocked function to the map.
   * @param key the name of the function.
   * @param value the mocked function itself.
   */
  const addMockedFunction = (key: string, value: MockedREPLFunction) => {
    functionMap.set(key, value);
  };

  /**
   * Gets a defensive copy of the function map.
   * @returns a copy of the function map.
   */
  const getFuncs = () => {
    return new Map(functionMap);
  };

  return {
    addFunction,
    getFuncs,
    addMockedFunction,
  };
}
