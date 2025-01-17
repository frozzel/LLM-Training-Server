const WebSocket = require("ws");


////////////// Test Socket Routes ///////////// 
exports.testApi = (req, res) => {
    console.log('🚀 Socket Routes Test 🚀' );
    res.send(`<body style="background: black; display: flex">
        <div style="width: 30%; height: auto"></div>
        <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
        <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   Socket Routes   👽</h1> \n 
        </div><div style="width: 30%; height: auto"></div>
        </body>`);
};

////////////// Socket Server /////////////
const url = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17";
const ws = new WebSocket(url, {
  headers: {
    "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
    "OpenAI-Beta": "realtime=v1",
  },
});

ws.on("open", function open() {
  console.log("Connected to server.");
});

ws.on("message", function incoming(message) {
  console.log(JSON.parse(message));
});

// const message = {
//     type: "message",
//     content: "Hello, world!",
//   };
//   ws.on("message", function incoming(message) {
//     // ws.send(JSON.stringify(message));
//    const serverEvent = JSON.parse(message)
//     ws.send(JSON.stringify(message));
//     console.log("Sent message to server.");
//     console.log("Message ", message);
//     console.log("Server Event ", serverEvent);
//   });
  
// // Server-sent events will come in as messages...
ws.on("message", function incoming(message) {
    // Message data payloads will need to be parsed from JSON:
    const serverEvent = JSON.parse(message)
    console.log("Second", serverEvent);

  });
  
//   // To send events, create a JSON-serializeable data structure that
  // matches a client-side event (see API reference)
  // const event = {
  //   type: "response.create",
  //   response: {
  //     modalities: ["audio", "text"],
  //     instructions: "Give me a haiku about code.",
  //   }
  // };
  //   ws.send(JSON.stringify(event));
  // });
