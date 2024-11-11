import { REPLFunction } from "../REPLClasses/REPLFunction";
import { useState } from "react";

/**
 * A class that includes all the built in functions.
 *
 * @returns a map that maps the name of the function to the function itself.
 */
export function Functions() {
  const [file, setFile] = useState<string>("");
  const myFunction = new Map();

  /**
   * A function that handles loading files.
   *
   * @param args the file name and whether the file has headers.
   * @returns a Promise containing the result of loading a file.
   */
  const loadFunction: REPLFunction = async (args: string[]) => {
    if (args[0] != undefined) {
      setFile(args[0]);
      if (args[1] === undefined) {
        //headers assumed no
        try {
         const response = await fetch(
           "http://localhost:3232/load?file=" + args[0]);
         
          return await response.json()
          .then((result) => {
            const value = result.result;
            const filepath = result.filepath;
            const headers = result.headers;
            if (result.result == "error_bad_request") {
              return "Unable to load CSV.";
            } else if (result.result == "error_datasource") {
              return "CSV file is invalid.";
            } else {
              return (
                "Result: " +
                value +
                " Filepath: " +
                filepath +
                " Headers: " +
                headers
              );
            }
          })
        } catch (error) {
          return Promise.resolve("Error with load" + error);
        }
      } else {
        //headers specified yes/no
        try {
        const response = await fetch(
          "http://localhost:3232/load?file=" + args[0] + "&headers=" + args[1]
        );
        return await response
          .json()
          .then((response) => {
            const result = response.result;
            const filepath = response.filepath;
            const headers = response.headers;
            if (result.result == "error_bad_request") {
              return "Unable to load CSV.";
            } else if (result.result == "error_datasource") {
              return "CSV file is invalid.";
            } else {
              return (
                "Result: " +
                result +
                " Filepath: " +
                filepath +
                " Headers: " +
                headers
              );
            }
          })
        } catch (error) {
            return Promise.resolve("Error with load" + error);
        }
      }
    } else {
      //no file specified
      return Promise.resolve("CSV file not specified.");
    }
  };

  /**
   * A function that handles viewing the file that was previously loaded.
   *
   * @param args arguments to the function, for view specifically there are none.
   * @returns a Promise containing the file to be viewed.
   */
  const viewFunction: REPLFunction = async (args: string[]) => {
    if (file == "" || file == undefined) {
      //if no file was previously loaded
      return Promise.resolve("File was not loaded.");
    } else {
      //if there is a file to be viewed
      try {
      const response = await fetch("http://localhost:3232/view");
      return await response
        .json()
        .then((response) => {
          const result = response.result;
          const data = response.data;
          if (result == "error_empty_csv") {
            return Promise.resolve("Unable to view empty CSV.");
          } else {
            return data;
          }
        })
      } catch (error) {
        return Promise.resolve("Error with view" + error);
      }
    }
  };

  /**
   * A function that handles searching through a file for a specified value.
   *
   * @param args the value to be searched for and/or the column to search through.
   * @returns a Promise containing the row(s) with the value.
   */
  const searchFunction: REPLFunction = async (args: string[]) => {
    if (file == "" || file == undefined) {
      //if no file was loaded previously
      return Promise.resolve("File was not loaded.");
    }
    if (args[0] == undefined) {
      //no value
      return Promise.resolve("No value was specified.");
    } else {
      if (args[1] == undefined) {
        //no header
        try {
        const response = await fetch(
          "http://localhost:3232/search?value=" + args[0]
        );
        return await response
          .json()
          .then((response) => {
            const result = response.result;
            const data = response.data;
            if (result == "value_not_found") {
              return Promise.resolve("Value could not be found.");
            } else if (result == "error_bad_request") {
              return Promise.resolve("Column is invalid.");
            } else if (result == "value_not_entered") {
              return Promise.resolve("No value was inputted.");
            } else {
              return data;
            }
          })
        } catch (error) {
          return Promise.resolve("Error with view" + error);
        }
      } else {
        //header
        try {
        const response = await fetch(
          "http://localhost:3232/search?value=" + args[0] + "&column=" + args[1]
        );
        return await response
          .json()
          .then((response) => {
            const result = response.result;
            const data = response.data;
            if (result == "value_not_found") {
              return Promise.resolve("Value could not be found.");
            } else if (result == "error_bad_request") {
              return Promise.resolve("Column is invalid.");
            } else if (result == "value_not_entered") {
              return Promise.resolve("No value was inputted.");
            } else {
              return data;
            }
          })
        } catch (error) {
          return Promise.resolve("Error with view" + error);
        }
      }
    }
  };

  /**
   * A function that handles sending a request to the server in order to retrieve broadband data.
   * @param args the state and county we want the broadband data of.
   * @returns a Promise containing the broadband data.
   */
  const broadbandFunction: REPLFunction = async (args: string[]) => {
    if (args[0] == undefined || args[1] == undefined) {
      // if either the state or county weren't specified
      return Promise.resolve("State and/or county was not specified.");
    } else {
      try {
      const result = await fetch(
        "http://localhost:3232/broadband?state=" +
          args[0] +
          "&county=" +
          args[1]
      );
      return await result
        .json()
        .then((response) => {
          const result = response.result;
          const broadband = response.broadband;
          if (result != undefined) {
            return Promise.resolve("Input is invalid.");
          } else {
            return broadband;
          }
        })
      } catch (error) {
        return Promise.resolve("Error with view" + error);
      }
    }
  };


  return { loadFunction, viewFunction, searchFunction, broadbandFunction };
}
