
#include <Arduino.h>
#include <ArduinoJson.h>
#include "IoT.h"
#include "WifiManager.h"

#include "WifiSettings.h"  //update to your wifi settings
#include "IoTSettings.h"   //update to your AWS IoT settings

#define PWM_PIN D3
#define PPM_RESOLUTION 5000

WifiManager wifiManager(STA_SSID, STA_PSK);
IoT awsThing(THING_NAME, aws_endpoint, aws_key, aws_secret, aws_region);

volatile unsigned long upPulse = 0;
volatile unsigned long lastPulse = 0;

long lastMillis;

int currentPPM = 0;

void updateAWS(int ppm) {
  const size_t capacity = 3*JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(2);
  DynamicJsonBuffer jsonBuffer(capacity);
  
  JsonObject& root = jsonBuffer.createObject();
  JsonObject& state = root.createNestedObject("state");
  JsonObject& reported = state.createNestedObject("reported");
  reported["ppm"] = ppm;

  char buffer[512];
  root.printTo(buffer, root.measureLength()+1);

  awsThing.sendState(buffer);
}

void updatePPM(int PPM) {
  if (PPM != currentPPM) {
    currentPPM = PPM;
    updateAWS(currentPPM);
  }
}

void ISR() {
  bool pinVal = digitalRead(PWM_PIN);
  if (pinVal == HIGH) {
    upPulse = micros();
    return;
  }
  lastPulse = micros() - upPulse;
}

int getPPM() {
  double th = lastPulse;
  double tl = 1004000.0 - th;
  return (int)(PPM_RESOLUTION * (th-2000)/(th+tl-4000));
}

void setup() {
  pinMode(PWM_PIN, INPUT);
  attachInterrupt(digitalPinToInterrupt(PWM_PIN), ISR, CHANGE);

  wifi_set_sleep_type(NONE_SLEEP_T);
  wifiManager.setup();

  awsThing.setup();
  
  lastMillis = millis();
}

void loop() {
  wifiManager.loop();
  if (wifiManager.status() == WL_CONNECTED) {
    awsThing.loop();
  }
  
  long currentMillis = millis();
  if (currentMillis - lastMillis < 60000) return;
  
  lastMillis = currentMillis;

  updatePPM(getPPM());

}
