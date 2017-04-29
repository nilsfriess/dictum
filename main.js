let express = require('express')
let app = express()

const words = require('./words')

// Add headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.get('/api/:word', (req, res, next) => {
    console.log(req.params.word)

    let wordIsValid = words.words.indexOf(req.params.word) !== -1

    res.json({
        word: req.params.word,
        isValid: wordIsValid
    })

    next()

})

app.listen(15123, () => {
    console.log('app listening')
})
