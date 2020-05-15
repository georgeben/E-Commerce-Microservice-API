const cmd = require('node-cmd');

after('DROP [DATABASE]', (done) => {
  console.log('RUNNING MIGRATIONS [TEST] DOWN');
  cmd.get('npm run migrate-test:down', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
    console.log('MIGRATIONS COMPLETE : DOWN');
    done();
  });
});
