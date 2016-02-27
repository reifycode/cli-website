var comandLineText = 'root@root:~$ Hello';
var textArray = commandLineText.split("");
var loopTimer;
function type()
{
	if(textArray.lenth > 0)
	{
		document.getElementById("blurry-text").innerHTML += textArray.shift();
	}
	else
	{
		clearTimeout(loopTimer);
		return false;
	}
	loopTimer = setTimeout('type()', 50);
}