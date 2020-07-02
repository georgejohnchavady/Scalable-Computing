
var utilities = {
  "getDistance": function(p1, p2){
    var acc = 0
    for(var i=0; i<p1.length ;i++){
      acc = acc + (p1[i]-p2[i])**2
    }
    return Math.sqrt(acc);
  },
  
  "getClosestSensor": function(thisPointName, allPoints){
    var thisPoint = allPoints[thisPointName]
    var closestSensor = "sink"
    var minDist = utilities.getDistance(thisPoint, allPoints["sink"])
    
    for (let [key, value] of Object.entries(allPoints)) {
      if(key==thisPointName){
        continue
      }
      
      var dist = utilities.getDistance(thisPoint, value)
      if(dist<minDist){
        closestSensor = key
        minDist = dist
      }
    }
    
    return closestSensor
  },
  
  "randomFloatBetween": function (minValue,maxValue){
    return parseInt(Math.floor(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue)));
  },
  
  "randomIntBetween": function (minValue,maxValue){
    return parseInt(Math.floor(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue)));
  }
}

module.exports = utilities