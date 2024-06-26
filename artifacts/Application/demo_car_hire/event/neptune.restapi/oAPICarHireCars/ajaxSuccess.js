//reservation detail mapping HERE
// debugger;

// var vehicleModel = modeloMultiModelVehicleResults.oData.vehicles;
console.log(modeloMultiModelCarHireCars.oData[0])
var vehicleModel = modeloMultiModelCarHireCars.oData[0].carsAvailable.vehicles;

var vehicles = [];

for (i = 0; i < vehicleModel.length; i++) {
    var obj = {};
    obj.imageUrl = vehicleModel[i].category.image_url,
    obj.name = vehicleModel[i].category.name,
    obj.doors = vehicleModel[i].capacity.doors,
    obj.seats = vehicleModel[i].capacity.seats,
    obj.transmission = vehicleModel[i].category.vehicle_transmission,
    obj.reservation = vehicleModel[i].rate_totals.pay_later.reservation_total,
    obj.vehicleTotal = vehicleModel[i].rate_totals.pay_later.vehicle_total,
    obj.currency = vehicleModel[i].rate_totals.rate.currency,
    
    obj.airConditioned = vehicleModel[i].features.air_conditioned,
    obj.bluetoothEquipped = vehicleModel[i].features.bluetooth_equipped,
    obj.connectedCar = vehicleModel[i].features.connected_car,
    
    obj.classCode = vehicleModel[i].category.vehicle_class_code,
    obj.rateCode = vehicleModel[i].rate_totals.rate.rate_code,
    vehicles.push(obj);
    //console.log("obj =",obj);
}

modeloListVehicleResults.setData(vehicles);


oApp.toDetail(oPageVehicleResults);

resize(window.matchMedia("(max-width: 580px)"));


oApp.setBusy(false);