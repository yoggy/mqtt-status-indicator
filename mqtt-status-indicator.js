#!/usr/bin/env node
var mqtt = require('mqtt');
var mqtt_client = mqtt.connect({
  host: 'mqtt-pi.local',
  port: 1883,
});

var redis = require("redis");
var r = redis.createClient();

const execSync = require('child_process').execSync;

var st = new Date().getTime();
var count = 0;
var size = 0;

mqtt_client.on('connect', function() {
  mqtt_client.subscribe('#');
});

mqtt_client.on('message', function(topic, message) {
  count ++;
  size += message.toString().length
});

function aggregate() {
  if (count == 0) {
    log(3, "mqtt: 0(0kB/s)");
    return
  }

  var diff = (new Date().getTime() - st) / 1000.0;
  var t = diff / count;
  var mps = Math.round((1.0 / t) * 10) / 10.0;
  var bps = Math.round(((size / diff) / 1024) * 10) / 10.0;

  log(3, "mqtt:" + count + "(" + bps +"kB/s)");

  count = 0;
  size  = 0;
  st = new Date().getTime();
}

function log(idx, message) {
  console.log("" + idx + ": " + message);
  r.set("oled:" + idx, message)
}

function host_status() {
  log(0, execSync("hostname").toString().trim());

  ips = execSync("hostname -I").toString().trim().split(" ")
  
  for (var i = 0; i < ips.length; ++i) {
    log(i + 1, ips[i]);
  }
}

setInterval(aggregate, 1000);
setInterval(host_status, 3000);
aggregate();
host_status();

