const { symlink } = require("node:fs");
const { argv } = require("node:process");

// print the additional args

// =================
// Stripped down cowsayer CLI,
// no libraries
// https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line
// =================

// 1. Accept arguments

// how will you accept arguments?
if (argv.length === 2) {
  console.log("Should accept a least one argument");
  process.exit(1);
}

// 2. Make supplies for our speech bubble

let topLine = "_";
let bottomLine = "-";
let saying = argv[2];
const cow = `
        \\\   ^__^
         \\\  (oo)\\\_______
            (__)\\\       )\\/\\
                ||----w |
                ||     ||
`
// 3. Make a cow that takes a string

function writeLine(line, saying){
  process.stdout.write(' ')
  for(let i = 0; i <= saying.length + 1; i++){
    process.stdout.write(line)
  }
}

function cowsay(saying) {
  writeLine(topLine, saying)
  console.log()
  process.stdout.write(`< ${saying} >`) 
  console.log()
  writeLine(bottomLine, saying)
}

cowsay(saying)
console.log(cow)


//4. Pipe argument into cowsay function and return a cow

// how will you log this to the console?
