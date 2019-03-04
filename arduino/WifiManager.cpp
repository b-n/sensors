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
    this->setClock();
  }
}

void WifiManager::setClock() {
  // Set time via NTP, as required for x.509 validation
  configTime(3 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  Serial.print("Waiting for NTP time sync: ");
  time_t now = time(nullptr);
  while (now < 8 * 3600 * 2) {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));
}

wl_status_t WifiManager::status() {
  return wifiStatus;
}
