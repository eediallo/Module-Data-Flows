const { argv } = require("node:process");
// =================
// Stripped down cowsayer CLI,
// no libraries
// https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line
// =================

//require at least one additional argument
if (argv.length === 2) {
  console.log("Should accept at least one argument");
  process.exit(1);
}

let topLine = "_";
let bottomLine = "-";
let saying = argv[2];

const cow = `
        \\\   ^__^
         \\\  (oo)\\\_______
            (__)\\\       )\\/\\
                ||----w |
                ||     ||
`;

// write top/bottom line based on provided CI argument
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

cowsay(saying);
console.log(cow);
