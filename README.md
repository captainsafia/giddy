# giddy

giddy is a command line tool designed to help you manage your git workflow.
It addresses some of the gaps that I've found in git's user experience and
provides some helpful aliases for dealing with common git pitfalls. If you've
experienced any pitfalls or user experience hiccups with git that you think
should be addressed in giddy, please submit an issue.

If you think giddy is totally rad, you should 
[give Safia some money](https://www.paypal.me/captainsafia).

## Installation

```
npm install --global giddy
```

## Usage

### Stage and Undo
The `git add` and `git rm` commands can be a little opaque to new git users. In
order to more transparently communicate what they do, `giddy stage <file>` runs
either `git rm <file>` or `git add <file>` for a given file depending on whether
or not it has been removed from the project. 

`giddy undo <files>` undoes unstaged changes to a file by checking out the
version of the file associated with the most recent commit. `git undo --all`
undoes unstaged changes to all files in the project.

### Revision History Traversal
Sometimes it's helpful to browse through changes in a project commit
by commit. giddy provides a few simple commands for traversing the
revision history for a particular project.

`giddy back` goes backwards one command in the revision history. For example,
in order to go back three commits into the project, a user can input the following
commands.

```
$ giddy back
$ giddy back
$ giddy back
```

`giddy forward` goes forward one commit in the revision history until the user
has hit the most recent commit for a project. For example, to navigate back
two commits and forward one, a use can input the following commands.

```
$ giddy back
$ giddy back
$ giddy forward
```

These actions will happen in detached HEAD mode.

`giddy latest` takes the user to the most recent commit in the revision
history regardless of where they are.

### giddy-oops
The giddy-oops command is designed to provide shortcuts to handle common git pitfalls
like accidently committing a sensitive file to the repository, forgetting to stage a
file onto a commit, or undoing the most recent commit.

In order to undo a commit of a sensitive file and remove all references to that file
from the revision history, the user can run the following command.

```
giddy-oops no-git super-secret-file.env
```

In order to stage a file onto an existing commit, you can run the following command.

```
giddy-oops missed i-totally-forgot-to-stage-this.txt
```

Happy gittin'!
