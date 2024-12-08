const readline = require("node:readline");
const process = require("node:process");

// =================
// Stripped down cowsayer CLI,
// no libraries or arguments
// https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs
// =================

// 1. Make  a command line interface.
const rl = readline.createInterface(process.stdin, process.stdout);

// 2. Make supplies for our speech bubble
let topLine = "";
let bottomLine = "";
let saying = "";

rl.question("Please Enter the top Line: ", (top) => {
  rl.question("Please Enter the bottom line: ", (bottom) => {
    rl.question("Please Enter cow saying: ", (say) => {
      topLine += top;
      bottomLine += bottom;
      saying += say;
      cowsay(saying)
      console.log()
      rl.close();
    });
  });
});

// 3. Make a cow that takes a string

function writeLine(line, saying) {
  process.stdout.write(" ");
  for (let i = 0; i <= saying.length + 1; i++) {
    process.stdout.write(line);
  }
}

function cowsay(saying) {
  writeLine(topLine, saying);
  console.log();
  process.stdout.write(`< ${saying} >`);
  console.log();
  writeLine(bottomLine, saying);
}

// 4. Use readline to get a string from the terminal
// (with a prompt so it's clearer what we want)
