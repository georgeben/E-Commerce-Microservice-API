const cmd = require('node-cmd');

before('SETUP [DATABASE]', (done) => {
  console.log('RUNNING MIGRATIONS [TEST] UP');
  cmd.get('npm run migrate-test:up', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
    console.log('MIGRATION COMPLETE : UP');
    done();
  });
});
