var CSVToJSON = function() {

  this.parseCSV = function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var csvText = e.target.result;
      var allTextLines = csvText.split(/\r\n|\n/);
      //Split per line on tabs and commas
      var headers = allTextLines[0].split(/\t|,/);
      var lines = [];
      var client = [];

      for (var i=1; i<allTextLines.length; i++) {
          var data = allTextLines[i].split(/\t|,/);
          if (data.length == headers.length) {
            var location = {"creation":data[1], "cp":data[5], "name":data[12], "phone":data[13], "platform":data[11]};
            client.push(location);
          }
      }
      console.log(client)
    };
    reader.onerror = function(ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function handleCSVFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var xl2json = new CSVToJSON();
  xl2json.parseCSV(files[0]);
}