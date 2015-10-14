var appConfig = {};
appConfig.usb = {};
appConfig.db = {};

if(process.env.NODE_ENV == 'production')
{
	appConfig.usb.name = '/dev/ttyACM0';
	appConfig.usb.baudrate = 9600;
	appConfig.db.host = '192.168.100.200';
	appConfig.db.port = 28015;
	appConfig.db.name = 'Natalya';
}
else
{
	appConfig.usb.name = '/dev/ttyACM0';
	appConfig.usb.baudrate = 9600;
	appConfig.db.host = '192.168.100.200';
	appConfig.db.port = 28015;
	appConfig.db.name = 'Natalya';	
}

module.exports = appConfig;