var FindStale = require("./lib/find-stale.js");
var utils = require("./lib/utils.js");

var argv = require("minimist")(process.argv, {
  string: "remote",
  alias: { r: "remote" },
  default: {
    remote: "origin",
  },
});

var options = ["remote", "r", "_"];
var hasInvalidParams = Object.keys(argv).some(function (name) {
  return options.indexOf(name) == -1;
});

if (hasInvalidParams) {
  console.info("Usage: grbpf [-r|--remote <remote>]");
} else {
  // check for git repository
  var exec = utils.asyncExec(["git", "rev-parse", "--show-toplevel"]);
  var obj = new FindStale({
    remove: true,
    force: true,
    remote: argv.remote,
  });

  exec(function (err, stdout, stderr) {
    if (err) {
      console.error(err.message);
      return;
    }

    obj.run();
  });
}
