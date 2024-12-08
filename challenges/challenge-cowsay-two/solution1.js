const { argv } = require("node:process");
// =================
// Stripped down cowsayer CLI,
// no libraries
// https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line
// =================

// 1. Accept arguments

// how will you accept arguments?

//require at least one additional argument
if (argv.length === 2) {
  console.log("Should accept at least one argument");
  process.exit(1);
}

// 2. Make supplies for our speech bubble

let topLine = "_";
let bottomLine = "-";
let saying = "";

// 3. Make a cow that takes a string
const cow = `
        \\\   ^__^
         \\\  (oo)\\\_______
            (__)\\\       )\\/\\
                ||----w |
                ||     ||
`;

function writeLine(line, saying) {
  process.stdout.write(" ");
  for (let i = 0; i <= saying.length + 1; i++) {
    process.stdout.write(line);
  }
}

function cowsay(saying) {
  // how will you make the speech bubble contain the text?
  // where will the cow picture go?
  // how will you account for the parameter being empty?
}

//4. Pipe argument into cowsay function and return a cow

// how will you log this to the console?
