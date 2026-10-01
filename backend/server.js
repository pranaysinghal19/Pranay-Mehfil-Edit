const { createApp } = require('./src/app');
const { config } = require('./src/config');

const app = createApp();

app.listen(config.port, () => {
  console.log('Mehfil backend listening on port ' + config.port);
});
