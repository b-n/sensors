#ifndef MHZ19_h
#define MHZ19_h
#include <Arduino.h>
#include <SoftwareSerial.h>

byte calculateCRC(byte *data);

class MHZ19 {
  public:
    MHZ19(SoftwareSerial *serial) : _serial(serial) {}

    bool setRange(uint16_t range);
    bool getReading();
    int getCO2();
    int getTemp();

  private:
    SoftwareSerial *_serial;
    byte _result[9];
    int bytes2int(byte h, byte l);

    void sendCommand(byte *cmd);
};

#endif
