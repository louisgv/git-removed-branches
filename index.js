const FindStale = require('./lib/find-stale.js');
const utils = require('./lib/utils.js');

const argv = require('minimist')(process.argv, {
  string: 'remote',
  alias: { r: 'remote' },
  default: {
    remote: 'origin',
  },
});

const options = ['remote', 'r', '_'];
const hasInvalidParams = Object.keys(argv).some(
  (name) => options.indexOf(name) == -1
);

console.log(hasInvalidParams);
(async () => {
  if (hasInvalidParams) {
    console.info('Usage: grbpf [-r|--remote <remote>]');
    return;
  }
  const obj = new FindStale({
    remove: true,
    force: true,
    remote: argv.remote,
  });
  // check for git repository
  try {
    await utils.exec(['git', 'rev-parse', '--show-toplevel']);
    await obj.run();
  } catch (err) {
    if (err.code === 128) {
      process.stderr.write('ERROR: Not a git repository\r\n');
    } else if (err.code === 1984) {
      process.stderr.write(`ERROR: ${err.message} \r\n`);
    } else {
      process.stderr.write(err.stack + '\r\n');
    }
    process.exit(1);
  }
})();
