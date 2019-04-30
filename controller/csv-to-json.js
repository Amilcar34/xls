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
          let creation = data[1].substring(data[1].search('-')+2, data[1].search('T')).replace(' ', '').trim(); 
          let cp = data[5].replace(/"/gi, '').trim();
          let name = data[12].replace(/"/gi, '').trim();
          //let phoneMatch = data[13].match(/[0-9]/);
          let phone =  data[13].replace(/^\D+/g, '').trim();
          let platform = data[11].replace(/"/gi, '').trim();
          var regist = {"creation":creation, "cp":cp, "name":name, "phone":phone, "platform":platform};
          client.push(regist);
        }
        jQuery( '#xlx_json' ).val(  JSON.stringify( eval(client) ).replace(/\\u0000/gi,'') );
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