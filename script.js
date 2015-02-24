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
			console.log(file);
			var reader = new FileReader();
			reader.onload = function (event) {
				console.log(event.target.result);
			}
			reader.readAsDataURL(file);
		} else {
			console.error("Failed");
		}
		return false;
	}
});