List or remove local tracked branches, which are deleted from the remote.

## Why?

Because I'm tired of doing every time `git fetch -p`, `git branch -r`, `git branch` and keep comparing which branches are gone from the GitHub, but still available locally and doing `git branch -D ${branch_name}` on one by one of them.

## What does it do

This command will compare your local branches with remote and show you branches that are no longer available on remote but are still presented in your local repository. You can use it to view and delete all (remotely) removed branches in one go using `--prune` flag.

This command works without the need to run `git fetch -p`, but a working network connection to your remote is required. If no connection can be established with the remote repository, then local information about your remote will be used instead. If your local repository is not in sync with the remote repository, it will warn you about it.

## Installation

### NPM

```bash
$ pnpm dlx grbpf
```

Install the package globally with -g flag so that you can use it directly as a subcommand of git, like this:

```bash
$ git rbpf
```

## Usage

```bash
$ pnpm dlx grbpf
```

This command will look through the branches that are no longer available on the remote and display them.
In case you haven't run `git fetch -p`, it will warn you to do so.

### Different remote

If you have configured remote alias to something different than **'origin'**, you can use `--remote` or `-r` flag to specify the name of the remote. e.g., to specify remote to be `upstream`, you can use:

```bash
$ pnpm dlx grbpf --remote upstream
```
