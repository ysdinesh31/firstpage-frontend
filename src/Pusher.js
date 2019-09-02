import Pusher from "pusher-js";

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

export var pusher = new Pusher("51b5fb6fe857da9a50c3", {
  cluster: "ap2",
  forceTLS: true,
  authEndpoint: "http://localhost:8000/login/authBroadcast"
});

// var channel = pusher.subscribe("private-TaskCreateChannel.1");

// channel.bind("App\\Events\\TaskCreateEvent", () => {
//   console.log("Task Created!");
// });

export * from "./Pusher";
