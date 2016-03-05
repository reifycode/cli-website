(function() {
	var _textArray = [];
	var _shiftTime = 70; // Time to shift each letter
	var _userNameText = "-reify@root:~$ ";


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

			if(currentText == '\n') _newLine();
			else document.getElementById(_id.activeText).innerHTML += currentText;

			setTimeout(type, _shiftTime);
		}
	}

	function _getTimeText() {
		var checkTime = i => { return (i < 10) ? ("0" + i) : i; }

		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		h = checkTime(h);
		m = checkTime(m);
		return h + ":" + m;
	}

	function _newLine() {
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
		userNameNode.appendChild(document.createTextNode(_getTimeText() + _userNameText));
		lineNode.appendChild(userNameNode);

		// Whatever is being typed
		var activeNode = document.createElement("SPAN");
		activeNode.className = _class.userText;
		activeNode.id = _id.activeText;
		lineNode.appendChild(activeNode);

		var cursor = document.createElement("SPAN");
		cursor.id = _id.cursor;
		lineNode.appendChild(cursor);

		_cache.app.appendChild(lineNode);
	}

	window.app = window.app || {};
	window.app.type = type;
})()