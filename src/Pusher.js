import Pusher from "pusher-js";

// Enable pusher logging - don't include this in production
//Pusher.logToConsole = true;

var pusher = new Pusher("51b5fb6fe857da9a50c3", {
  cluster: "ap2",
  forceTLS: true
});

var channel = pusher.subscribe("TasktestChannel");

channel.bind("App\\Events\\TaskEvent", () => {
  alert("Hi!");
});

export * from "./Pusher";
