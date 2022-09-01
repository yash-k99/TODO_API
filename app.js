const express = require('express');
const app = express();
const routes = require('./routes/router');
const DB = require('./db/connect');
const notFound = require('./middleware/notFound');
const error = require('./middleware/errorHandler');

app.use(express.json());


app.use('/api/v1/task',routes);
app.use(notFound);
app.use(error);

const port = process.env.PORT || 3000;
const start = async () => {
    try{
        console.log(await DB.connectDB());
        app.listen(port, console.log(`Server listening on ${port}...`));
    } catch(err) {
        console.log(err.message);
    }
};

start();