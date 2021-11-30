import time
import board
import csv
from adafruit_bme280 import basic as adafruit_bme280
from datetime import datetime
import requests

# Temp Sensor Setup
i2c = board.I2C()
bme280 = adafruit_bme280.Adafruit_BME280_I2C(i2c)
bme280.sea_level_pressure = 1013.25
delay = 60 * 5  # seconds

# REST Setup
# url = "http://192.168.0.18:3000/data" # change depending on where website is being hosted (currenty localhost on)
url = "https://climatrak1.herokuapp.com/data"

def getTemp():
    # get data from sensor and time
    temperature = bme280.temperature
    relative_humidity = bme280.relative_humidity
    date = datetime.now()
    dt = date.strftime("%m-%d-%Y %H:%M:%S")
    
    # output to csv
    #fields = ["Temperature", "Humidity", "Date"]
    #data = [temperature, relative_humidity, dt]
    
    #filename = "data.csv"
    #with open(filename, 'a') as csvfile:
     #   csvwriter = csv.writer(csvfile)
      #  csvwriter.writerow(data)
    
    # terminal out
    #print("\nTemperature: %0.1f C" % temperature)
    #print("Humidity: %0.1f %%" % relative_humidity)
    #print("Date-Time: ", dt)
    
    return temperature, relative_humidity, dt
    
while True:
    temperature, relative_humidity, dt = getTemp()
    
    print("\nTemperature: %0.1f C" % temperature)
    print("Humidity: %0.1f %%" % relative_humidity)
    print("Date-Time: ", dt)
    
    data ={"Temperature": temperature, "Humidity": relative_humidity, "Date": dt}
    
    try:
        resp = requests.post(url, json=data, timeout=1)
        print("Data Sent: Status " + str(resp.status_code))
    except requests.exceptions.ConnectTimeout:
        print("No Response from Server!")
        pass
    except requests.exceptions.ConnectionError:
        print("Server disconnected, please restart from local machine")
        pass
    except Exception as e:
        print("Unknown Error")
        pass
    
    time.sleep(delay)
