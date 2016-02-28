(function() {
	var _textArray = [];
	var _shiftTime = 70; // Time to shift each letter
	var _idToTypeAfter = "user-text-active";

	function type(text) {
		if(text) {
			_textArray = _textArray.concat(text.split(""));
			if(_textArray.length > text.length) {
				return ;
			}
		}

		if(_textArray.length > 0) {
			document.getElementById(_idToTypeAfter).innerHTML += _textArray.shift();
			setTimeout(type, _shiftTime);
		}
	}

	window.app = window.app || {};
	window.app.type = type;
})()