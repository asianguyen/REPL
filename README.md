# Project Details

## REPL

#### Team Members:

Asia Nguyen (atnguyen)
Sophia Lim (szlim)
Repo: https://github.com/cs0320-s24/repl-atnguyen-szlim.git

#### Total time spent:

30 hours

# Design Choices

## Overall Structure

First, index.tsx Generates a root element containing the main element App.tsx.

#### App.tsx

Contains a header and LoginButton.tsx, which when clicked also contains a REPL.tsx.

#### LoginButton.tsx

Modifies the logged in boolean when clicked.

#### AuthRoute.tsx

Implements google authentication through firebase.

#### LoginLogout.tsx

Handles logging in and signing out.

#### REPL.tsx

Builds the repl including a REPLHistory.tsx and REPLInput.tsx.

##### REPLHistory.tsx

A scrollable box that displays the command history.

##### REPLInput.tsx

A command line interface that uses a ControlledInput.

###### ControlledInput.tsx

A modified input box for the repl.

## Interfacing and Functions

##### REPLFunction.tsx

An interface for functions that can be called by the REPL and returns a Promise.

##### MockedREPLFunction.tsx

An interface for mocked functions that can be called by the REPL and returns a string or string[][].

##### Functions.tsx

A function class that returns a map of the default functions.

##### MockedFunctions.tsx

A class that includes the mocked functions from Sprint 3, so we can test with mocked data. It will retrieve data from
mocked CSV files included in the MockedData folder, so it does not rely on the Server to get data.

## Data Structures Used

##### Map<string, REPLFunction>

The Map of strings to REPLFunctions allows a more generalized calling of the different
functions. This is leveraged in REPLInput to enable adding and removing of functions as
desired by the developer.

# Errors/Bugs
- Cant search for a value with spaces
- Cant run all tests at once using npm test.

# Tests
### e2d Tests
##### General
- Once logged in, I see the full repl page.
- After I type into the input box, its text changes.
- After I click the button, my command gets pushed.
- I can use enter to submit.

##### Mode Switch
- Mode switch using keys.
- Switch to brief mode with no history.
- Switch to verbose mode with no history.
- Mode of the history is changed as well.

### CSV Functionality
##### Load
- Load basic CSV file.
- Load basic CSV file in verbose.
- Load CSV file that doesn't exist.
- Load CSV file that exists but outside protected directory.
- Load with no file provided.
- Load invalid headers.
- Load given extra arguments
- Load no header arg.

##### View
- View normal CSV.
- View normal CSV using keys.
- Load and view empty CSV.
- Load view load view diff files.
- View with no CSV loaded.

##### Search
- Search by column name.
- Search with no col identifier.
- Search returns multiple rows
- Search by colmn id.
- Search with negative column.
- Search with out of range column.
- Search with no CSV loaded.
- Search with no results.
- Search with no value.
- Load malformed CSV then search it.
- Load view search twice.

##### Broadband
- Broadband Successful Output
- Broadband no input
- Broadband no County input
- Broadband bad input

##### Mocked
- Load basic CSV file
- Load View basic CSV file
- Load with no file provided
- Load view load view
- Load malformed CSV then search it
- Load and view empty CSV
- View normal CSV
- View with no CSV loaded
- Search by column name
- Search by column id
- Search with no results
- Search with no value
- Load search view twice



# How to
### To Run Page
To run the page, navigate to the "client" directory, using "cd client" in the terminal window.

Make sure the server is running on the backend by doing mvn package and ./run

Then run the command "npm start" and navigate to the link provided in the terminal response.

##### How to Use REPL

First click the button to log in and choose the @brown.edu email you wish to log in with.

Then, you can use the input box and the submit button on the bottom of the page or enter key to execute
the following commands.

`mode verbose` -- can use crtl + m
- Switches the history style to display the command as well as the output.

`mode brief` -- can use crtl + m
- Switches the history style to display just the outputs.

`load <csv-file-path> <hasHeaders>`
- Will attempt to load the given csv, which must be in a protected directory beginning with data/. HasHeaders is an optional argument

`search <value> <column>`
- Will attempt to search a csv, if there is one, for any rows with the <value> in the 
specified <column> which can either be an index or header name. Column is an optional argument

`view` -- can use crtl + v
- Will attempt to view the loaded csv, if there is one.

`broadband <state> <county>`
- Will fetch the broadband data from our census API for the specific state and county and include the time the request was sent

Click Sign Out/enter crtl + s when done.

### To Run Tests
Navigate into the client directory.
Have the server running in the background by opening other terminal and using the commands "mvn package" and "./run".

Ensure all the tests are commented out except for the test you want to run in the e2e folder. Then run 'npm test'. It wont work otherwise.

### To Import Alternative Functions as a Developer
As a developer that implements the REPL, you will be able to register commands with the addFunction() command as well as
get the map of commands with getFuncs(). The functions are added outside of REPL and passed into REPL through the props. 
The map of commands is initially empty until the developer adds the commands to the map via the function calls.


# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_

For handling key input: https://www.caktusgroup.com/blog/2020/07/01/usekeypress-hook-react/
past partner on Mock: jdhanda
