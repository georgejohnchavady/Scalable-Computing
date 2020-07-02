// Require AWS IoT Device SDK
const awsIoT = require('aws-iot-device-sdk');
// Require crypto for random numbers generation
const crypto = require('crypto');

//var locations = require("./locations.json")
var params = require("./params.json")
var curves = require("./curves.js")
//var utils = require("./utils.js")
var chargers = require("./chargers.js")
var values=[];

module.exports.start = function(simTime, sensorName, device, recharge){
  device.clientId = sensorName
  values.push(0);
  device.on('connect', function() {
    console.log(sensorName,'Connected to AWS IoT');
    // subscribing to sensor's topic
    device.subscribe("body4/"+sensorName);
  });
  
  device.on('message', function(topic, message) {
    //forward other sensor's data to sink
    send(message)
  });
  
  var myParams = params[sensorName]
  myParams.battery = myParams.batteryCapacity
  var topic = "edge/body4/"
  
  
  console.log(`starting sensor ${sensorName}`)
  recharge()
    
  function send(data){
    var dataObj = JSON.parse(data) 
    dataObj["device"] = "body4"
    
    if (checkBattery()) {
      //publish data to topic
      device.publish(topic+dataObj.metric, JSON.stringify(dataObj))
        
      var batteryDrain = curves.batteryDrainFromRadio(myParams.radioPower)
      drainBattery(batteryDrain)
      values.push(batteryDrain);
      //console.log('battery values-----------------------',values);
      console.log(`[${sensorName}|${myParams.batteryStatus}][sent ${dataObj.metricValue} from ${dataObj.sensor} to ${topic+dataObj.metric}] battery = ${myParams.battery}, radio power = ${myParams.radioPower}, battery drain (by comms) = ${batteryDrain}`)
    }
    else {
      values.push(0);
      //console.log('battery values-----------------------',values);
      console.log(`[${sensorName}|${myParams.batteryStatus}][could not send ${dataObj.metricValue} from ${dataObj.sensor} to ${topic+dataObj.metric}] Sensor is in power saving mode.`)
     
      
    }
  }
    
  function drainBattery(value){
    myParams.battery = myParams.battery - value
  }
  
  function checkBattery(){
    if(myParams.battery< myParams.batteryCapacity*myParams.batteryCriticalLevel){
      myParams.batteryStatus = "critical"
      return false
    }
    else {
        myParams.batteryStatus = "normal"
        return true
    }
  }
  
  async function recharge(){
    var interval = setInterval(() => {
      //console.log("recharging sink..")    
      myParams.battery = Math.min(myParams.battery + chargers[myParams.chargerType](myParams.batteryCapacity), myParams.batteryCapacity)
    }, 1000);
   
    setTimeout(() => {
      clearInterval(interval);
    }, simTime);
  }

}


