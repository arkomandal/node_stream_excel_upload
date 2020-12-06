const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use('/', require('./controllers/route'));

app.listen(3000, () => console.log(`Server is listening on port 3000`));