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
const scalable = 'scalable/';
const sinkTopic = scalable + 'sink/';

// Use the awsIoT library to create device object using the constants created before
const device = awsIoT.device({
   keyPath: keyPath,
  certPath: certPath,
    caPath: caPath,
  clientId: clientId,
      host: host
});

// Function to publish payload to IoT topic
function publishToTopic(topic, payload) {
    // Publish to specified IoT topic using device object that you created
    device.publish(topic, payload);
}

// additional variable used for debugging and functionality overriding!
var devmode = false;

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
    var values = [];

    let msg = {
        'sendMail': true,
        'device': device
    };

    var sendMail = false;
    console.log('Message Recevied from ' + device);
    if(device == 'bodyTempSensor') {
        var bodyTempSensor = jMessage['bodyTempSensor'];
        if(bodyTempSensor > 102) {
            msg['metric'] = 'Body Temperature';
            msg['metricValue'] = bodyTempSensor.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    } else if(device == 'pacemakerSensor') {
        var heartbeat = jMessage['heartbeat'];
        if(heartbeat > 80 || heartbeat < 70) {
            msg['metric'] = 'Heart Rate';
            msg['metricValue'] = heartbeat.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    } else if(device == 'glucoseSensor') {
        var glucoseLevel = jMessage['glucoseLevel'];
        if(glucoseLevel > 6.5) {
            msg['metric'] = 'Glucose Level';
            msg['metricValue'] = glucoseLevel.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    } else if(device == 'bloodPressureSensor') {
        var bloodPressure = jMessage['bloodPressureSensor'];
        [systole, diastole] = bloodPressure.split('/');
        if(systole < 95 || systole > 115 || diastole < 65 || diastole > 75) {
            msg['metric'] = 'Blood Pressure';
            msg['metricValue'] = bloodPressure.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    } else if(device == 'pHValueSensor') {
        var phValue = jMessage['pHValue'];
        if(phValue < 7.35 || phValue > 7.45) {
            msg['metric'] = 'pH Value';
            msg['metricValue'] = phValue.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    } else if(device == 'pulseOximeterSensor') {
        var pulseOximeterSensor = jMessage['pulseOximeterSensor'];
        if(pulseOximeterSensor < 88) {
            msg['metric'] = 'Pulse Oximeter Level';
            msg['metricValue'] = pulseOximeterSensor.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    } else if(device == 'ecgSensor') {
        var ecgSensor = jMessage['ecgSensor'];
        if(ecgSensor < 120 || ecgSensor > 200) {
            msg['metric'] = 'ECG Level - PR interval';
            msg['metricValue'] = ecgSensor.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    } else if(device == 'lacticAcidSensor') {
        var lacticAcidSensor = jMessage['lacticAcidSensor'];
        if(lacticAcidSensor < 0.5 || lacticAcidSensor > 1.0) {
            msg['metric'] = 'Lactic Acid Level';
            msg['metricValue'] = lacticAcidSensor.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    } else if(device == 'respiratoryMonitorSensor') {
        var respiratoryMonitorSensor = jMessage['respiratoryMonitorSensor'];
        if(respiratoryMonitorSensor < 15 || respiratoryMonitorSensor > 20) {
            msg['metric'] = 'Respiratory Sensor Value';
            msg['metricValue'] = respiratoryMonitorSensor.toString();
            msg['person'] = 'Manasi';
            sendMail = true;
        }
    }

    if(deviceBattery <= 25.0) {
        values.push(deviceBattery);
        publishToTopic(sinkTopic + device, 'true');
        console.log('values ---------', values);
        checkLength(values);
    } else if(deviceBattery >= 100.0) {
        values.push(deviceBattery);
        publishToTopic(sinkTopic + device, 'false');
        console.log('values ---------', values);
        checkLength(values);
    }

    if(sendMail && devmode) {
        console.log('dev mode on!: not sending an email for sensor value inconsistency');
    }
    if(sendMail && !devmode) {
        publishToTopic(scalable + 'email', JSON.stringify(msg));
    }
});


function checkLength(values){
    if(values.length == 10){
      var plotly = require('plotly')('sakinavohracs','sXtLvtK2wKF59Q62Pqwf');
      
      var y_axis = [];
      for(var i=0;i<values.length;i++){
        y_axis.push(i);
      }
      

var trace1 = {
  x: y_axis,
  y: values,
  type: "scatter"
};

var data = trace1;
var graphOptions = {filename: "basic-line", fileopt: "overwrite"};
plotly.plot(data, graphOptions, function (err, msg) {
    console.log(msg);
});
    }
    
  }