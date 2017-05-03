#! /usr/bin/env node
'use strict';

const program = require('commander');
const exec = require('child_process').exec;
const fs = require('fs');
const __version__ = require('../package.json').version;

program
  .version(__version__)
  .usage('<command> [<files>]')

program
  .command('no-git')
  .description('Remove a file from git without removing it from the filesystem')
  .arguments('<files...>')
  .action(function(files) {
    files.map(function(file) {
      exec('git reset ' + __dirname + file, function(error, stdout, stderr) {
        if (error) console.log(error);
        if (stderr) console.log(stderr);
        // find the location of the .git folder, strip away the directory
        // and add the file path to .gitignore
      });
    });
  });

program
  .command('missed')
  .description('Stage a file or files under the most recent commit')
  .arguments('<files...>')
  .action(function(files) {
    files.map(function(file) {
      exec('git add ' + file, function(error, stdout, stderr) {
        if (error) console.log(error);
        if (stderr) console.log(stderr);
      });
    });
    exec('git commit --amend -C HEAD', function(error, stdout, stderr) {
      if (error) console.log(error);
      if (stderr) console.log(stderr);
    });
  });

program
  .command('undo')
  .description('Undo the last commit')
  .action(function() {
    exec('giddy reset HEAD~1', function(error, stdout, stderr) {
      if (error) console.log(error);
      if (stderr) console.log(stderr);
    });
  });

program.parse(process.argv);

// Output the usage information, if giddy-oops is invoked without providing a command
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
