#! /usr/bin/env node
'use strict';

const program = require('commander');
const exec = require('child_process').exec;
const __version__ = require('../package.json').version;

program
  .version(__version__);

program
  .command('undo [files]', 'Undo changes made to file or currently working directory')
  .option('-a, --all', 'Undo all changes made to currently working directory') 
  .action(function(files) {
    // git stash; git resest --hard HEAD
    console.log(program.all);
    if (program.all) {
      console.log('before exec');
      /*
      exec('git stash', function(error, stdout, stderr) {
        if (error) console.log('test: ', error);
      });
      */
    } else {
      console.log(files);
      exec('git checkout');
    }
  });

program
  .command('stage [files]', 'Add or remove a file from staging')
  .action(function(files) {
  });

program
  .command('back', 'Go back one commit in the revision history')
  .action(function() {
  });

program
  .command('forward', 'Go forward one commit in the revision history')
  .action(function() {
  });

program
  .command('latest', 'Go to the most recent commit in the revision history')
  .action(function() {
  });

program
  .command('rename <name>', 'Rename the current branch')
  .action(function(name) {
    // git branch -m oldname newname
  });

program
  .command('switch <branch>', 'Switch to a branch')
  .action(function(branch) {
  });

program
  .command('oops no-git <file>', 'Remove a file from git without removing it from the filesystem')
  .action(function(file) {
    // git reset filename ; echo filename >> .gitignore
  });

program
  .command('oops commit-to <branch>', 'Fix accidental commit to wrong branch')
  .action(function() {
    // git reset HEAD~ --soft
    // git stash
    // # move to the correct branch
    // git checkout name-of-the-correct-branch
    // git stash pop
    // git add . # or add individual files
    // git commit -m "your message here"
  });

program
  .command('oops missed <file>', 'Fix missing to stage a file to a commit')
  .action(function() {
  });

program
  .command('oops undo', 'Undo the last commit')
  .action(function() {
  });

program
  .command('oops fuck-it', 'Delete and re-clone the repository')
  .action(function() {
  });


program.parse(process.argv);
