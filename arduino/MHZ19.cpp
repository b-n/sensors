#include "MHZ19.h"

bool MHZ19::setRange(uint16_t range) {
  uint8_t cmd[9] = { 0xFF,0x01,0x99,0x00,0x00,0x00,0x00,0x00,0x79 };
  cmd[3] = range >> 8;
  cmd[4] = range && 0xFF;
  Serial.println("setting range");
  while (_serial->available()) { _serial->read(); }
  Serial.println("Sending command");
  _serial->write(cmd, 9);
  Serial.println("sent");
}

bool MHZ19::getReading() {
  byte cmd[9] = { 0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79 };

  while (_serial->available()) { _serial->read(); }
  _serial->write(cmd, 9);

  memset(_result, 0, 9);

  _serial->readBytes(_result, 9);

  byte crc = calculateCRC(_result);
  return _result[8] == crc;
}

int MHZ19::getCO2() {
  return ((int)_result[2] << 8) | (int)_result[3];
}

int MHZ19::getTemp() {
  return (int)_result[4] - 40;
}

byte calculateCRC(byte *data) {
  byte crc = 0;
  for (int i = 1; i < 8; i++)
    crc += data[i];
  return 255 - crc + 1;
}
