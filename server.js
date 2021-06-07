const express = require('express');
const compression = require('compression');
const path = require('path');
const { dirname } = require('path');
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(_ - dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
