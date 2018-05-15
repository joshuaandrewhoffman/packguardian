/*


import csv from 'csv-string'

//or
//require('lodash')
//require('csv-string')
//var csv = window['csv-string']
//ffs that lib name...


var input = `COPYPASTA`


var test = csv.parse(input)

var yourDeck = _.slice(test,1,test.length) //chop off the headers

var addByNum = [];
_.each(yourDeck,function(card){
	for(i=0; i < card[1]; i++){
		addByNum.push(card);
	}
})

var cardNum = 1;
var deck = _.map(addByNum,function(card){
	var imgUrl = 'https://deckbox.org/mtg/' + card[0] + '/tooltip';
	var toRet = {
            "number": cardNum++,
            "name": card[0],
            "imageUrl": imgUrl,
            "picked": false,
			"id": card[2],
			"rarity": card[3],
			"set": card[4],
			"collectorNum": card[5],
			"premium": card[6],
			"sideboarded": card[7],
        };
		return toRet;
})

JSON.stringify(deck)
*/
