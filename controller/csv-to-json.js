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
          let cp = JSON.stringify(data[5]).replace(/"/gi, '').replace(/u0000/gi,'').replace(/\//gi, '').replace(/\\/gi, "").trim();
          let name = JSON.stringify(data[12]).replace(/"/gi, '').replace(/u0000/gi,'').replace(/u000/gi,'').replace(/\\/gi, "").trim();
          let phone =  JSON.stringify(data[13]).replace(/^\D+/g, '').replace(/u0000/gi,'').replace(/0000/gi,'').replace(/\\/gi, "").replace(/"/gi, "").replace(/p:/gi,"").replace(/\+/gi,"").trim();
          let platform = JSON.stringify(data[11]).replace(/"/gi, '').replace(/\\/gi, "").trim();
          var regist = {"Fecha":creation, "Tratamiento":cp, "Nombra":name, "Telefono":phone, "Origen":(platform.includes('f')?'Facebook':'Instragram')};
          client.push(regist);
        }
        jQuery( '#textarea_json' ).val(  JSON.stringify( eval(client) ).replace(/\\u0000/gi,'') );
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