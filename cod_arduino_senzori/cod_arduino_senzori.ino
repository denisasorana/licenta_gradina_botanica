#include <WiFi.h>
#include <WebServer.h>
#include <Adafruit_NeoPixel.h>
#include <DHT.h>

// === Config SoftAP ===
const char* ap_ssid     = "ESP32-AP";
const char* ap_password = "12345678";
// IP static pentru SoftAP
IPAddress apIP(192, 168, 10, 1);
IPAddress netMsk(255, 255, 255, 0);


// === Config NeoPixel ===
#define LED_PIN    5
#define NUMPIXELS 16
#define RELAY_PIN    18      // pinul conectat la releu


bool relayState = false;     
bool touchPrevState = false; 
bool pompaPornita = false;


#define DHT_PIN 21  
DHT dht(DHT_PIN, DHT22);


Adafruit_NeoPixel strip(NUMPIXELS, LED_PIN, NEO_GRB + NEO_KHZ800);
uint32_t UV_COLOR = strip.Color(166, 15, 247);

WebServer server(80);  // HTTP server pe portul 80 


void sendCORS() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
}

void handleOn() {
  sendCORS();
  strip.fill(UV_COLOR);
  strip.show();
  server.send(200, "text/plain", "LEDs on");
}

void handleOff() {
  sendCORS();
  strip.clear();
  strip.show();
  server.send(200, "text/plain", "LEDs off");
}

void handleTemperature() {
  sendCORS();
  float t = dht.readTemperature();
  if (isnan(t)) {
    server.send(500, "text/plain", "Error");
  } else {
    
    server.send(200, "text/plain", String(t, 1));
  }
}

void handleHumidity() {
  sendCORS();
  float h = dht.readHumidity();
  if (isnan(h)) {
    server.send(500, "text/plain", "Error");
  } else {
    server.send(200, "text/plain", String(h, 1));
  }
}


void handleIrigare() {
  sendCORS(); 
  Serial.println("Pornire pompa pentru 2 secunde...");
  
  digitalWrite(RELAY_PIN, LOW);  
  delay(2000);                   
  digitalWrite(RELAY_PIN, HIGH); 

  Serial.println("Pompa oprită.");
  server.send(200, "text/plain", "Pompa activată pentru 2 secunde");
}

void handlePompaOn() {
  sendCORS();
  digitalWrite(RELAY_PIN, LOW); 
  pompaPornita = true;
  Serial.println("Pompa PORNITA manual.");
  server.send(200, "text/plain", "Pompa pornita");
}

void handlePompaOff() {
  sendCORS();
  digitalWrite(RELAY_PIN, HIGH); 
  pompaPornita = false;
  Serial.println("Pompa OPRITA manual.");
  server.send(200, "text/plain", "Pompa oprita");
}

void handleOptions() {
 
  sendCORS();
  server.send(204);
}

void setup() {
  Serial.begin(115200);
  strip.begin();
  strip.show(); 

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH);  

  WiFi.softAPConfig(apIP, apIP, netMsk);

  WiFi.softAP(ap_ssid, ap_password);
  Serial.println("=== SoftAP mode ===");
  Serial.print("SSID: "); Serial.println(ap_ssid);
  Serial.print("IP:   "); Serial.println(WiFi.softAPIP());

  Serial.println("\nWiFi connected! IP: " + WiFi.localIP().toString());

  dht.begin();
  Serial.println("DHT22 inițializat.");
  
  strip.begin();
  strip.show();
 
  server.on("/brightness", HTTP_GET, []() {
  sendCORS();

  if (!server.hasArg("val")) {
    server.send(400, "text/plain", "Missing val param");
    return;
  }

  int brightness = server.arg("val").toInt();
  brightness = constrain(brightness, 0, 255);

  strip.setBrightness(brightness);

  if (brightness > 0) {
    strip.fill(UV_COLOR);  
  } else {
    strip.clear();        
  }

  strip.show();  
  Serial.printf("Set brightness: %d\n", brightness);

  server.send(200, "text/plain", "Brightness updated");
});


  server.on("/on",  HTTP_GET,    handleOn);
  server.on("/off", HTTP_GET,    handleOff);
  
  server.on("/temperature", HTTP_GET,    handleTemperature);
  server.on("/humidity",    HTTP_GET,    handleHumidity);
  server.on("/irigare",     HTTP_GET,    handleIrigare);
 
  server.on("/on",  HTTP_OPTIONS, handleOptions);
  server.on("/off", HTTP_OPTIONS, handleOptions);
  
  server.on("/temperature", HTTP_OPTIONS, handleOptions);
  server.on("/humidity",    HTTP_OPTIONS, handleOptions);

  server.on("/brightness", HTTP_OPTIONS, handleOptions);
  
  server.on("/irigare", HTTP_OPTIONS, handleOptions);

  server.on("/pompa/on",  HTTP_GET, handlePompaOn);
  server.on("/pompa/off", HTTP_GET, handlePompaOff);


  server.begin();
}

void loop() {
  server.handleClient();
  
}
