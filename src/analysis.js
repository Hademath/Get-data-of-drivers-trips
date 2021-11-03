const { getTrips, getDriver, getVehicle } = require('api');
/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */

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
  
// this part declare the getDriver promise all await

for(let i=0; i<result.length; i++){
  //console.log(result[i].driverID)
  const drivers = {};
async function getDrivers() {
  try {
    driverData = await getDriver(result[i].driverID)
  } catch (err) {
    console.log(err.message)
  }

}

getDrivers();


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

//  1. number of cash trips  
for(let i=0; i<result.length; i++ ){
  if(result[i]['isCash']== true){
    objectTemplate.noOfCashTrips++
  }
}
// return objectTemplate.noOfCashTrips
console.log(objectTemplate.noOfCashTrips)

// 2. number of Non-cash trips

for(let i=0; i<result.length; i++){
  if(result[i]['isCash'] == false){
    objectTemplate.noOfNonCashTrips++
  }
}
// return objectTemplate.noOfNonCashTrips
 console.log(objectTemplate.noOfNonCashTrips);

// 3. Total bill for both the cash and non-cash trips 
for(let i=0; i<result.length; i++){
  if((result[i]['isCash'] == true) || (result[i]['isCash']==false)){
   objectTemplate.billedTotal += stringToNumber(result[i].billedAmount)
   roundUp = objectTemplate.billedTotal.toFixed(2)
  }
}
// return   objectTemplate.billedTotal
console.log( roundUp);



// 4. Total bill for the noncash trips

for(let i=0; i<result.length; i++){
  if(result[i]['isCash'] == false){
        objectTemplate.nonCashBilledTotal += stringToNumber(result[i].billedAmount)
        roundUp =objectTemplate.nonCashBilledTotal.toFixed(2) 
  }
}
// return objectTemplate.nonCashBilledTotal
console.log(roundUp)



///5.  Total billed for the cash trips

for(let i=0; i<result.length; i++){
  if(result[i]['isCash'] == true)
   objectTemplate.cashBilledTotal += stringToNumber(result[i].billedAmount)

}

// return objectTemplate.cashBilledTotal
 console.log(objectTemplate.cashBilledTotal);

 


}
 
 //return objectTemplate

analysis() 
 

module.exports = analysis;
