var sug;

if (currentLocationInput === "From") {
    var locationDataFrom = ModelData.FindFirst(
        modeloMultiModelLocationsSearch,
        "location",
        oInputSFFrom.getValue(),
        "Contains"
    );

    locationDataFrom = locationDataFrom.locationData.data;

    oInputSFFrom.removeAllSuggestionItems();
    for (i = 0; i < locationDataFrom.length; i++) {
        sug = new sap.ui.core.Item({
            key: locationDataFrom[i].iataCode,
            text:
                locationDataFrom[i].iataCode +
                " - " +
                locationDataFrom[i].name +
                " " +
                locationDataFrom[i].subType +
                ", " +
                locationDataFrom[i].address.cityName +
                " " +
                locationDataFrom[i].address.countryName,
        });

        console.log(sug);
        oInputSFFrom.addSuggestionItem(sug);
    }
} else if (currentLocationInput === "To")  {
    var locationDataTo = ModelData.FindFirst(
        modeloMultiModelLocationsSearch,
        "location",
        oInputSFTo.getValue(),
        "Contains"
    );

    locationDataTo = locationDataTo.locationData.data;

    oInputSFTo.removeAllSuggestionItems();
    for (i = 0; i < locationDataTo.length; i++) {
        sug = new sap.ui.core.Item({
            key: locationDataTo[i].iataCode,
            text:
                locationDataTo[i].iataCode +
                " - " +
                locationDataTo[i].name +
                " " +
                locationDataTo[i].subType +
                ", " +
                locationDataTo[i].address.cityName +
                " " +
                locationDataTo[i].address.countryName,
        });

        console.log(sug);
        oInputSFTo.addSuggestionItem(sug);
    }
}

// oApp.setBusy(false);
