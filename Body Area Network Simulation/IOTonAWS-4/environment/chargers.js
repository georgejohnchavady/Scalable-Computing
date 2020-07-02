module.exports = {
  "chemical": function(batteryCapacity){
    return batteryCapacity*0.05
  },
  
  "motion": function(batteryCapacity){
    var currentSecond = (new Date()).getSeconds()
    if(currentSecond<30){
        return batteryCapacity*0.20
    }
    else{
        return 0
    }
  },
  
  "wireless": function(batteryCapacity){
    return batteryCapacity*0.1
  },
  
  "none": function(batteryCapacity){
    return 0
  }
}