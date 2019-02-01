let path = require('path');
let express = require('express');

var PORT = 9000;
if(process.argv.indexOf("--port") >= 0){
    PORT = process.argv[process.argv.indexOf("--port") + 1];
}

var app = express();


//static folder for images and other data
app.use(express.static('assets/public'));


//public session and routing
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/assets/public/public.html'));
});

app.listen(Number(PORT), '0.0.0.0', function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Listening at port', PORT);
});
