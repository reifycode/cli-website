(function() {
	var _textArray = [];
	var _shiftTime = 70; // Time to shift each letter
	var _idToTypeAfter = "user-text-active";
	var _currentVariable;

	function type(text) {
		if(text) {
			_textArray = _textArray.concat(text.split(""));
			if(_textArray.length > text.length) {
				return ;
			}
		}

		if(_textArray.length > 0) 
		{
			_currentVariable = _textArray.shift();
			if(_currentVariable == '\n')
			{
				document.getElementById(_idToTypeAfter).innerHTML += "<br/>";
				document.getElementById(user-entry) = "-reify@root:~$ ";

			}
			else
			{
				document.getElementById(_idToTypeAfter).innerHTML += _currentVariable;
			}
			setTimeout(type, _shiftTime);
		}
	}
	window.app = window.app || {};
	window.app.type = type;
})()