var append_Data=new Array();
var count=0;
var append_Data;

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
const scalable = 'body3Edge1/';
const sinkTopic = scalable + 'sink/';
const scalable1 = 'body3/'
const toSinkTopic = scalable1 + 'sink/';

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
    console.log('Connected to AWS IoT as Edge Node!');
    device.subscribe(sinkTopic);
    
});

device.on('message', function(topic, message) {
    var jMessage = JSON.parse(message);
    append_Data=JSON.stringify(jMessage);
    append_Data.concat(append_Data);
    
    count++;
    console.log(count);
    if(count>5){
        console.log("count is 5!")
        // device.publish(topic, data);
        
        publishToSink(toSinkTopic, append_Data);
        console.log("Crossed publishToSink!")
        append_Data="";
        count=0;
    }

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
    if(device == 'body3BloodPressureSensor') {
        var body3BloodPressureSensor = jMessage['body3BloodPressureSensor'];
        if(body3BloodPressureSensor >96 ) {
            msg['metric'] = 'body3BloodPressureSensor';
            msg['metricValue'] = body3BloodPressureSensor.toString();
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

function publishToSink(topic, payload) {
    device.publish(topic, payload);
}

