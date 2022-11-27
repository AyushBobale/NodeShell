import fs from "fs";
import { exec, spawn } from "child_process";
import { stderr, stdout } from "process";

let currForeGroundProcess = 0;

function outData(output) {
  process.stdout.write(
    `${output} \n\x1b[40m\x1b[36m${process.cwd()} \x1b[32mCustomShell> \x1b[0m`
  );
}

function parseCommand(inputs) {
  const args = inputs.split(" ");
  const command = args[0];

  switch (command) {
    case "exit":
      commands.exit();
      break;

    case "cd":
      commands.cd(args.slice(1));
      break;

    case "pwd":
      commands.pwd();
      break;

    case "ls":
      commands.ls(args.slice(1).join(" "));
      break;

    case "fg":
      commands.fg(args.slice(1));
      break;

    default:
      if (command.length === 0) {
        process.stdout.write(
          `\x1b[40m\x1b[36m${process.cwd()} \x1b[32mCustomShell> \x1b[0m`
        );
      } else {
        commands.runBin(command, args.slice(1));
      }
  }
}

const commands = {
  exit: function () {
    process.exit(1);
  },

  cd: function (path) {
    try {
      process.chdir(path[0]);
      outData("Directory changed");
    } catch (err) {
      outData(err.msg);
    }
  },

  pwd: function () {
    outData(process.cwd());
  },

  ls: function (folderPath) {
    if (folderPath.length === 0) {
      folderPath = process.cwd();
    }
    fs.readdir(folderPath, (err, files) => {
      if (err) outData(err.message);
      else {
        files.forEach((file) => {
          process.stdout.write(`${file}\n`);
        });
        outData("");
      }
    });
  },

  fg: function (pid) {
    console.log("fg function", pid[0]);
    try {
      process.kill(pid[0], "SIGCONT");
    } catch (err) {
      console.log(err);
    }
    outData("");
  },

  runBin: function (command, args) {
    try {
      const childProcess = spawn(command, args);
      if (childProcess.pid === undefined) {
        console.log("No such executables found");
      }
      console.log(`PID of spawned process : ${childProcess.pid}`);
      if (childProcess) {
        currForeGroundProcess = childProcess.pid;
        console.log(currForeGroundProcess);
      }
      childProcess.stdout.on("data", (data) => {
        console.log(`PID - ${childProcess.pid} : ${data.toString()}`);
      });
      childProcess.stderr.on("data", (data) => {
        console.log(`PID - ${childProcess.pid} : ${data.toString()}`);
      });
      childProcess.on("error", (error) => {
        console.log(error.message);
      });
      childProcess.on("exit", (code, signal) => {
        if (code)
          console.log(
            `\n${childProcess.pid} - Process stopped with code : ${code}`
          );
        outData("");
        if (signal)
          console.log(
            `\n${childProcess.pid} - Process stopped with signal : ${signal}`
          );
        outData("");
      });
    } catch (err) {
      console.log(err);
    }
  },
};

process.stdout.write(
  `\x1b[40m\x1b[36m${process.cwd()} \x1b[32mCustomShell> \x1b[0m`
);

process.stdin.on("data", (args) => {
  args = args.toString().trim();
  parseCommand(args);
});

process.on("SIGINT", function () {
  console.log("\nKilling child process");
  outData("");
});

process.on("SIGTSTP", function () {
  console.log("\n Putting child process to background");
  outData("");
});
