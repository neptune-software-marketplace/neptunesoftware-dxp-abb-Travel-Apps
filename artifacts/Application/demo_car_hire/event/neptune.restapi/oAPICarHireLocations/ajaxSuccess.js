// var model = modeloMultiModelCarHireLocations.oData.locations;
var model = modeloMultiModelCarHireLocations.oData[0].carsLocationAvailable.locations;

if (model === undefined) {
    sap.m.MessageToast.show("No results found...");
    oApp.setBusy(false);
    return;
}

//console.log(model);
var carLocationData = [];

for (i = 0; i < model.length; i++) {
    var obj = {};
    obj.name = model[i].name;
    obj.addressLine1 = model[i].address.address_line_1;
    obj.addressLine2 = model[i].address.address_line_2;
    obj.postalCode = model[i].address.postal_code;
    obj.hours = model[i].hours;
    obj.telephone = model[i].telephone;
    obj.countryCode = model[i].address.country_code;
    obj.brand = model[i].brand;
    obj.code = model[i].code;
    obj.city = model[i].address.city;
    carLocationData.push(obj);
    //console.log("obj =",obj);
}

modeloListCarLocationResults.setData(carLocationData);

oApp.toMaster(oPageCarLocationResults);
oApp.setBusy(false);
