// Require readline for input from the console
const readline = require('readline');

// Require AWS IoT Device SDK
const awsIoT = require('aws-iot-device-sdk');

// Load the endpoint from file
const endpointFile = require('/home/ec2-user/environment/endpoint.json');

// Fetch the deviceName from the current folder name
const deviceName = __dirname.split('/').pop();

// Build constants
const keyPath = 'private.pem.key';
const certPath = 'certificate.pem.crt';
const caPath = '/home/ec2-user/environment/root-CA.crt';
const clientId = deviceName;
const host = endpointFile.endpointAddress;

// publish topic name
var pubTopic = '';
const scalable = 'body3/';
const sinkTopic = scalable + 'sink/';

// Use the awsIoT library to create device object using the constants created before
const device = awsIoT.device({
   keyPath: keyPath,
  certPath: certPath,
    caPath: caPath,
  clientId: clientId,
      host: host
});

// Interface for console input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to publish payload to IoT topic
function publishToSensorTopic(topic, payload) {
    // Publish to specified IoT topic using device object that you created
    device.publish(topic, payload);
}

device.on('connect', function() {
    console.log('Connected to AWS IoT as Sink!');
    device.subscribe(sinkTopic);
});

device.on('message', function(topic, message) {
    var jMessage = JSON.parse(message);

    var device = jMessage['device'];
    var deviceBattery = jMessage['battery'];
    var deviceX = jMessage['x'];
    var deviceY = jMessage['y'];
    var deviceDateTime = jMessage['datetime'];

    let msg = {
        //'sendMail'= true;
    };

    var sendMail = false;
    console.log('Message Recevied from ' + device);
    
    if(device == 'body3TempSensor') {
        var temperature = jMessage['temperature'];
        if(temperature > 100) {
            msg['metric'] = 'temperature';
            msg['metricValue'] = temperature.toString();
            msg['device'] = device;
            sendMail = true;
        }
    } else if(device == 'body3PacemakerSensor') {
        var heartbeat = jMessage['heartbeat'];
        if(heartbeat > 70) {
            msg['metric'] = 'heartbeat';
            msg['metricValue'] = heartbeat.toString();
            msg['device'] = device;
            sendMail = true;
        }
    } else if(device == 'body3GlucoseSensor') {
        var body3GlucoseSensor = jMessage['body3GlucoseSensor'];
        if(body3GlucoseSensor >4 ) {
            msg['metric'] = 'body3GlucoseSensor';
            msg['metricValue'] = body3GlucoseSensor.toString();
            msg['device'] = device;
            msg['person'] = 'G';
            sendMail = true;
        }
    } else if(device == 'body3PulseOximeterSensor') {
        var pulseOximeter = jMessage['PulseOximeter'];
    }
    else if(device == 'body3Edge12') {
        var body3Edge1 = jMessage['body3Edge1'];
        if(body3Edge1 >96 ) {
            msg['metric'] = 'body3Edge1';
            msg['metricValue'] = body3Edge1.toString();
            msg['device'] = device;
            msg['person'] = 'G';
            sendMail = true;
        }
    }

    if(deviceBattery <= 25.0) {
        publishToSensorTopic(sinkTopic + device, 'true');
    } else if(deviceBattery >= 100.0) {
        publishToSensorTopic(sinkTopic + device, 'false');
    }

    if(sendMail) {
        //console.log('sending email!!!!');
        publishToSensorTopic(scalable + 'email', JSON.stringify(msg));
    }
    console.log('Message: ' + message);
});
