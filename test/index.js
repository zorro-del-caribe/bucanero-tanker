const test = require('tape');
const bucanero = require('bucanero');
const supertest = require('supertest');
const path = require('path');

test('add routes', t=> {

  const app = bucanero({
    plugins: [path.join(__dirname, '../index')],
    handlersRoot: './test/handlers',
    pluginsRoot: './test/plugins'
  });

  app.use(function * () {
    this.body = {foo: this.app.context.sh.foo};
  });

  app.start()
    .then(function () {
      supertest(app.server)
        .get('/')
        .expect(200)
        .end(function (err, result) {
          t.error(err);
          t.equal(result.body.foo, 'bar');
          app.stop();
          t.end();
        });
    })
    .catch(err => console.log(err));
});