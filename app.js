var data = require("./physicalLinesJson.json");
var PhysicalCountLines = data.PhysicalCountLines;

PhysicalCountLines.forEach(function(line){
	console.log(line.quantityCounted);
	if(line.isSerialized && line.isSerialized !== undefined) {
		console.log(line.details.IMEIS);
	}
});

var scannedLine = {
	"sku" : 69300,
	"IMEIS": {
		"sellable" : [
			80000000001,
			80000000002,
			80000000003 
		],
		"nonSellable" : [
			800000000011
		],
		"checkedOut" : [

		]
	}
};

function addCount(scannedLine) {
	for(var i=0; i < PhysicalCountLines.length; i++) {
		//looping through each physical line
		//console.log(PhysicalCountLines[i].sku + " == " + scannedLine.sku);
		if(PhysicalCountLines[i].sku === scannedLine.sku){
			//checking if it is a serialized object
			//console.log(PhysicalCountLines[i].isSerialized + " && " + PhysicalCountLines[i].isSerialized);
			if(PhysicalCountLines.isSerialized !== "undefined" && PhysicalCountLines[i].isSerialized) {
				console.log("is here");
				//checking if scanned line and physical count line has sellable imeis
				if(scannedLine.IMEIS.sellable !== "undefined" && 
					scannedLine.IMEIS.sellable.length > 0 &&
					PhysicalCountLines[i].details.IMEIS.sellable !== "undefined" &&
					PhysicalCountLines[i].details.IMEIS.sellable.length > 0
				){
					//marrying each sellable imei in scanned line to physical count line
					scannedLine.IMEIS.sellable.forEach(function(imei) {
						for(var j=0; j < PhysicalCountLines[i].details.IMEIS.sellable.length; j++){
							if(PhysicalCountLines[i].details.IMEIS.sellable[j].imei === imei){
								PhysicalCountLines[i].details.IMEIS.sellable[j].isCounted = true;
								PhysicalCountLines[i].quantityCounted.sellable++;
							}
						}
					});
				}
			}
		}
	}
}

addCount(scannedLine);
console.log("-----------------------------------");
PhysicalCountLines.forEach(function(line){
	console.log(line.quantityCounted);
	if(line.isSerialized && line.isSerialized !== undefined) {
		console.log(line.details.IMEIS);
	}
});




