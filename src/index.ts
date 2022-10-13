import express from 'express';

const app = express();

app.get('/test', (req, res) => {
    console.log('hit');
});

app.listen(8080);