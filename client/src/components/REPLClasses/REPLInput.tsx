import "../../styles/main.css";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { ControlledInput } from "../Authentication/ControlledInput";
import { COMMAND_BOX_LEGEND, REPL_BOX_PROMPT } from "../MockedData/Constants";
import { Functions } from "../BackendFunctionality/Functions";
import { REPLFunction } from "./REPLFunction";
import { Mock } from "node:test";
import { MockedREPLFunction } from "../MockedData/MockedREPLFunction";

/**
 * A class that handles the REPL input.
 */
interface REPLInputProps {
  commands: [string, string | string[][]][];
  setCommands: Dispatch<SetStateAction<[string, string | string[][]][]>>;
  mode: String;
  setMode: Dispatch<SetStateAction<String>>;
  removeCommands: string[];
  functionMap: Map<string, REPLFunction>;
  mockedFunctionMap: Map<string, MockedREPLFunction>;
}

export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  // Removes the unwanted functions.
  for (let i = 0; i < props.removeCommands.length; i++) {
    props.functionMap.delete(props.removeCommands[i]);
  }

  // Adds the extra functions.
  // props.addCommands.forEach((value, key) => {
  //   props.functionMap.set(key, value);
  // });

  // Defensive function used for testing.
  function getFuncs() {
    return new Map(props.functionMap);
  }

  /**
   * A helper function that sets the mode variable.
   * @param mode the arguments of the command.
   * @returns true if it was changed to a valid mode, false otherwise.
   */
  function setModeCommand(mode: string[]): boolean {
    if (mode[0] == "brief") {
      props.setMode("brief");
      return true;
    }
    if (mode[0] == "verbose") {
      props.setMode("verbose");
      return true;
    }
    return false;
  }

  const modeHelper = () => {
    props.setMode((prevMode) => {
      const newMode = prevMode === "brief" ? "verbose" : "brief";
      props.setCommands([
        ...props.commands,
        [commandString.trim(), "Mode has been changed to " + newMode + "."],
      ]);
      return newMode;
    });
  };

  /**
   * A function that handles submitting commands.
   */
  async function handleSubmit() {
    const commandInput = commandString.trim().split(" ");
    const command = commandInput[0];
    const commandArgs = commandInput.slice(1);
    document.getElementById("command-input")?.focus();

    const inputField = document.getElementById("command-input");

    if (command == undefined) {
      //put in an actual command
      props.setCommands([...props.commands, [command, "Invalid command"]]);
    } else {
      var fn;
      var mock;
      if ((mock = props.mockedFunctionMap.get(command)) != undefined) {
        //check to see if the command is a mocked one
        const mockedResult = mock(commandArgs);
        if (command == "loadMock") {
          props.setCommands([
            ...props.commands,
            [commandString.trim(), mockedResult],
          ]);
        } else if (command == "viewMock") {
          props.setCommands([
            ...props.commands,
            [commandString.trim(), mockedResult],
          ]);
        } else if (command == "searchMock") {
          props.setCommands([
            ...props.commands,
            [commandString.trim(), mockedResult],
          ]);
        }
      } else if ((fn = props.functionMap.get(command)) != undefined) {
        //check to see if the command is a real one
        //if the command exists in the function map
        try {
          const result = await fn(commandArgs);

          if (command == "load") {
            props.setCommands([
              ...props.commands,
              [commandString.trim(), result],
            ]);
          } else if (command == "view") {
            props.setCommands([
              ...props.commands,
              [commandString.trim(), result],
            ]);
          } else if (command == "search") {
            props.setCommands([
              ...props.commands,
              [commandString.trim(), result],
            ]);
          } else if (command == "broadband") {
            props.setCommands([
              ...props.commands,
              [commandString.trim(), result],
            ]);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (command == "mode") {
        //if the command was to change modes
        if (setModeCommand(commandArgs)) {
          props.setCommands([
            ...props.commands,
            [
              commandString.trim(),
              "Mode has been changed to " + commandArgs[0] + ".",
            ],
          ]);
        } else {
          props.setCommands([
            ...props.commands,
            [commandString.trim(), "Mode specified does not exist."],
          ]);
        }
      } else {
        //if the command isn't valid
        props.setCommands([
          ...props.commands,
          [commandString.trim(), "Command not found."],
        ]);
      }
    }
    setCommandString("");
  }

  useEffect(() => {
    //'Enter' key press
    const handleEnterKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    //'M' key press
    const handleMKeyPress = (event: KeyboardEvent) => {
      if ((event.key === "m" || event.key === "M") && event.ctrlKey) {
        //checks for both Cmd + M on Mac or Ctrl + M on Windows
        modeHelper();
      }
    };

    async function handleVKeyPress(event: KeyboardEvent) {
      if ((event.key === "v" || event.key === "V") && event.ctrlKey) {
        //checks for both Cmd + V on Mac or Ctrl + V on Windows
        var fn;
        if ((fn = props.functionMap.get("view")) != undefined) {
          const array: string[] = [];
          try {
            const result = await fn(array);
            props.setCommands([
              ...props.commands,
              [commandString.trim(), result],
            ]);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    document.addEventListener("keydown", handleEnterKeyPress);
    document.addEventListener("keydown", handleMKeyPress);
    document.addEventListener("keydown", handleVKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEnterKeyPress);
      document.removeEventListener("keydown", handleMKeyPress);
      document.removeEventListener("keydown", handleVKeyPress);
    };
  }, [props.commands, commandString, handleSubmit, modeHelper]);

  return (
    <div className="repl-input">
      <fieldset>
        <legend>{COMMAND_BOX_LEGEND}</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command Prompt"}
        />
      </fieldset>
      <div className="spacer"></div>
      <button aria-label={"Submit Command!"} id="Submit" onClick={handleSubmit}>
        {" "}
        Submit Command!{" "}
      </button>
      <p>
        <h3>Here are some keyboard shortcuts:</h3>
        <p>'enter' - to submit</p>
        <p>'ctrl + m' - to switch modes</p>
        <p>'ctrl + v' - to view the currently loaded file</p>
        <p>'ctrl + s' - to sign out</p>
      </p>
    </div>
  );
}
