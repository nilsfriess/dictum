let express = require('express')
let app = express()

let mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlroot',
    database: 'word_list'
})

connection.connect((err) => {
    if (err)
        console.log(err)
})

//const words = require('./words')

// Add headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
})

wordIsValid = (word, cb) => {
    connection.query('SELECT * FROM words WHERE word="' + word + '";', (err, res, fields) => {
        if (res[0])
            cb(true)
        else
            cb(false)
    })
}

app.get('/word/:word', (req, res, next) => {
    wordIsValid(req.params.word, (isValid) => {
        res.json({
            word: req.params.word,
            isValid
        })

        next()
    })
})

app.listen(3200, () => {
    console.log('app listening')
})