
module.exports = {
  
  "distToRadioPower": function(dist){
    //minimum radio power required for x distance
    return dist*15 //placeholder
  },
  
  "batteryDrainFromRadio": function(radio_power){
    //battery drain per second that radio comms at radio_power at dBm/mW causes
    return radio_power/10
  }
}