(function() {
	var _textArray = [];
	var _shiftTime = 20; // Time to shift each letter
	var _guestUserNameText = "-guest@user:~$";
	var _userNameText = "-reify@root:~$ ";
	var commandCounter = 1; //Used to shift between our bot and the guest user
	var _cursorText = " █";
	var _shiftAmount = 3; 

	var _cache = {
		app: document.getElementById("app")
	}

	var _id = {
		activeText: "user-text-active",
		cursor: "blinking-cursor"
	}

	var _class = {
		lineDiv: "line",
		userName: "user-name",
		userText: "user-text"
	}

	// aka the typing effect generator.
	function type(text) {
		if(text) {
			_textArray = _textArray.concat(text.split(""));
			if(_textArray.length > text.length) {
				return ;
			}
		}

		if(_textArray.length > 0) {
			var currentText = _textArray.shift();

			if(currentText == '\0') // go to the next command line window. 
			{
				_newcommandLine();
			}
			else if(currentText == '\n') // print a new line without printing the user-name 
			{
				document.getElementById(_id.activeText).innerHTML += '<br>';
			}
			/*else if(currentText == '\b') // Go back by _shiftamount
			{
				document.getElementById(_id)
			}*/
			else 
			{
				document.getElementById(_id.activeText).innerHTML += currentText;
			}
			setTimeout(type, _shiftTime);
		}
	}
	// Find current time and display it. 
	function _getTimeText() {
		var checkTime = i => { return (i < 10) ? ("0" + i) : i; }

		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		h = checkTime(h);
		m = checkTime(m);
		return h + ":" + m;
	}

	window.onload = function()
	{
		document.getElementById('user').innerHTML = _getTimeText() + document.getElementById('user').innerHTML;
		commandCounter++;
	}

	function _newcommandLine() {
		var previousActive = document.getElementById(_id.activeText);
		
		// remove the blinking cursor
		previousActive.parentNode.removeChild(previousActive.nextSibling);
		// and then remove its status as active (we indicated status by id)
		previousActive.removeAttribute("id");

		var lineNode = document.createElement("DIV");
		lineNode.className = _class.lineDiv;

		// 00:00-reify@root:~$
		var userNameNode = document.createElement("SPAN");
		userNameNode.className = _class.userName;
		if(commandCounter % 2 == 1)

			userNameNode.appendChild(document.createTextNode(_getTimeText() + _userNameText));

		else
			userNameNode.appendChild(document.createTextNode(_getTimeText() + _guestUserNameText));
		commandCounter++;
		lineNode.appendChild(userNameNode);

		// Whatever is being typed
		var activeNode = document.createElement("SPAN");
		activeNode.className = _class.userText;
		activeNode.id = _id.activeText;
		lineNode.appendChild(activeNode);

		var cursor = document.createElement("SPAN");
		cursor.id = _id.cursor;
		cursor.appendChild(document.createTextNode(_cursorText));
		lineNode.appendChild(cursor);

		_cache.app.appendChild(lineNode);
	}

	window.app = window.app || {};
	window.app.type = type;
})()