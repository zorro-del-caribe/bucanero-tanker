const shLoader = require('ship-hold-extension-loader');
const shiphold = require('ship-hold');

module.exports = {
  priority: 300,
  init: function (app) {
    const dbConf = app.context.conf.value('db');
    const sh = shiphold(dbConf);
    const extConf = dbConf.extensions || {};

    shLoader(sh, extConf);

    for (const model of sh.models()) {
      app.context[model] = sh.model(model)
    }

    app.context.sh = sh;

    return app;
  },
  stop: function (app) {
    return app.context.sh.stop();
  }
};