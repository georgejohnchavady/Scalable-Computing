// Require AWS IoT Device SDK
const awsIoT = require('aws-iot-device-sdk');
// Require crypto for random numbers generation
const crypto = require('crypto');

//var path = require("path")
var locations = require("./locations.json")
var params = require("./params.json")
var curves = require("./curves.js")
var utils = require("./utils.js")
var chargers = require("./chargers.js")
var datagenerator = require("./datagenerator.js")

module.exports.start = function(simTime, sensorName, device, recharge){
  device.clientId = sensorName
  device.on('connect', function() {
    console.log(sensorName,'Connected to AWS IoT');
    // subscribing to sensor's topic
    device.subscribe("body2/"+sensorName);
  });
  
  device.on('message', function(topic, message) {
    //forward other sensor's data to sink
    send(message)
  });
  
  var myParams = params[sensorName]
  myParams.battery = myParams.batteryCapacity
  var reading = 0
  var topic = "sink"
  
  console.log(`starting sensor ${sensorName}`)
 
  read()
  sendReading()
    
  function send(data){
    var dataObj = JSON.parse(data) 
    var time_step = (new Date()).getSeconds() % locations.length

    if (checkBattery()) {
      //publish data to topic
      device.publish("body2/"+topic, data)
        
      var batteryDrain = curves.batteryDrainFromRadio(myParams.radioPower)
      drainBattery(batteryDrain)
      console.log(`[${sensorName}|${myParams.batteryStatus}][sent ${dataObj.metricValue} from ${dataObj.sensor} to ${topic}] battery = ${myParams.battery}, radio power = ${myParams.radioPower}, battery drain (by comms) = ${batteryDrain}`)
    }
    else {
      console.log(`[${sensorName}|${myParams.batteryStatus}][could not send ${dataObj.metricValue} from ${dataObj.sensor} to ${topic}] Sensor is in power saving mode.`)
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
      var time_step = (new Date()).getSeconds() % locations.length
      
      if(myParams.battery< myParams.batteryCapacity*myParams.batteryWarningLevel){
        myParams.batteryStatus = "warning"
        var closestSensor = utils.getClosestSensor(sensorName, locations[time_step])
        topic = closestSensor
      } 
      else {
        myParams.batteryStatus = "normal"
        //send directly to sink
        topic = "sink"
      }
      
      var distFromDest = utils.getDistance(locations[time_step][sensorName], locations[time_step][topic])
      myParams.radioPower = curves.distToRadioPower(distFromDest)
      return true
    }
  }
  
  async function read(){
    var interval = setInterval(() => {
      reading = datagenerator[myParams.metric](reading);
      //console.log(`[${sensorName}] read ${reading}`)
      
      drainBattery(myParams.baseBatteryDrain);
      
      //recharge
      myParams.battery = Math.min(myParams.battery + chargers[myParams.chargerType](myParams.batteryCapacity), myParams.batteryCapacity)
      
    }, myParams.readInterval);
   
    setTimeout(() => {
      clearInterval(interval);
    }, simTime);
  }
  
  async function sendReading(){
    var interval = setInterval(() => {
      var message = {}
      message["sensor"] = sensorName
      message["metric"] = myParams.metric
      message["metricValue"] = reading
      message["person"] = "Anusha"
      
      send(JSON.stringify(message))
    }, myParams.sendInterval);
   
    setTimeout(() => {
      clearInterval(interval);
      //device.close()
    }, simTime);
  }
}


