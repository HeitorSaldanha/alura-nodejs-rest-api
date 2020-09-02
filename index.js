const express = require('express');
const app = express();

app.listen(3000, () => console.log('Hello World 3000'));

app.get('/', (req, res) => res.send('Servidor rodando tudo top'))