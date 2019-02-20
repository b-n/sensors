#include "IoT.h"

void IoT::setup() {
  awsWSclient->setAWSRegion(region);
  awsWSclient->setAWSDomain(ep);
  awsWSclient->setAWSKeyID(key);
  awsWSclient->setAWSSecretKey(secret);
  awsWSclient->setUseSSL(true);
}

void IoT::loop() {
  if (!mqttclient->connected()) {
    if (connectToMQTT()) {
      Serial.println("Connected to MQTT");
      subscribeToTopics();
      if (connectedCallback != NULL) connectedCallback();
    }
  }

  if (mqttclient->connected()) {
    mqttclient->loop();
  }
}

bool IoT::connectToMQTT() {  
  if (mqttclient->connected()) mqttclient->disconnect();

  mqttclient->setServer(ep, port);
  char *clientId = generateClientID();
  bool connected = mqttclient->connect(clientId);
  
  if (!connected) {
    Serial.print("failed to connect to MQTT, state=");
    Serial.println(mqttclient->state());
  }

  return connected;
}

void IoT::subscribeToTopics() {
  mqttclient->setCallback(callback);

  Serial.println("Subscribed to:");
  for (int i = 0; i < 5; i++) {
    Serial.println(topics[i]);
    mqttclient->subscribe(topics[i]);
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
  mqttclient->publish(publishTopic, state);
}

void IoT::getState() {
  mqttclient->publish(getTopic, "");
}


char* IoT::generateClientID() {
  char* cID = new char[23]();
  for (int i=0; i<22; i+=1)
    cID[i]=(char)random(1, 256);
  return cID;  
}
