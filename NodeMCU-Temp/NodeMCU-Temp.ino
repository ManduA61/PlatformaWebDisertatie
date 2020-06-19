#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

#include "DHT.h"
#define DHTPIN 2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11   // DHT 11

DHT dht(DHTPIN, DHTTYPE);
ESP8266WiFiMulti WiFiMulti;

void setup() {

  Serial.begin(115200);
  // Serial.setDebugOutput(true);

  dht.begin();
  Serial.println();


  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP("DIGI-XMVG", "EYcF3mvd");

}

void loop() {
  // wait for WiFi connection
  if ((WiFiMulti.run() == WL_CONNECTED)) {

    WiFiClient client;

    HTTPClient http;

    delay(2000);

    float temp = dht.readTemperature();
  
    if (isnan(temp)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }

    Serial.print(F("Temperature: "));
    Serial.print(temp);
    Serial.print(F("°C "));
    Serial.println("");

    Serial.print("[HTTP] begin...\n");
    // http://localhost:3000/sensors/update/5e6e8725ff76ae223c2f42b5?sensor_param_1=500&sensor_param_2=6000
    Serial.print("http://jsonplaceholder.typicode.com/todos/1");
    if (http.begin(client, "http://platforma-online.herokuapp.com/sensors/update/5e6e8c0dd0015c33e8a529d7?sensor_param_1=" + String(temp) + "&sensor_param_2=13")) {  // HTTP

//5e6e8725ff76ae223c2f42b5
      Serial.print("[HTTP] GET...\n");
      // start connection and send HTTP header
      int httpCode = http.GET();

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTP] GET... code: %d\n", httpCode);

        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = http.getString();
          Serial.println(payload);
        }
      } else {
        Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }

      http.end();
    } else {
      Serial.printf("[HTTP} Unable to connect\n");
    }
  }

  delay(10000);
}
