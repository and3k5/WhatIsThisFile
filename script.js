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
		FILETYPES=this.responseXML.querySelectorAll("filetypes")[0].querySelectorAll("file");
	};
	http.send();
	
	function getText(DOM) {
		if (DOM!=null) {
			if (DOM instanceof NodeList) {
				var str="",l="";
				for (var i=0,len=DOM.length;i<len;i++) {
					str+=l+DOM[i].textContent;
					l=", ";
				}
				return str;
			}else{
				return DOM.textContent;
			}
		}else{
			return "";
		}
	}
	
	function FetchFileInfo(DOM) {
		var name = getText(DOM.querySelectorAll("name"));
		return {name:name};
	}
	
	function IdentifyFile(arrayBuffer) {
		var array=FILETYPES;
		var ui8 = new Uint8Array(arrayBuffer);
		for (var i=0,len=array.length;i<len;i++) {
			var obj=FetchFileInfo(array[i]);
			console.log(obj);
			var array2=array[i].querySelectorAll("data")[0].querySelectorAll("byte");
			for (var j=0,len2=array2.length;j<len2;j++) {
				console.log(array2[j]);
			}
		}
	}
});

