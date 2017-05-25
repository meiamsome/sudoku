'use strict';

const app = require('./app');
const settings = require('./settings');

const PORT = process.env.PORT || settings.listen_on;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
