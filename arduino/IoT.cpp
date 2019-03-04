#include "IoT.h"

void IoT::setup() {
}

void IoT::loop() {
  if (!mqttClient->connected()) {
    if (connectToMQTT()) {
      Serial.println("Connected to MQTT");
      subscribeToTopics();
      if (connectedCallback != NULL) connectedCallback();
    }
  }

  if (mqttClient->connected()) {
    mqttClient->loop();
  }
}

bool IoT::connectToMQTT() {  
  if (mqttClient->connected()) mqttClient->disconnect();

  mqttClient->setServer(_mqttAddress, _port);

  char *clientId = generateClientID();
  Serial.println(ESP.getFreeHeap());
  bool connected = mqttClient->connect(clientId);

  if (!connected) {
    Serial.print("failed to connect to MQTT, state=");
    Serial.println(mqttClient->state());
  }

  return connected;
}

void IoT::subscribeToTopics() {
  mqttClient->setCallback(callback);

  Serial.println("Subscribed to:");
  for (int i = 0; i < 5; i++) {
    Serial.println(topics[i]);
    mqttClient->subscribe(topics[i]);
  }
  Serial.println("MQTT subscribed");
}

void IoT::setCallback(MQTT_CALLBACK_SIGNATURE) {
  this->callback = callback;
}

void IoT::setConnectedCallback(std::function<void()> callback) {
  this->connectedCallback = callback;
}

void IoT::sendState(char *state) {
  mqttClient->publish(publishTopic, state);
}

void IoT::getState() {
  mqttClient->publish(getTopic, "");
}


char* IoT::generateClientID() {
  char* cID = new char[23]();
  for (int i=0; i<22; i+=1)
    cID[i]=(char)random(32, 126);
  return cID;  
}
