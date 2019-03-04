#ifndef WifiManager_h
#define WifiManager_h

#include <ESP8266WiFi.h>

class WifiManager {
  public:
    WifiManager(char *ssid, char *psk) : ssid(ssid), psk(psk) {
      wifiStatus = WiFi.status();
    };
    void setup();
    void loop();
    wl_status_t status();

  private:
    char *ssid, *psk;
    wl_status_t wifiStatus;
    bool connecting = false;
    void setClock();
};

#endif
