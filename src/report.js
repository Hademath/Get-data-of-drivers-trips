const { getTrips, getDriver, getVehicle } = require('api');
/**
 * This function should return the data for drivers in the specified format
 *
 * Question 4
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
  // Your code goes here
  const trips = await getTrips();
  const drivers = {};
  await Promise.all(Object.keys(drivers).map(async driverID=>{
    try{
      const details = await getDriver(driverID);
      drivers[driverID].fullname = details.name;
      drivers[driverID].id = driverID;
      drivers[driverID].phone = details.phone;
      drivers[driverID].vehicles = [];
      await Promise.all(details.vehicleID.map(async vehicleID=>{
        const vehicle = await getVehicle(vehicleID);
        drivers[driverID].vehicles.push({
          "plate": vehicle.plate,
          "manufacturer": vehicle.manufacturer
        });
      }))
    } catch (error){}
  }));
  trips.forEach(trip=>{
    if(!drivers[trip.driverID]) drivers[trip.driverID] = {
      noOfCashTrips:0, noOfNonCashTrips:0, totalAmountEarned:0, totalCashAmount:0, totalNonCashAmount:0, trips:[]};
      if(typeof trip.billedAmount === "string") trip.billedAmount = parseFloat(trip.billedAmount.replace(/,/g,'')),
      drivers[trip.driverID].totalAmountEarned += trip.billedAmount;
      if(trip.isCash){
        drivers[trip.driverID].noOfCashTrips += 1;
        drivers[trip.driverID].totalCashAmount += trip.billedAmount;
      }else{
        drivers[trip.driverID].noOfNonCashTrips += 1;
        drivers[trip.driverID].totalNonCashAmount += trip.billedAmount;
          }
    drivers[trip.driverID].trips.push({
      "user": trip.user.name,
      "created": trip.created,
      "pickup": trip.pickup.address,
      "destination": trip.destination.address,
      "billed": trip.billedAmount,
      "isCash": trip.isCash
    });  
  });
  return Object.values(drivers)
}
module.exports = driverReport;