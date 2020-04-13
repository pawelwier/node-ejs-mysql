const express = require('express');
const app = express();
const path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

app.listen(port, (req, res) => {
    console.log('Working');
})

var indexRouter = require('./routes/index');
app.use('/', indexRouter);