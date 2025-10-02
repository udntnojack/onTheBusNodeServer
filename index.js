const express = require('express');

const app = express();

const router = require('./routes/onTheBusRoutes');
app.use('/', router); 

app.listen(3000, () => {
console.log('Server started on port 3000. Ctrl^c to quit.');
});