import { useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { Removes } from "../../modifications/Removes";
import { REPLFunction } from "./REPLFunction";
import { MockedREPLFunction } from "../MockedData/MockedREPLFunction";

interface REPLprops {
  functionMap: Map<string, REPLFunction>;
  mockedFunctionMap: Map<string, MockedREPLFunction>;
}
/**
 * A top level class for the REPL component.
 *
 * @returns the rendered and updated state for the web front-end.
 */
export default function REPL(props: REPLprops) {
  const [myCommands, setCommands] = useState<[string, string | string[][]][]>(
    []
  );
  const [mode, setMode] = useState<String>("brief");

  return (
    <div className="repl">
      <REPLHistory commands={myCommands} mode={mode} />
      <div className="spacer"></div>
      <REPLInput
        commands={myCommands}
        setCommands={setCommands}
        mode={mode}
        setMode={setMode}
        removeCommands={Removes()}
        functionMap={props.functionMap}
        mockedFunctionMap={props.mockedFunctionMap}
      />
    </div>
  );
}
