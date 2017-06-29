var fs = require('fs');

function Cloze (cloze, phrase) {
	this.cloze = cloze,
	this.phrase = phrase
}

module.exports = Cloze;