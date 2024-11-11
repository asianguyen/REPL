import { useState } from "react";
import LoginLogout from "./LoginLogout";
import REPL from "../REPLClasses/REPL";
import { FunctionMap } from "../FunctionMap";
import { Functions } from "../BackendFunctionality/Functions";
import { MockedFunctions } from "../BackendFunctionality/MockedFunctions";

/**
 * A class that handles google authentication.
 * @returns the login components.
 */
function AuthRoute() {
  const [authing, setAuthing] = useState(false);
  const functions = Functions();
  const functionMap = FunctionMap();
  const mockedMap = new Map();
  const mockedFunctions = MockedFunctions();
  //real function map
  functionMap.addFunction("load", functions.loadFunction);
  functionMap.addFunction("view", functions.viewFunction);
  functionMap.addFunction("search", functions.searchFunction);
  functionMap.addFunction("broadband", functions.broadbandFunction);

  //mocked function map
  mockedMap.set("loadMock", mockedFunctions.loadMockFunction);
  mockedMap.set("viewMock", mockedFunctions.viewMockFunction);
  mockedMap.set("searchMock", mockedFunctions.searchMockFunction);

  // USEFUL FOR PLAYWRIGHT TESTING PURPOSES: auto sets authing to true in test environment
  if (!authing && import.meta.env.VITE_APP_NODE_ENV === "test") {
    setAuthing(true);
  }
  return (
    <>
      <LoginLogout authing={authing} setAuthing={setAuthing} />
      {authing ? (
        <REPL
          functionMap={functionMap.getFuncs()}
          mockedFunctionMap={mockedMap}
        />
      ) : null}
    </>
  );
}

export default AuthRoute;
