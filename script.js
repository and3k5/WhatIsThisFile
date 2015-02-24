window.addEventListener("load",function () {
	var da=document.getElementById("droparea");
	da.ondragover = function (e) {
		this.classList.add('drophover');
		e.preventDefault();
		return false;
	}
	da.ondragleave = da.ondragend = function (e) {
		this.classList.remove('drophover');
		return false;
	};
	da.ondrop = function (e) {
		this.classList.remove('drophover');
		e.preventDefault();
		var file = e.dataTransfer.files[0];
		if (file != undefined) {
			console.log("Loaded file");
			var reader = new FileReader();
			reader.onload = function (event) {
				IdentifyFile(event.target.result);
			}
			reader.readAsArrayBuffer(file);
		} else {
			console.error("Failed");
		}
		return false;
	}
	var http = new XMLHttpRequest(),FILETYPES;
	http.open("GET","filetypes.xml",true)
	http.onloadend = function (e) {
		console.log("DOWNLOADED");
		FILETYPES=this.responseXML.getElementsByTagName("filetypes")[0].getElementsByTagName("file");
	};
	http.send();
	
	function IdentifyFile(arrayBuffer) {
		var array=FILETYPES;
		for (var i=0,len=array.length;i<len;i++) {
			console.log(array[i]);
		}
	}
	
});

