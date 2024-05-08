var sug;

var locationData = ModelData.FindFirst(
    modeloMultiModelLocationsSearch,
    "location",
    oInputSLocation.getValue(),
    "Contains"
);
// console.log("locationData");
// console.log(locationData)
locationData = locationData.locationData.data;

oInputSLocation.removeAllSuggestionItems();
for (i = 0; i < locationData.length; i++) {
    sug = new sap.ui.core.Item({
        key: locationData[i].iataCode,
        text:
            locationData[i].iataCode +
            " - " +
            locationData[i].name +
            " " +
            locationData[i].subType +
            ", " +
            locationData[i].address.cityName +
            " " +
            locationData[i].address.countryName,
    });

    //console.log(sug);
    oInputSLocation.addSuggestionItem(sug);
}

oApp.setBusy(false);