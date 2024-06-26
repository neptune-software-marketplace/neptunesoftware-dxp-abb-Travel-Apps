//Put API response in var model
var data = xhr.responseJSON;
sap.m.MessageToast.show("Search Complete...");

oApp.setBusy(false);

if (data.length === 0) {
    OpenoMessageBoxNoHotelsFound();
    return;
} else {
    var model = data[0].hotelsAvailable.data
}

//console.log(model);
var hoteldata = [];

//Iterate through model, extracting each key attribute and push it into var hoteldata
for (i = 0; i < model.length; i++) {

    var addr = "";
    var totalPriceCalc = "";
    // For loop 5 times
    // for (y = 0; y < model[i].hotel.address.lines.length; y++) {
    //     addr = addr + model[i].hotel.address.lines[y] + ", ";
    // }
    var obj = {};
    obj.bookingid = model[i].offers[0].id;
    obj.hotelid = model[i].hotel.hotelId;
    obj.name = model[i].hotel.name;
    //obj.address = addr + model[i].hotel.address.cityName;
    obj.latitude = model[i].hotel.latitude;
    obj.longitude = model[i].hotel.longitude;
    obj.rating = model[i].hotel.rating;
    obj.photoUrl = (typeof model[i].hotel.media !== "undefined")? obj.photoUrl = model[i].hotel.media[0].uri : "";
    obj.description = (typeof model[i].hotel.description !== "undefined")? model[i].hotel.description.text : "";
    
    if (model[i].offers[0].price.total != null){
        obj.price = model[i].offers[0].price.total;
    } else {
        obj.price = model[i].offers[0].price.base;
    }

    obj.currency = model[i].offers[0].price.currency;
    obj.boardtype = model[i].offers[0].boardType;

    //get amenities
    obj.amenities = "";
    // for (y = 0; y < model[i].hotel.amenities.length; y++) {
    //     obj.amenities = obj.amenities + model[i].hotel.amenities[y] + " ";
    // }
    //obj.phone = model[i].hotel.contact.phone;
    obj.checkin = model[i].offers[0].checkInDate;
    obj.checkout = model[i].offers[0].checkOutDate;
    obj.guests = model[i].offers[0].guests.adults;
    //obj.cancellation = (typeof model[i].offers[0].policies.cancellation !== "undefined")? model[i].offers[0].policies.cancellation.deadline : "";
    obj.roomtype = model[i].offers[0].room.typeEstimated.category + " " + model[i].offers[0].room.typeEstimated.bedType + " beds: " + model[i].offers[0].room.typeEstimated.beds;
    obj.roomdescr = model[i].offers[0].room.description.text;
    
    //obj.totalprice = parseFloat(obj.price) * parseInt(oInputSNights.getValue());
    // var totalPriceCalc = obj.price * parseInt(oInputSNights.getValue())
    // obj.totalprice = totalPriceCalc.toString();

    hoteldata.push(obj);
}

//Set oHotelList to new hoteldata array
modeloListHotels.setData(hoteldata);

console.log(hoteldata);

oApp.toDetail(oPageHotelResults);