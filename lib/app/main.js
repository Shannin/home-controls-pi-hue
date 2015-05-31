var config = {
    "hueHostname": "192.168.226.116",
    "hueUsername": "homecontrols",
}

var express = require('express');
var hueApi = require("node-hue-api"),
    hueApiLightState = hueApi.lightState.create();
var app = express();
var hue = new hueApi.HueApi(config.hueHostname, config.hueUsername);

app.get('/lights/scenes/', function (req, res) {
    hue.scenes(function(err, result){
        if (err) {
            res.send({"error": "idk"});
            return;
        }

        console.log(result)
        
        res.send(result);
    });
});

app.get('/lights/all/on', function (req, res) {
    hue.setGroupLightState(0, hueApiLightState.on())
    res.send({'status':'on'});
});

app.get('/lights/all/off', function (req, res) {
    hue.setGroupLightState(0, hueApiLightState.off())
    res.send({'status':'off'});
});

app.get('/lights/all/:scene', function (req, res) {
    hue.activateScene(req.params.scene, function(err, result) {
        if (err) {
            res.send({'status':false, 'error': 'Something went wrong...'});
            throw err;  
        }

        res.send({'status':'on'});
    });
});

app.get('/heartbeat', function (req, res) {
    res.send('alive');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Hue Controller running at http://%s:%s', host, port);
});