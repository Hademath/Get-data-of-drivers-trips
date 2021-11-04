const { getTrips, getDriver, getVehicle } = require('api');
/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */

 const driversInfo = {}

function stringToNumber(arr){
    return parseFloat(arr.toString().replace(',', ''))
}




async function analysis() {
  //this part declare getTrips await
let result;
  try{
    result = await getTrips() 
    //console.log(result)
  }catch( err ){
    console.log(new Error('error')); 
  }
  

/// declare object for the parameter

let objectTemplate = {
  noOfCashTrips: 0, 
  noOfNonCashTrips: 0,
  billedTotal: 0,
  cashBilledTotal: 0,
  nonCashBilledTotal: 0,
  noOfDriversWithMoreThanOneVehicle: 0,
  mostTripsByDriver: {
    name: "",
    email: "",
    phone: "",
    noOfTrips: 0,
    totalAmountEarned: 0
  },
  highestEarningDriver: {
    name: "",
    email: "",
    phone: "",
    noOfTrips: 0,
    totalAmountEarned: 0
  }

}



  let sortedByID = {} //
  let tripsByDriver = {} //for storing the number of trips made by each driver
  let earnedByDriver = {}
  let driverVehicleNUmbersData = {} //object to store driverID mapped to their number of vehicles
  // var tripsData = await getTrips()
  let IdOfAllDrivers = [...new Set(result.map((trip) => trip.driverID))]
   //console.log(IdOfAllDrivers) //an array
  let driverIDMap = IdOfAllDrivers.map(async (driver) => {
    try {
      sortedByID[driver] = await getDriver(driver)
      //console.log(sortedByID[driver]);
    } catch (error) {}
  })
      //console.log(driverIDMap); This will return the promises of the 

await Promise.all(driverIDMap)

for(let trip of result){
let IDofEachDriver = trip.driverID
if (!driverVehicleNUmbersData.hasOwnProperty(IDofEachDriver)) {
  try {
    let driver = sortedByID[IDofEachDriver]
    driverVehicleNUmbersData[IDofEachDriver] = driver.vehicleID.length
    //console.log(driverVehicleNUmbersData[IDofEachDriver]); //this 
  } catch (error) {}
} 

if (tripsByDriver.hasOwnProperty(IDofEachDriver)) {
  tripsByDriver[IDofEachDriver]++
 // console.log(tripsByDriver[IDofEachDriver]); //this is the number of the trips by each driver
} else {
  tripsByDriver[trip.driverID] = 1
}

mostTripsDriverID = Object.keys(tripsByDriver).reduce((a, b) =>
tripsByDriver[a] < tripsByDriver[b] ? b : a
)
///console.log(mostTripsDriverID); this is the id of the driver of the that travel the most in ascending order

mostTripsDriver = sortedByID[mostTripsDriverID]
//the information of the most trips driver 
objectTemplate.mostTripsByDriver.name = mostTripsDriver.name
objectTemplate.mostTripsByDriver.email = mostTripsDriver.email
objectTemplate.mostTripsByDriver.phone = mostTripsDriver.phone
objectTemplate.mostTripsByDriver.noOfTrips = tripsByDriver[mostTripsDriverID]
objectTemplate.mostTripsByDriver.totalAmountEarned = earnedByDriver[mostTripsDriverID]



if (earnedByDriver.hasOwnProperty(IDofEachDriver)) {
  earnedByDriver[IDofEachDriver] += Number(parseFloat(stringToNumber(trip.billedAmount)).toFixed(2))
  //console.log(earnedByDriver[IDofEachDriver] );
} else {
  earnedByDriver[IDofEachDriver] = Number(
    parseFloat(stringToNumber(trip.billedAmount)).toFixed(2)
  )
  
}
///the information of the most earned driver
mostEarnedDriverID = Object.keys(earnedByDriver).reduce((a, b) =>
      earnedByDriver[a] < earnedByDriver[b] ? b : a 
    )
    mostEarnedDriver = sortedByID[mostEarnedDriverID]
    objectTemplate.highestEarningDriver.name = mostEarnedDriver.name
    objectTemplate.highestEarningDriver.email = mostEarnedDriver.email
    objectTemplate.highestEarningDriver.phone = mostEarnedDriver.phone
    objectTemplate.highestEarningDriver.noOfTrips = tripsByDriver[mostEarnedDriverID]
    objectTemplate.highestEarningDriver.totalAmountEarned = earnedByDriver[mostEarnedDriverID]


}
  //information about the driver vehcle
let driverVehicleArray = Object.keys(driverVehicleNUmbersData)
  for (let driver of driverVehicleArray) {
    if (driverVehicleNUmbersData[driver] > 1) {
      objectTemplate.noOfDriversWithMoreThanOneVehicle++
    }
  }
  objectTemplate.billedTotal = Number(objectTemplate.billedTotal.toFixed(2))
  objectTemplate.cashBilledTotal = Number(objectTemplate.cashBilledTotal.toFixed(2))
  objectTemplate.nonCashBilledTotal = Number(objectTemplate.nonCashBilledTotal.toFixed(2))
  //console.log(objectTemplate)




//  1. number of cash trips  
for(let i=0; i<result.length; i++ ){
  if(result[i]['isCash']== true){
    objectTemplate.noOfCashTrips++
  }
}

//console.log(objectTemplate.noOfCashTrips)

// 2. number of Non-cash trips

for(let i=0; i<result.length; i++){
  if(result[i]['isCash'] == false){
    objectTemplate.noOfNonCashTrips++
  }
}

 

// 3. Total bill for both the cash and non-cash trips 
for(let i=0; i<result.length; i++){
  if((result[i]['isCash'] == true) || (result[i]['isCash']==false)){
   objectTemplate.billedTotal += stringToNumber(result[i].billedAmount)
   objectTemplate.billedTotal = Number(objectTemplate.billedTotal.toFixed(2))
  }
}





// 4. Total bill for the noncash trips

for(let i=0; i<result.length; i++){
  if(result[i]['isCash'] == false){
        objectTemplate.nonCashBilledTotal += stringToNumber(result[i].billedAmount)
        objectTemplate.nonCashBilledTotal = +objectTemplate.nonCashBilledTotal.toFixed(2) 
  }
}



///5.  Total billed for the cash trips

for(let i=0; i<result.length; i++){
  if(result[i]['isCash'] == true)
   objectTemplate.cashBilledTotal += stringToNumber(result[i].billedAmount)

}


 


return objectTemplate

}
 


analysis() 
 

module.exports = analysis;
