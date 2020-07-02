// Require AWS IoT Device SDK
const awsIoT = require('aws-iot-device-sdk');
// Require crypto for random numbers generation
const crypto = require('crypto');

var sensor = require("./sensor.js")
var sink = require("./sink.js")
var params = require("./params.json")

// Load the endpoint from file
const endpointFile = require('/home/ec2-user/environment/endpoint.json');
var simTime = 10000

for (let [key, value] of Object.entries(params)) {
    var iotDevice = awsIoT.device({
       keyPath: './'+key+'/private.pem.key',
      certPath: './'+key+'/certificate.pem.crt',
        caPath: '/home/ec2-user/environment/root-CA.crt',
          host: endpointFile.endpointAddress
    });
    if(key=="sink"){
      sink.start(simTime, "sink", iotDevice)
    }
    else{
      sensor.start(simTime, key, iotDevice)
    }
}
