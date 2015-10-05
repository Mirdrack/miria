// Serial Port setup
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("/dev/ttyUSB1", {
	baudrate: 9600,
	parser: serialport.parsers.readline('\n')
}, false);

r = require('rethinkdb')
r.connect({ host: '192.168.100.200', port: 28015 }, function(err, conn) {
  
	if(err) throw err;

	//Serial Port Events
	sp.open(function (error) {

		if(error)
			console.log('Failed to open: ' + error);
		else
		{
			console.log('Serial Port Open...');
			
			// Serial Port Event fired when we have data
			sp.on('data', function (data) {

				try {
					  
					data = JSON.parse(data);          
					// We insert our recolected data in our Rethink Database
					r.db('Natalya').table('reads')
						.insert({ temperature: data.temperature, humidity: data.humidity })
						.run(conn, function(err, res) {
					  
						if(err) throw err;
						//console.log(res);
					});
				} catch(e) {
					
					// We gonna ignore the errors
					console.log(e);
				}
			});

			// Serial Port Event for errors
			sp.on('error', function (error) {

				if (error) throw error;
			});
		}
	}); 
});