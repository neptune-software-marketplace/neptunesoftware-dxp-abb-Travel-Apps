var dat = modeloMultiModelLocationsFlights.getData();
console.log(dat);

if (dat.length === 0){
    OpenoMessageBoxNoFlightsFound();
    oApp.toDetail(oPageBlank);
    oApp.toMaster(oPageSearch);
    return;
}

dat = dat[0].flightsAvailable.data;

var flights = [];
for (i = 0; i < dat.length; i++) {

    var flight = {};
    //GETTING OUTBOUND INFORMATION
    var out = dat[i].itineraries[0];
    flight.allDet = dat[i];
    flight.out = out;

    //GET FIRST SEGMENT TO RETRIEVE: DEPARTURE AIRPORT, DEP TIME, AIRLINE
    flight.outairline = out.segments[0].carrierCode;
    flight.outflightno = out.segments[0].carrierCode + out.segments[0].number;
    flight.outdepdate = out.segments[0].departure.at;
    flight.outdeptime = getTimeFormatted(out.segments[0].departure.at);
    flight.outdepairport = out.segments[0].departure.iataCode;

    //GET LAST SEGMENT TO RETRIEVE: ARRIVAL AIRPORT, ARR TIME
    var lastindex = out.segments.length - 1;
    flight.outarrdate = out.segments[lastindex].arrival.at;
    flight.outarrtime = getTimeFormatted(out.segments[lastindex].arrival.at);
    flight.outdays = howManyDays(flight.outdepdate, flight.outarrdate);
    flight.outarrairport = out.segments[lastindex].arrival.iataCode;

    //calculate totaltraveltime
    flight.outtraveltime = out.duration.substring(2); //minutesToDhms(out.ElapsedTime);

    //STOPS
    flight.outstop = lastindex;
    if (flight.outstop > 0) { //get list of all stop locations and get Stop Locations and Flight Numbers
        flight.outstoplocs = "";
        flight.outflightno = "";
        for (y = 0; y < out.segments.length; y++) {
            if (out.segments[y].arrival.iataCode !== flight.outarrairport) {
                flight.outstoplocs = flight.outstoplocs + out.segments[y].arrival.iataCode + " ";
            }
            flight.outflightno = flight.outflightno + " " + out.segments[y].carrierCode + out.segments[y].number;
            if (out.segments[y].carrierCode !== flight.outairline) {
                flight.outairline = "Multiple";
            }
        }
    }
    //GETTING INBOUND INFORMATION
    //do this only if there's a return
    flight.displayReturn = false;
    if (typeof dat[i].itineraries[1] !== "undefined") {
        flight.displayReturn = true;
        var inb = dat[i].itineraries[1];
        flight.inb = inb;

        //GET FIRST SEGMENT TO RETRIEVE: DEPARTURE AIRPORT, DEP TIME, AIRLINE
        flight.inairline = inb.segments[0].carrierCode;
        flight.inflightno = inb.segments[0].carrierCode + out.segments[0].number;
        flight.indepdate = inb.segments[0].departure.at;
        flight.indeptime = getTimeFormatted(inb.segments[0].departure.at);
        flight.indepairport = inb.segments[0].departure.iataCode;

        //GET LAST SEGMENT TO RETRIEVE: ARRIVAL AIRPORT, ARR TIME
        var lastindex = inb.segments.length - 1;
        flight.inarrdate = inb.segments[lastindex].arrival.at;
        flight.inarrtime = getTimeFormatted(inb.segments[lastindex].arrival.at);
        flight.indays = howManyDays(flight.indepdate, flight.inarrdate);
        flight.inarrairport = inb.segments[lastindex].arrival.iataCode;

        //calculate totaltraveltime
        flight.intraveltime = inb.duration.substring(2); //minutesToDhms(inb.ElapsedTime);

        //STOPS
        flight.instop = lastindex;
        if (flight.instop > 0) { //get list of all stop locations and get Stop Locations and Flight Numbers
            flight.instoplocs = "";
            flight.inflightno = "";
            for (y = 0; y < inb.segments.length; y++) {
                if (inb.segments[y].arrival.iataCode !== flight.inarrairport) {
                    flight.instoplocs = flight.instoplocs + inb.segments[y].arrival.iataCode + " ";
                }
                flight.inflightno = flight.inflightno + " " + inb.segments[y].carrierCode + inb.segments[y].number;
                if (flight.inairline !== inb.segments[y].carrierCode) {
                    flight.inairline = "Multiple";
                }
            }
        }

        if (flight.inairline === flight.outairline) {
            flight.inairline = "";
        }
    }

    //PRICE INFORMATION
    flight.totalprice = dat[i].price.grandTotal;
    flight.currency = dat[i].price.currency;
    //flight.fareinfo = dat[i].AirItineraryPricingInfo.FareInfos.FareInfo;
    
    
    
    flight.cabin = dat[i].travelerPricings[0].fareDetailsBySegment[0].cabin;
    for (z = 0; z < dat[i].travelerPricings[0].fareDetailsBySegment.length; z++) {
        if (dat[i].travelerPricings[0].fareDetailsBySegment[z].cabin !== flight.cabin) {
            flight.cabin = "multiple";
            break;
        }
    }

    flights.push(flight);

}

ModelData.Delete(oListFlights);

ModelData.AddArray(oListFlights, flights);
oApp.toDetail(oPageResults);

resize(window.matchMedia("(max-width: 580px)"));