var utils = require("./utils.js")

var self = {
  "temperature": function(x){
    return utils.randomFloatBetween(94, 106)
  },
  
  "bloodpressure": function(x){
    return utils.randomIntBetween(90,120)
  },
  
  "ecg": function(x){
    return utils.randomIntBetween(110, 210)
  },
  
  "glucose": function(x){
    return utils.randomFloatBetween(3.5, 8.5)
  },
  
  "heartbeat": function(x){
    return utils.randomIntBetween(60, 95)
  },
  
  "ph": function(x){
    return utils.randomFloatBetween(7.25, 7.55)
  },
  
  "oxygen": function(x){
    return utils.randomIntBetween(85, 100)
  }
}

module.exports = self