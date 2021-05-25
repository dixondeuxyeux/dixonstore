const express = require('express');
const compression = require('compression'),
const path = require('path'), 
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

// app
const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTION ERR', err));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '4mb' }));
app.use(cors());

// app.get('/api', (req, res) => {
//   res.json({
//     data: 'hey you hit a wall',
//   });
// });

// routes middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

// port

const Port = process.env.PORT || 3000;

app.listen(Port, () => console.log(`Server is running on port ${Port}`));
