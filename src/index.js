#! /usr/bin/env node
'use strict';

const program = require('commander');
const exec = require('child_process').exec;
const fs = require('fs');
const __version__ = require('../package.json').version;

program
  .version(__version__);

program
  .command('undo')
  .description('Undo changes to uncommitted files or everything in the directory')
  .arguments('[files...]')
  .option('-a, --all', 'Undo all changes made to currently working directory') 
  .action(function(files, options) {
    if (options.all) {
      return exec('git stash && git reset --hard HEAD', function(error, stdout, stderr) {
        if (error) console.log(error);
        if (stderr) console.log(stderr);
        console.log('Your current working directory has been reset to HEAD!');
      });
    }

    const checkout = typeof files === 'string' ? files : files.join(" ");
    return exec('git checkout ' + checkout, function(error, stdout, stderr) {
      if (error) console.log(error);
      if (stderr) console.log(stderr);
      console.log(checkout, 'have been reset to head!');
    });
  });

program
  .command('stage')
  .description('Stage a deleted or modified file')
  .arguments('<files...>')
  .action(function(files) {
    files.map(function(file) {
      if (fs.existsSync(__dirname + file)) {
        exec('git add ' + file, function(error, stdout, stderr) {
          if (error) console.log(error);
          if (stderr) console.log(std.err);
        });
      } else {
        exec('git rm ' + file, function(error, stdout, stderr) {
          if (error) console.log(error);
          if (stderr) console.log(std.err);
        });
      }
    });
    console.log('Aww yeah!', files, 'have been staged!');
  });

program
  .command('back')
  .description('Go back one commit in the revision history')
  .action(function() {
    exec('git checkout HEAD~', function(error, stdout, stderr) {
      if (error) console.log(error);
      if (stderr) console.log(stderr);
    });
  });

program
  .command('forward')
  .description('Go forward one commit in the revision history')
  .action(function() {
    const get_hash = "git rev-list --topo-order HEAD..master | tail -1";
    const checkout = "xargs git checkout";
    exec(get_hash + ' | ' + checkout, function(error, stdout, stderr) {
      if (error) console.log(error);
      if (stderr) console.log(stderr);
    });
  });

program
  .command('latest')
  .description('Go to the latest commit in the revision history')
  .action(function() {
    exec('git checkout master', function(error, stdout, stderr) {
      if (error) console.log(error);
      if (stderr) console.log(stderr);
    });
  });

program.parse(process.argv);
