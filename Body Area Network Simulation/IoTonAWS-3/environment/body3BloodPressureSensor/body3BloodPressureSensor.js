// Require AWS IoT Device SDK
const awsIoT = require('aws-iot-device-sdk');

// Require crypto for random numbers generation
const crypto = require('crypto');

// Load the endpoint from file
const endpointFile = require('/home/ec2-user/environment/endpoint.json');

// Fetch the deviceName from the folder name
const deviceName = __dirname.split('/').pop();

// Topic names to subscribe too.
const scalable = 'body3Edge1/';
const sinkTopic = scalable + 'sink/';

// Create the thingShadow object with argument data
const device = awsIoT.device({
   keyPath: 'private.pem.key',
  certPath: 'certificate.pem.crt',
    caPath: '/home/ec2-user/environment/root-CA.crt',
  clientId: deviceName,
      host: endpointFile.endpointAddress
});

var battery;
var isCharging = false;

// Function that gets executed when the connection to IoT is established
device.on('connect', function() {
    console.log('Connected to AWS IoT');
    battery = 100.0;

    // subscribing to 'scalable/sink/heart-beat-sensor'
    device.subscribe(sinkTopic + deviceName);

    // Start the publish loop
    infiniteLoopPublish();
});

// Function to update battery status
function updateBatteryStatus(dischargeRate, isCharging) {
    if(isCharging) {
        if(battery >= 100.0) {
            console.log('battery fully charged!');
        } else {
            battery+=1.0;
        }
    } else {
        if(battery <= 0.0) {
            console.log('battery fully discharged! shutting down device!');
        } else {
            battery-=dischargeRate;
        }
    }
}

// Function sending car telemetry data every 5 seconds
function infiniteLoopPublish() {
    var timeOut;
    var dischargeRate;
    var topic = scalable + deviceName;

    console.log('Battery of ' + deviceName + ' is ' + battery + '%');
    if(battery >= 25) {
        timeOut = 5000;
        dischargeRate = 1;
    } else if(battery < 25) {
        timeOut = 2000;
        dischargeRate = 0.4;
    }

    console.log('Sending sensor telemetry data to AWS IoT for ' + deviceName);
    // Publish sensor data to scalable/heart-beat-sensor topic with getSensorData
    var data = JSON.stringify(getSensorData(deviceName));

    device.publish(topic, data);
    publishToSink(sinkTopic, data);

    updateBatteryStatus(dischargeRate, isCharging);
    // Start Infinite Loop of Publish every "timeOut" seconds
    setTimeout(infiniteLoopPublish, timeOut);
}

// Function to create a random float between minValue and maxValue
function randomIntBetween(minValue,maxValue){
    return parseInt(Math.floor(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue)));
}

// Generate random car data based on the deviceName
function getSensorData(deviceName) {
    let message = {
        'body3BloodPressureSensor' : randomIntBetween(90,100),
        //'systole': randomIntBetween(90,120),
        //'distole': randomIntBetween(60,80)
    };
    
    const device_data = { 
        'body3BloodPressureSensor': {
            'latitude':39.122229,
            'longitude':-77.133578
        }
    };
  
    message['battery'] = battery;
    message['latitude'] = device_data[deviceName].latitude;
    message['longitude'] = device_data[deviceName].longitude;
    message['device'] = deviceName;
    message['datetime'] = new Date().toISOString().replace(/\..+/, '');
    
    return message;
}

device.on('message', function(topic, message) {
    console.log("Message Received on Topic: " + topic + ": " + message);
    if(sinkTopic + deviceName == topic) {
        if(message == 'true') {
            isCharging = true;
        } else if (message == 'false') {
            isCharging = false;
        } else {
            console.log('Unknown value for charger status! not modifying the exisiting value!');
        }
    }
});

function publishToSink(topic, payload) {
    device.publish(topic, payload);
}
