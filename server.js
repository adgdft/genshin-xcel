const express = require('express');

const app = express();

app.use(express.static('./dist/master-outfits-fe'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/master-outfits-fe/'}),
);

app.listen(process.env.PORT || 8080);