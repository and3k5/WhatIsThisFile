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
			var reader = new FileReader();
			reader.onload = function (event) {
				da.appendChild(document.createElement("p")).textContent=IdentifyFile(event.target.result).name;
			}
			reader.readAsArrayBuffer(file);
		} else {
			console.error("Error: Could not get file!");
		}
		return false;
	}
	var http = new XMLHttpRequest(),FILETYPES;
	http.open("GET","filetypes.xml",true)
	http.onloadend = function (e) {
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
	
	function splitStr(str) {
		var rtn=[];
		for (var i = 0,stop=str.length;i<stop;i+=2) {
			rtn.push(parseInt(str[i]+str[i+1],16));
		}
		return new Uint8Array(rtn);
	}
	
	function IdentifyFile(arrayBuffer) {
		var array=FILETYPES;
		var ui8 = new Uint8Array(arrayBuffer);
		for (var i=0,len=array.length;i<len;i++) {
			var obj=FetchFileInfo(array[i]);
			var array2=array[i].querySelectorAll("data")[0].querySelectorAll("byte");
			for (var j=0,len2=array2.length;j<len2;j++) {
				var pos = parseInt(array2[j].querySelector("pos").textContent,10);
				var value = splitStr(array2[j].querySelector("value").textContent);
				var right=true;
				for (var k=0,len3=value.length;k<len3;k++) {
					if (ui8[pos+k]!=value[k]) right=false;
				}
				if (right) {
					var desc;
					if ((desc=array2[j].querySelector("desc"))!=null) {
						obj.name += " ("+desc.textContent+")";
					}
					return obj;
				}
			}
		}
		return {name:"Unidentified file"};
	}
});

