module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('GET Atendimentos'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body);
        res.send('POST Atendimentos')
    })}