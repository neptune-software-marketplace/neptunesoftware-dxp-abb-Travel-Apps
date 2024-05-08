var context = oEvent.oSource.getBindingContext();
var details = context.getObject();

//console.log("Details: ",details);

//push image URL to next page
oImageVehicleRate.setSrc(details.imageUrl);

//push Title of car to next page
oTitleVehicleRateName.setText(details.name);

var classCode = details.classCode;
var rateCode = details.rateCode;

var formattedDates = modeloMultiModelFormattedDateTime.getData();
var formattedPickup = formattedDates.formattedPickup;
var formattedDropff = formattedDates.formattedDropff;
//console.log("FPU:",formattedPickup);
//console.log("FDO:",formattedDropff);

var brandAndCountry = modeloMultiModelSelectedBrandAndLocation.getData();
var brand = brandAndCountry.brand;
var pickupdropoffLocation = brandAndCountry.pickupdropoffLocation;
var countryCode = brandAndCountry.countryCode;

// token not used
// dataClientID = getConfigValueAvis("AvisClientId");
// var dataAuthToken = modeloMultiModelSearchToken.getData();
// var dataAuthTokenExtract = ("Bearer " + dataAuthToken.access_token);

// var options = {
//     headers: {
//         "client_id": dataClientID, // Required.
//         "authorization": dataAuthTokenExtract// Required.
//     },
//     parameters: {
//         "brand": brand,
//         "pickup_date": formattedPickup,
//         "pickup_location": pickupdropoffLocation,
//         "dropoff_date": formattedDropff,
//         "dropoff_location": pickupdropoffLocation,
//         "country_code": countryCode,
//         "vehicle_class_code": classCode,
//         "rate_code": rateCode,
//     }
// };

// apioAPIGetVehicleRate(options);
// oApp.setBusy(true);

// ----------------- Begin Setting the vehicle data ------------------------------

debugger;

var obj = {};
obj.brand = selectedLocation.brand;
obj.pickupLocationAddrLine1 = selectedLocation.addressLine1;
obj.pickupLocationAddrLine2 = selectedLocation.addressLine2;
obj.pickupLocationCity = selectedLocation.city;
obj.pickupLocationCountry = selectedLocation.countryCode;
obj.pickupLocationPostCode = selectedLocation.postalCode;
// obj.pickupLocationStateName = vehicleRate.reservation.pickup_location.address.state_name;
// obj.pickupLocationAirportBool = vehicleRate.reservation.pickup_location.location.airport_location;
// obj.pickupLocationCode = vehicleRate.reservation.pickup_location.location.code;
obj.pickupLocationHours = selectedLocation.hours;
obj.pickupLocationName = selectedLocation.name;
obj.pickupLocationTelephone = selectedLocation.telephone;
obj.dropoffLocationAddrLine1 = selectedLocation.addressLine1;
obj.dropoffLocationAddrLine2 = selectedLocation.addressLine2;
obj.dropoffLocationCity = selectedLocation.city;
obj.dropoffLocationCountry = selectedLocation.countryCode;
obj.dropoffLocationPostCode = selectedLocation.postalCode;
// obj.dropoffLocationStateName = vehicleRate.reservation.dropoff_location.address.state_name;
// obj.dropoffLocationAirportBool = vehicleRate.reservation.dropoff_location.location.airport_location;
// obj.dropoffLocationCode = vehicleRate.reservation.dropoff_location.location.code;
obj.dropoffLocationHours = selectedLocation.hours;
obj.dropoffLocationName = selectedLocation.name;
obj.dropoffLocationTelephone = selectedLocation.telephone;

//calculating rate manually (this was provided previously by another API which is not needed in this case)
var pickupDate = new Date(modeloMultiModelFormattedDateTime.oData.formattedDropff.split("T")[0]),
    dropoffDate = new Date(modeloMultiModelFormattedDateTime.oData.formattedPickup.split("T")[0]);

var daysCarToBeHired = Math.abs(dropoffDate - pickupDate);
daysCarToBeHired = Math.ceil(daysCarToBeHired / (1000 * 60 * 60 * 24)); //Conversion from miliseconds to Days -> can be 1 or more days

// obj.rateAmount = parseFloat(details.vehicleTotal) / daysCarToBeHired;
obj.rateAmount = details.vehicleTotal;
obj.rateCurrency = details.currency;
obj.rateDays = daysCarToBeHired;
obj.rateCode = details.rateCode;
//--------------------------------------------------------------------------------------------------------

// obj.totalExtras = vehicleRate.reservation.rate_totals.totals.extras_total;
// obj.totalInsurance = vehicleRate.reservation.rate_totals.totals.insurance_total;
obj.totalReservation = details.reservation;
obj.totalTaxFees = (parseFloat(details.reservation) - parseFloat(details.vehicleTotal)).toFixed(2);
// obj.totalTaxFees = Math.round((obj.totalTaxFees * 100) / 100).toFixed(2);
obj.totalVehicleTotal = details.vehicleTotal;

//obj.taxBreakdown = vehicleRate.reservation.rate_totals.rate.taxes_fees.taxes;
//obj.feeBreakdown = vehicleRate.reservation.rate_totals.rate.taxes_fees.fees;

// obj.terms = vehicleRate.reservation.terms.endpoint;

// Define type of object for shopping cart
obj.objectType = "car";

//ModelData.Add(oSimpleFormVehicleRate, obj);

var formattedDates = modeloMultiModelFormattedDateTime.getData();
var formattedPickup = formattedDates.formattedPickup;
var formattedDropff = formattedDates.formattedDropff;
obj.formattedPickup = formattedPickup;
obj.formattedDropff = formattedDropff;

var imageSrc = oImageVehicleRate.getSrc();
obj.imageSrc = imageSrc;

var carName = oTitleVehicleRateName.getText();
obj.name = carName;

//ID
// var transactionId = vehicleRate.transaction.transaction_id;
// obj.transactionId = transactionId;

//console.log("Rate Obj =",obj);
modeloSimpleFormVehicleAddressDetails.setData(obj);
modeloSimpleFormVehiclePriceDetails.setData(obj);

// ----------------- End Setting the vehicle data --------------------------------

oApp.toDetail(oPageVehicleRate);
