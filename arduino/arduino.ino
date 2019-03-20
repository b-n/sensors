#include <Arduino.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include "AWSWebSocketClient.h"
#include <PubSubClient.h>
#include <AWSIoTduino.h>
#include <DHT.h>
#include "MHZ19.h"

#include "WifiSettings.h"  //update to your wifi settings
#include "IoTSettings.h"   //update to your AWS IoT settings

#define DHT_PIN D5
#define DHT_TYPE DHT22
#define MHZ19_PPM 5000
#define MHZ19_RX D6
#define MHZ19_TX D7

#define READING_DELAY_MILLIS 10000
#define ROLLING_READING_SIZE 6

//MQTT setup
const int maxMQTTMessageHandlers = 1;

//Connection to AWS Layer, AWS IoT, and making it easier to parse
AWSWebSocketClient awsWS(1000);
PubSubClient mqttClient(awsWS);
Thing awsThing(THING_NAME, mqttClient);

//Connection to Sensors
SoftwareSerial mhz_serial(MHZ19_RX, MHZ19_TX, false, 256); 
MHZ19 mhz(mhz_serial);
DHT dht(DHT_PIN, DHT_TYPE);

//Readings
float co2Readings[ROLLING_READING_SIZE];
float tempReadings[ROLLING_READING_SIZE];
float humidityReadings[ROLLING_READING_SIZE];
unsigned int readingNumber = 0;

//Timing and counters
long lastSensorsReadMillis;
long lastResultSentMillis;
unsigned long resultNumber = 0;

void updateAWS(float ppm, float temp, float humidity, long readingNumber) {
  const size_t capacity = 3*JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(2);
  DynamicJsonBuffer jsonBuffer(capacity);
  
  JsonObject& root = jsonBuffer.createObject();
  JsonObject& state = root.createNestedObject("state");
  JsonObject& reported = state.createNestedObject("reported");
  reported["ppm"] = ppm;
  reported["temp"] = temp;
  reported["humidity"] = humidity;
  reported["readingNumber"] = readingNumber;

  char buffer[512];
  root.printTo(buffer, root.measureLength()+1);

  awsThing.sendState(buffer);
}

void pushOntoArray(float *arr, float val) {
  for (int i = ROLLING_READING_SIZE-1; i > 0; i--) arr[i] = arr[i-1];
  arr[0] = val;
}

float averageArrayValues(float *arr, int readings) {
  if (readings <= 0) return NULL;
  float total = 0;
  for (int i = 0; i < readings; i++) total += arr[i];
  return total / readings;
}

void getSensorReadings() {
  bool validResult = mhz.getReading();
  if (!validResult) return;
  readingNumber++;
  pushOntoArray(co2Readings, (float)mhz.getCO2());
  pushOntoArray(tempReadings, dht.readTemperature());
  pushOntoArray(humidityReadings, dht.readHumidity());

  Serial.print("Current - co2: ");
  Serial.print(co2Readings[0]);
  Serial.print(", temp: ");
  Serial.print(tempReadings[0]);
  Serial.print(", humidity: ");
  Serial.println(humidityReadings[0]);
  readingNumber++;
}

void setup() {
  Serial.begin(9600);

  //Setup WiFi
  wifi_set_sleep_type(NONE_SLEEP_T);
  WiFi.mode(WIFI_STA);
  WiFi.begin(STA_SSID, STA_PSK);
  while (WiFi.status() == WL_CONNECTED);
  Serial.println("Connected");

  //Start Sensors
  mhz_serial.begin(9600);
  delay(1000);
  mhz.setRange(MHZ19_PPM);
  dht.begin();

  //Setup AWS Connection
  awsWS.setAWSRegion(aws_region);
  awsWS.setAWSDomain(aws_endpoint);
  awsWS.setAWSKeyID(aws_key);
  awsWS.setAWSSecretKey(aws_secret);
  awsWS.setUseSSL(true);

  //Clear out readings arrays
  memset(co2Readings, 0, ROLLING_READING_SIZE);
  memset(tempReadings, 0, ROLLING_READING_SIZE);
  memset(humidityReadings, 0, ROLLING_READING_SIZE);

  //Default timers
  lastResultSentMillis = millis();
  lastSensorsReadMillis = millis();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    awsThing.loop();
  }
  
  long currentMillis = millis();
  
  if (currentMillis - lastSensorsReadMillis > READING_DELAY_MILLIS) {
    getSensorReadings();
    lastSensorsReadMillis = currentMillis;
  }
  
  if (currentMillis - lastResultSentMillis > 60000) {
    int readings = readingNumber > ROLLING_READING_SIZE ? ROLLING_READING_SIZE : readingNumber;

    float co2Average = averageArrayValues(co2Readings, readings);
    float tempAverage = averageArrayValues(tempReadings, readings);
    float humidityAverage = averageArrayValues(humidityReadings, readings);

    Serial.print("Sending - co2: ");
    Serial.print(co2Average);
    Serial.print(", temp: ");
    Serial.print(tempAverage);
    Serial.print(", humidity: ");
    Serial.println(humidityAverage);
     
    updateAWS(co2Average, tempAverage, humidityAverage, resultNumber);
    readingNumber = 0;
    resultNumber++;

    lastResultSentMillis = currentMillis;
  }
}
