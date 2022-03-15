const express = require('express');
const next = require('next');
const path = require('path');
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use('/image', express.static(path.join(__dirname, 'image'), {
        maxAge: dev ? '0' : '365d'
    }));

    server.use(bodyParser.json());

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Read on http://localhost:${PORT}`)
    });
})