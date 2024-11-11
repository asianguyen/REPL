import { expect, test } from "@playwright/test";

/**
 * Testing class. The label at the start of each test corresponds to a test that is
 * described in the README.
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

/////////////////////////// GENERAL UTILITY TESTING ///////////////////////////

// test("Once logged in, I see the full repl page.", async ({ page }) => {
//   //see shortcut instructions
//     await expect(page.getByText("Here are some keyboard shortcuts:")).toBeVisible();
//     await expect(page.getByText("'enter' - to submit")).toBeVisible();
//     await expect(page.getByText("'ctrl + m' - to switch modes")).toBeVisible();
//   //see signout button
//     await expect(page.getByLabel("Sign Out")).toBeVisible();
//   //see command input box
//     await expect(page.getByLabel("Command Prompt")).toBeVisible();

//   //see submit button
//     await expect(
//     page.getByRole("button", { name: "Submit Command!" })
//   ).toBeVisible();
// });

// test("After I type into the input box, its text changes.", async ({ page }) => {
//   try {
//   await page.getByLabel("Command Prompt").click();
//   await page.getByLabel("Command Prompt").fill("Awesome command");
//   const mock_input = `Awesome command`;
//   await expect(page.getByLabel("Command Prompt")).toHaveValue(mock_input);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// });

// test("After I click the button, my command gets pushed.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("Awesome command");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   // you can use page.evaulate to grab variable content from the page for more complex assertions
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" Command not found. ");
// });

// test("I can use enter to submit", async ({ page }) => {

//   await page.getByLabel("Command Prompt").fill("Awesome command");
//   //same as above, just using enter instead of the button
//   await page.keyboard.press("Enter");
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" Command not found. ");
// });

//   // /////////////////////////// MODE SWITCH TESTING ///////////////////////////

// test("Mode switch using keys.", async ({ page }) => {
//   await expect(page.getByText("'ctrl + m' - to switch modes")).toBeVisible();
//   await page.keyboard.press("Control+M");
//   //in verbose
//   await expect(page.getByText("Command:")).toBeVisible();
//   await expect(
//     page.getByText("Mode has been changed to verbose.")
//   ).toBeVisible();

//   await page.keyboard.press("Control+M");

//   //in brief
//   await expect(page.getByText("Command:")).not.toBeVisible();
//   await expect(page.getByText("Mode has been changed to brief.")).toBeVisible();
// });

// test("Switch to brief mode with no history.", async ({ page }) => {
//   try {
//   await page.getByLabel("Command Prompt").fill("mode brief");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" Mode has been changed to brief. ");
// } catch (error) {
//   console.error("An error occurred:", error);
// }
// });

// test("Switch to verbose mode with no history.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("mode verbose");
//   await page.getByLabel("Submit Command!").click();
//   // Use page.evaulate to grab variable content from the page for more complex assertions.
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(
//     "Command: mode verbose Output: Mode has been changed to verbose."
//   );
// });

// test("Mode of the history is changed as well.", async ({ page }) => {
//   // Submit command.
//   await page.getByLabel("Command Prompt").fill("Awesome command");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   // Use page.evaulate to grab variable content from the page for more complex assertions.
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" Command not found. ");

//   // Switch to verbose mode.
//   await page.getByLabel("Command Prompt").fill("mode verbose");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const updatedFirstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(updatedFirstChild).toEqual(
//     "Command: Awesome command Output: Command not found."
//   );

//   const updatedSecondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   expect(updatedSecondChild).toEqual(
//     "Command: mode verbose Output: Mode has been changed to verbose."
//   );
// });

// // /////////////////////////// LOAD TESTING ///////////////////////////

// test("Load basic CSV file.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");

//   await page.getByLabel("Command Prompt").press("Enter");
//   await page.getByText(
//     "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//   );

// });

// test("Load basic CSV file in verbose.", async ({ page }) => {
//   // Switch to verbose mode.
//   await page.getByLabel("Command Prompt").fill("mode verbose");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   //command should be visible
//   await expect(
//     page.getByText("Command: load data/stars/ten-star.csv yes")
//   ).toBeVisible();

//   await expect(
//     page.getByText(
//       "Output: Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();
// });

// test("Load CSV file that doesn't exist.", async ({ page }) => {
//   //load a file that doesn't exist but inside protected directory
//   await page.getByLabel("Command Prompt").fill("load CS32.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(page.getByText("CSV file is invalid.")).toBeVisible();

//   await page.getByLabel("Command Prompt").fill("load CS32.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(
//     page.getByText("Result: error_datasource Filepath: undefined Headers: yes")
//   ).toBeVisible();
// });

// test("Load CSV file that exists but outside protected directory.", async ({
//   page,
// }) => {
//   //load a file that doesn't exist but inside protected directory
//   await page.getByLabel("Command Prompt").fill("load ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(
//     page.getByText("Result: error_datasource Filepath: undefined Headers: yes")
//   ).toBeVisible();
// });

// test("Load with no file provided.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("load ");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(page.getByText("CSV file not specified.")).toBeVisible();
// });

// test("Load invalid headers.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv notAHeader");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(
//     page.getByText(
//       "Result: error_bad_request Filepath: undefined Headers: notAHeader"
//     )
//   ).toBeVisible();
// });

// test("Load given extra arguments.", async ({ page }) => {
//   //load with extra arguments
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes extra");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   //will still load as long as second argument is a file and third was a proper header value
//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();
// });

// test("Load no header arg.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("load data/stars/ten-star.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: undefined"
//     )
//   ).toBeVisible();
// });

// // /////////////////////////// VIEW TESTING ///////////////////////////

// test("View normal CSV.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();

//   //view first csv
//   await page.getByLabel("Command Prompt").fill("view");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0")).toContainText(
//     "StarID"
//   );

//   await expect(page.getByLabel("row-5")).toContainText("3759");
// });

// test("View normal CSV using keys.", async ({ page }) => {
//   //same as above but using keys
//   await expect(
//     page.getByText("'ctrl + v' - to view the currently loaded file")
//   ).toBeVisible();
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.keyboard.press("Enter");

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();

//   //view
//   await page.getByLabel("Command Prompt").fill("view");
//   await page.keyboard.press("Control+V");

//   await expect(page.getByLabel("row-0")).toContainText("StarID");

//   await expect(page.getByLabel("row-5")).toContainText("3759");
// });

// test("Load and view empty CSV.", async ({ page }) => {
//   //load an empty csv
//   await page.getByLabel("Command Prompt").fill("load data/malformed/empty.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/malformed/empty.csv Headers: undefined"
//     )
//   ).toBeVisible;

//   await page.getByLabel("Command Prompt").fill("view");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   //view empty csv
//   await expect(page.getByText("Unable to view empty CSV.")).toBeVisible();
// });

// test("Load view load view diff files.", async ({ page }) => {
//   //load first csv
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();

//   //view first csv
//   await page.getByLabel("Command Prompt").fill("view");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0").nth(0)).toContainText(
//     "StarIDProperNameXYZ"
//   );

//   await expect(page.getByLabel("row-5")).toContainText("3759");

//   //load second csv
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/census/no_headers_dol_ri_earnings_disparity.csv no");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/census/no_headers_dol_ri_earnings_disparity.csv Headers: no"
//     )
//   ).toBeVisible();

//   //view second csv
//   await page.getByLabel("Command Prompt").fill("view");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0").nth(1)).toContainText(
//     'RIWhite" $1,058.47 "$1. $1.00 75%'
//   );

//   await expect(page.getByLabel("row-5").nth(1)).toContainText("Multiracial");
// });

// test("View with no CSV loaded.", async ({ page }) => {
//   //view without loading first
//   await page.getByLabel("Command Prompt").fill("view");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByText("File was not loaded.")).toBeVisible();
// });

// /////////////////////////// SEARCH TESTING ///////////////////////////

// test("Search by column name.", async ({ page }) => {
//   await page
//       .getByLabel("Command Prompt")
//       .fill("load data/stars/ten-star.csv yes");
//     await page.getByRole("button", { name: "Submit Command!" }).click();

//     await expect(
//       page.getByText(
//         "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//       )
//     ).toBeVisible();

//   //search by header name
//   await page.getByLabel("Command Prompt").fill("search Sol ProperName");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0")).toContainText(
//     "Sol"
//   );

// });

// test("Search with no col identifier.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();

//   //search by header name
//   await page.getByLabel("Command Prompt").fill("search Sol");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0")).toContainText("Sol");
// });

// test("Search returns multiple rows", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill(
//       "load data/census/no_headers_postsecondary_education.csv no"
//     );
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/census/no_headers_postsecondary_education.csv Headers: no"
//     )
//   ).toBeVisible();

//   //search by header name
//   await page.getByLabel("Command Prompt").fill("search men");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0")).toContainText("Asian");
//   await expect(page.getByLabel("row-0")).toContainText("Men");

//   await expect(page.getByLabel("row-3")).toContainText("Hispanic or Latino");
//   await expect(page.getByLabel("row-3")).toContainText("Men");
// });

// test("Search by column id.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();

//   //search by col number
//   await page.getByLabel("Command Prompt").fill("search Sol 1");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0")).toContainText("Sol");
// });

// test("Search by negative column.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();

//   //search by col number
//   await page.getByLabel("Command Prompt").fill("search Sol -1");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByText("Column is invalid.")).toBeVisible();
// });

// test("Search by out of range column.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();

//   //search by col number
//   await page.getByLabel("Command Prompt").fill("search Sol 10");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByText("Column is invalid.")).toBeVisible();
// });

// test("Search with no CSV loaded.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("search Sol");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByText("File was not loaded.")).toBeVisible();
// });

// test("Search with no results.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();

//   //search by col number
//   await page.getByLabel("Command Prompt").fill("search silly");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByText("Value could not be found.")).toBeVisible();
// });

// test("Search with no value.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();
//   await page.getByLabel("Command Prompt").fill("search ");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByText("No value was specified.")).toBeVisible();
// });

// test("Load malformed CSV then search it.", async ({ page }) => {
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/malformed/malformed_signs.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/malformed/malformed_signs.csv Headers: yes"
//     )
//   ).toBeVisible();
//   //expected 2 cols
//   await page.getByLabel("Command Prompt").fill("search aries 0");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0")).toContainText("Aries");
//   //expected 3 cols
//   await page.getByLabel("Command Prompt").fill("search roberto");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0").nth(1)).toContainText("Roberto");

//   //expected 1 col
//   await page.getByLabel("Command Prompt").fill("search virgo");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0").nth(2)).toContainText("Virgo");

//   //expected not found
//   await page.getByLabel("Command Prompt").fill("search virgo 1");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByText("Value could not be found.")).toBeVisible();
// });

// test("load view search twice.", async ({ page }) => {
//   //load first csv
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/stars/ten-star.csv yes");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/stars/ten-star.csv Headers: yes"
//     )
//   ).toBeVisible();
//   //view first csv
//   await page.getByLabel("Command Prompt").fill("view");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(page.getByLabel("row-0").nth(0)).toContainText(
//     "StarIDProperNameXYZ"
//   );
//   await expect(page.getByLabel("row-5")).toContainText("3759");
//   //search first csv
//   await page.getByLabel("Command Prompt").fill("search Sol");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0").nth(1)).toContainText("Sol");

//   //load second csv
//   await page
//     .getByLabel("Command Prompt")
//     .fill("load data/census/no_headers_dol_ri_earnings_disparity.csv no");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(
//     page.getByText(
//       "Result: success Filepath: data/census/no_headers_dol_ri_earnings_disparity.csv Headers: no"
//     )
//   ).toBeVisible();
//   //view second csv
//   await page.getByLabel("Command Prompt").fill("view");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   await expect(page.getByLabel("row-0").nth(2)).toContainText(
//     'RIWhite" $1,058.47 "$1. $1.00 75%'
//   );

//   //search second csv
//   await page.getByLabel("Command Prompt").fill("search Black");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-1").nth(1)).toContainText(
//     "RIBlack $770.26 30424.80376 $0.73 6%"
//   );
// });

// // /////////////////////////// BROADBAND TESTING ///////////////////////////

// test("Broadband Successful Output", async ({ page }) => {
//   //load an empty csv
//   await page.getByLabel("Command Prompt").fill("broadband florida lee");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByLabel("row-0")).toContainText(
//     "NamePercentageStateCountyTime"
//   );
//   await expect(page.getByLabel("row-1")).toContainText(
//     "Lee County, Florida88.412"
//   );
// });

// test("Broadband no input", async ({ page }) => {
//   //load an empty csv
//   await page.getByLabel("Command Prompt").fill("broadband");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText("State and/or county was not specified.")
//   ).toBeVisible();
// });

// test("Broadband no County input", async ({ page }) => {
//   //load an empty csv
//   await page.getByLabel("Command Prompt").fill("broadband florida");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(
//     page.getByText("State and/or county was not specified.")
//   ).toBeVisible();
// });

// test("Broadband bad input", async ({ page }) => {
//   //load an empty csv
//   await page.getByLabel("Command Prompt").fill("broadband flowrida leet");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   await expect(page.getByText("Input is invalid.")).toBeVisible();
// });

