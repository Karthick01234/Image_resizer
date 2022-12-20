var input = document.getElementById("img");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var modal1 = document.getElementById("myModal1");
var span1 = document.getElementsByClassName("close1")[0];
var enter = document.getElementById("enter");
var enter1 = document.getElementById("enter1");
var file;
var image = new Image();
var x = 0;
var y = 0;
function fit() {
	return new Promise((resolve, reject)=> {
		modal.style.display = "block";
		span.onclick = function() {
			modal.style.display = "none";
			if(!enter.value) {
				var value = document.getElementById("width").value;
				if(value === "w") {
					x = window.innerWidth;
					modal1.style.display = "block";
					console.log("window width : "+x);
				}
				else {
					x = image.width;
					modal1.style.display = "block";
					console.log("image width : "+x);
				}	
			}
			else {
				x = parseInt(enter.value);		
				modal1.style.display = "block";
				console.log("image width : "+x);	
			}			   
		}
		span1.onclick = function() {
			modal1.style.display = "none";
			if(!enter1.value) {
				var value = document.getElementById("height").value;
				if(value === "w") {
					y = window.innerHeight;
					console.log("window height : "+y);
					resolve();
				}
				else {
					y = image.height;
					console.log("image height : "+y);
					resolve();
				}
            }
            else {
				y = parseInt(enter1.value);
				console.log("window height : "+y);
				resolve();
            }				
		}
	})
}
async function create() {
	await fit();
	var canvas = document.createElement("canvas");
	canvas.width=x;
	canvas.height=y;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, x, y);
	var url = canvas.toDataURL();
	var a =  document.createElement("a");
	a.download = file.name;
	a.href = url;
	a.click();
	window.location.reload();
}
input.onchange = function() {
	file = input.files[0];
	image.onload = function() {
		console.log("image load");
		create();
	}
	console.log("input onchange");
	image.src=URL.createObjectURL(file);
}
function upload() { 
	input.click();
}