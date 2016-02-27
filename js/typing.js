var commandLineText = "String data here";
var textArray = commandLineText.split("");
var loopTimer;
function type() {
	if(textArray.length > 0) {
		document.getElementById("blurry-text").innerHTML += textArray.shift();
	} else {
		clearTimeout(loopTimer); 
                return false;
	}
	loopTimer = setTimeout('type()',70);
}
type();