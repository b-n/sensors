#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <SoftwareSerial.h>
#include "IoT.h"
#include "WifiManager.h"
#include "MHZ19.h"

#include "WifiSettings.h"  //update to your wifi settings
#include "IoTSettings.h"   //update to your AWS IoT settings

#define MHZ19_RX D6
#define MHZ19_TX D7
#define ROLLING_READING_SIZE 12

WiFiClientSecure wifiClient;
WifiManager wifiManager(STA_SSID, STA_PSK);
IoT awsThing(THING_NAME, mqttServer, wifiClient);

SoftwareSerial mhz_serial(MHZ19_RX, MHZ19_TX, false, 256); 
MHZ19 mhz(&mhz_serial);

X509List cert(clientCert);
PrivateKey privateKey(clientPrivateKey);
X509List caCerts;

int co2Readings[ROLLING_READING_SIZE];
int tempReadings[ROLLING_READING_SIZE];

long lastSerialRead;
long lastMillis;

unsigned long resultNumber = 0;
unsigned int readingNumber = 0;

void updateAWS(int ppm, int temp, long readingNumber) {
  const size_t capacity = 3*JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(2);
  DynamicJsonBuffer jsonBuffer(capacity);
  
  JsonObject& root = jsonBuffer.createObject();
  JsonObject& state = root.createNestedObject("state");
  JsonObject& reported = state.createNestedObject("reported");
  reported["ppm"] = ppm;
  reported["temp"] = temp;
  reported["readingNumber"] = readingNumber;

  char buffer[512];
  root.printTo(buffer, root.measureLength()+1);

  awsThing.sendState(buffer);
}

void pushOntoArray(int *arr, int val) {
  for (int i = ROLLING_READING_SIZE-1; i > 0; i--) arr[i] = arr[i-1];
  arr[0] = val;
}

void getSerialReading() {
  bool validResult = mhz.getReading();
  if (!validResult) return;
  
  readingNumber++;
  pushOntoArray(co2Readings, mhz.getCO2());
  pushOntoArray(tempReadings, mhz.getTemp());
}

void setup() {
  Serial.begin(9600);
  mhz_serial.begin(9600);

  caCerts.append(rootCA1);
  caCerts.append(rootCA2);

  wifiClient.setTrustAnchors(&caCerts);
  wifiClient.setClientRSACert(&cert, &privateKey);

  wifi_set_sleep_type(NONE_SLEEP_T);
  wifiManager.setup();

  awsThing.setup();

  memset(co2Readings, 0, ROLLING_READING_SIZE);
  memset(tempReadings, 0, ROLLING_READING_SIZE);
  
  lastMillis = millis();
  lastSerialRead = millis();
}

void loop() {
  wifiManager.loop();
  if (wifiManager.status() == WL_CONNECTED) {
    awsThing.loop();
    Serial.println(wifiClient.getLastSSLError());
  }
  
  long currentMillis = millis();
  
  if (currentMillis - lastSerialRead > 5000) {
    getSerialReading();
    lastSerialRead = currentMillis;
  }
  
  if (currentMillis - lastMillis > 60000) {
    lastMillis = currentMillis;

    int readings = readingNumber > ROLLING_READING_SIZE ? ROLLING_READING_SIZE : readingNumber;

    int co2Average = average(co2Readings, readings);
    int tempAverage = average(tempReadings, readings);

    updateAWS(co2Average, tempAverage, resultNumber);
    readingNumber = 0;
    resultNumber++;
  }
}

int average(int *arr, int readings) {
  if (readings <= 0) return NULL;
  int total = 0;
  for (int i = 0; i < readings; i++) total += arr[i];
  return total / readings;
}
