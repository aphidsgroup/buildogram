// Cross-platform unit test runner.
// `node --test tests` fails on Node >= 21 (directory args were replaced by globs), and
// quoted globs are not expanded by Node 20, so list the files explicitly instead.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TEST_DIR = 'tests';

const files = fs
  .readdirSync(TEST_DIR)
  .filter((file) => /\.test\.(c|m)?js$/.test(file))
  .sort()
  .map((file) => path.join(TEST_DIR, file));

if (files.length === 0) {
  console.error(`No test files found in ${TEST_DIR}/`);
  process.exit(1);
}

const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
