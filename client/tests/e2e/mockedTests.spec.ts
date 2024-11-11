import { expect, test } from "@playwright/test";

// test.beforeEach(async ({ page }) => {
//   await page.goto("http://localhost:8000/");
// });

// test("Mock -> Load basic CSV file.", async ({ page }) => {
//   //load basic csv
//   await page.getByLabel("Command Prompt").fill("loadMock partners.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file partners.csv was loaded! ");
// });

// test("Mock -> Load View basic CSV file.", async ({ page }) => {
//   //load basic csv
//   await page.getByLabel("Command Prompt").fill("loadMock partners.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file partners.csv was loaded! ");

//   //view basic csv
//   await page.getByLabel("Command Prompt").fill("viewMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });

//   expect(secondChild).toEqual(" JulianYellowMonkeyBananasAsiaPinkCatNerds ");
// });

// test("Mock -> Load with no file provided.", async ({ page }) => {
//   //load with no file
//   await page.getByLabel("Command Prompt").fill("loadMock ");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" Invalid file. ");
// });

// test("Mock -> Load view load view.", async ({ page }) => {
//   //load first csv
//   await page.getByLabel("Command Prompt").fill("loadMock partners.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file partners.csv was loaded! ");
//   //view first csv
//   await page.getByLabel("Command Prompt").fill("viewMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   expect(secondChild).toEqual(" JulianYellowMonkeyBananasAsiaPinkCatNerds ");

//   //load second csv
//   await page.getByLabel("Command Prompt").fill("loadMock children.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const thirdChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[2]?.textContent;
//   });
//   expect(thirdChild).toEqual(" The file children.csv was loaded! ");
//   //view second csv
//   await page.getByLabel("Command Prompt").fill("viewMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const fourthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[3]?.textContent;
//   });
//   expect(fourthChild).toEqual(" 0123kirbyqorbqorvettetoothy ");
// });

// test("Mock -> Load malformed CSV then search it.", async ({ page }) => {
//   //load malformed csv
//   await page.getByLabel("Command Prompt").fill("loadMock malformed.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file malformed.csv was loaded! ");

//   //try and search a value
//   await page.getByLabel("Command Prompt").fill("searchMock value");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   //error message
//   expect(secondChild).toEqual(" Unable to search due to malformed rows. ");
// });

// test("Mock -> Load and view empty CSV.", async ({ page }) => {
//   //load an empty csv
//   await page.getByLabel("Command Prompt").fill("loadMock empty.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file empty.csv was loaded! ");

//   //view empty csv
//   await page.getByLabel("Command Prompt").fill("viewMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   //nothing in the csv
//   expect(secondChild).toEqual("  ");
// });

// test("Mock -> View normal CSV.", async ({ page }) => {

//   //load normal csv
//   await page.getByLabel("Command Prompt").fill("loadMock children.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file children.csv was loaded! ");

//   //view csv
//   await page.getByLabel("Command Prompt").fill("viewMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   expect(secondChild).toEqual(" 0123kirbyqorbqorvettetoothy ");
// });

// test("V2 -> View with no CSV loaded.", async ({ page }) => {
//   //view without loading first
//   await page.getByLabel("Command Prompt").fill("viewMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" File was not loaded. ");
// });

// test("Mock -> Search by column name.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("loadMock withHeaders.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file withHeaders.csv was loaded! ");

//   //search by header name
//   await page.getByLabel("Command Prompt").fill("searchMock Asia Name");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   expect(secondChild).toEqual(" Asia20studentshe/her ");
// });

// test("Mock -> Search by column id.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("loadMock withHeaders.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file withHeaders.csv was loaded! ");

//   //search by index
//   await page.getByLabel("Command Prompt").fill("searchMock Asia 0");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   expect(secondChild).toEqual(" Asia20studentshe/her ");
// });

// test("Mock -> Search with no results.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("loadMock partners.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });

//   expect(firstChild).toEqual(" The file partners.csv was loaded! ");

//   //search with a value not in the CSV
//   await page.getByLabel("Command Prompt").fill("searchMock unfoundValue");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   expect(secondChild).toEqual(" Could not find specified value. ");
// });

// test("Mock -> Search with no value.", async ({ page }) => {
//   await page.getByLabel("Command Prompt").fill("loadMock partners.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();

//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });

//   expect(firstChild).toEqual(" The file partners.csv was loaded! ");

//   //search with no value specified
//   await page.getByLabel("Command Prompt").fill("searchMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   expect(secondChild).toEqual(" Value was not specified. ");
// });

// test("Mock load search view twice.", async ({ page }) => {

//   //load first csv
//   await page.getByLabel("Command Prompt").fill("loadMock withHeaders.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual(" The file withHeaders.csv was loaded! ");

//   //view first csv
//   await page.getByLabel("Command Prompt").fill("viewMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const secondChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[1]?.textContent;
//   });
//   expect(secondChild).toEqual(
//     " NameAgeOccupationPronounsAsia20studentshe/herJulian19studenthe/him "
//   );

//   //search first csv
//   await page.getByLabel("Command Prompt").fill("searchMock Asia 1");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const thirdChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[2]?.textContent;
//   });
//   expect(thirdChild).toEqual(" Asia20studentshe/her ");

//   //load second csv
//   await page.getByLabel("Command Prompt").fill("loadMock children.csv");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const fourthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[3]?.textContent;
//   });
//   expect(fourthChild).toEqual(" The file children.csv was loaded! ");

//   //view second csv
//   await page.getByLabel("Command Prompt").fill("viewMock");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const fifthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[4]?.textContent;
//   });
//   expect(fifthChild).toEqual(" 0123kirbyqorbqorvettetoothy ");

//   //search second csv
//   await page.getByLabel("Command Prompt").fill("searchMock unfoundValue");
//   await page.getByRole("button", { name: "Submit Command!" }).click();
//   const sixthChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[5]?.textContent;
//   });
//   expect(sixthChild).toEqual(" Could not find specified value. ");
// });
