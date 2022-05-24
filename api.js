const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var frase = "a b c";

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/frase', (req, res) => {
    res.json({
        'frase': frase
    })
})

/* This is a route that will be called when the user makes a GET request to the URL
`/api/palabra/:pos`. The `:pos` part is a parameter that will be passed to the function. */
app.get('/api/palabra/:pos', (req, res) => {
    const position = req.params.pos - 1;
    const splittedFrase = frase.split(' ');

    if (!splittedFrase[position]) {
        res.status(404);
        res.send('Posición en frase no encontrada');
    }

    res.send(splittedFrase[position]);
})


app.post('/api/palabras/', (req, res) => {
    const post = req.body;
    frase = `${frase} ${post.palabra}`;
    res.json({
        'agregada': post.palabra,
        'pos': frase.split(' ').indexOf(post.palabra) + 1
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})