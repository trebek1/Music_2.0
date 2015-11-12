var Xray = require('x-ray');
var xray = new Xray(); 
var fs = require('fs'); 

xray('https://en.wikipedia.org/wiki/Billboard_Year-End_Hot_100_singles_of_1990', 'tr',

[{
 	number: 'tr th@html',
 	title: 'td:nth-of-type(1) a@title',
 	artist: 'td:nth-of-type(2) a@title',
 	featuring: 'td:nth-of-type(2) a:nth-of-type(2)@title',
 	and: 'td:nth-of-type(2) a:nth-of-type(3)@title'
 	
}]
)(function(err, results){

	results = results.filter(function(song){
		if(song.artist){
			return song
		}
		else{
			return
		} 
	});

	fs.writeFile("./results.json", JSON.stringify(results, null, '\t'))

})

//.write('results.json')

