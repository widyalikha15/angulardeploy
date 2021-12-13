function requireHTTPS(req, res, next) {
    if (!req.secure && req.get('x-forwarded-proto') !=='https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();

app.use(requireHTTPS); //juka di deploy di heroku di uncomment
app.use(express.static('./dist/testdeploy'));//line 20 angular.json

app.get('/*', (req, res) =>
res.sendFile('index.html', {root: 'dist/testdeploy/'}),
);

const port = process.env.PORT || 8000
app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})