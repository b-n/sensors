#include "WifiManager.h"

void WifiManager::setup() {
  WiFi.mode(WIFI_STA);
}

void WifiManager::loop() {
  wifiStatus = WiFi.status();
  if (wifiStatus != WL_CONNECTED) {
    if (!connecting) {
      Serial.println("connecting to wifi");
      WiFi.begin(ssid, psk);
      connecting = true;
    }
  }
  if (connecting && wifiStatus == WL_CONNECTED) {
    Serial.printf("WiFi connected to %s\n", ssid);
    connecting = false;
  }
}

wl_status_t WifiManager::status() {
  return wifiStatus;
}
