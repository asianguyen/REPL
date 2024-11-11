/*
  Test ordinary Java/TypeScript
*/

import { expect, test } from 'vitest';
import { FunctionMap } from '../../src/components/FunctionMap'
import { Addons } from '../../src/modifications/Addons'

test('Sanity Check is 1 + 1 = 2?', () => {
  expect(1 + 1).toBe(2)
})

test("Add to map", () => {
  const functionMap = FunctionMap()
  const fn = Addons();
  functionMap.addFunction("bananas", fn);
  const map = functionMap.getFuncs();
  expect(map.get("bananas")).eqls(fn);
})

test("Get map", () => {
  const functionMap = FunctionMap();
  const fn = Addons();
  functionMap.addFunction("bananas", fn);
  const map = functionMap.getFuncs();
  expect(functionMap.getFuncs()).eqls(map);
})

// For more information on how to make unit tests, visit:
// https://jestjs.io/docs/using-matchers