# Application Description 
ClimaTrack will be a simple web interface used to display climate trends and current climate measurements. The parts of the project will incorporate both software and hardware, a Raspberry Pi for collecting data and a website to interface with the data. 
The Raspberry Pi will be the collector of multiple types of data. Using a BME280 sensor, we will be measuring climate data including temperature and humidity. This data is sent from the Raspberry Pi directly to an endpoint on our backend.
The web interface will include several different methods to interact with the data. These include a current climate page which will show the latest data poll along with current recommendations for clothing based on the climate measured. The other pages will include historical views of the data including monthly and weekly views. The use cases can be adapted to include being used in environments where climate changes can be critical (i.e. a research lab, restaurant climate controlled storage, etc.).

 # Jira Tracking
 https://csci-3308-fall21-013-03.atlassian.net/jira/software/projects/QZ013/boards/1/backlog

 # Heroku
 https://climatrak1.herokuapp.com
 
 # Video Demo
 https://youtu.be/PzWQQKlYRJU

 # Testing
 ### Build testing environemnt.
 ```
 mkdir dir-to-env
 cd dir-to-env
 npm install express chai mocha
 ```
 ### Copy source to the new enviroment.
 ```
 cp dir-to-source dir-to-env
 ```
 ### Run test.
 ```
 npm test
 ```
