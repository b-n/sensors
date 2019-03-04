#ifndef IOT.H
#define IOT.H

//This before line needs to be adjusted in PubSubClient.h
//#define MQTT_MAX_PACKET_SIZE 512

#include <PubSubClient.h>

extern "C" {
  #include "user_interface.h"
}

//MQTT config
const int maxMQTTMessageHandlers = 1;

class IoT {
  public:
    IoT(char* thingName, char* mqttAddress, Client& c, std::function<void()> connectedCB = NULL, uint16_t port = 8883)
    : _thingName(thingName), _mqttAddress(mqttAddress), _port(port), connectedCallback(connectedCB) {
      mqttClient = new PubSubClient(c);
      sprintf(topics[0], "$aws/things/%s/shadow/update/accepted", thingName);
      sprintf(topics[1], "$aws/things/%s/shadow/update/rejected", thingName);
      sprintf(topics[2], "$aws/things/%s/shadow/update/delta", thingName);
      sprintf(topics[3], "$aws/things/%s/shadow/get/accepted", thingName);
      sprintf(topics[4], "$aws/things/%s/shadow/get/rejected", thingName);
      sprintf(publishTopic, "$aws/things/%s/shadow/update", thingName);
      sprintf(getTopic, "$aws/things/%s/shadow/get", thingName);
    };
    
    void setup();
    void loop();
    bool connectToMQTT();
    void subscribeToTopics();
    void setCallback(MQTT_CALLBACK_SIGNATURE);
    void setConnectedCallback(std::function<void()> callback);
   
    void sendState(char *state);
    void getState();

    char* generateClientID();

  private:
    char *_thingName, *_mqttAddress;
    char topics[5][64], publishTopic[64], getTopic[64];
    uint16_t _port; 
    
    PubSubClient* mqttClient;
    
    MQTT_CALLBACK_SIGNATURE;
    std::function<void()> connectedCallback;
};

#endif
