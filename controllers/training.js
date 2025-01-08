const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

////////////////// testApi function ///////////////////////////
exports.testApi = (req, res) => {
    res.send(`<body style="background: black; display: flex">
        <div style="width: 30%; height: auto"></div>
        <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
        <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   Training Routes   👽</h1> \n 
        </div><div style="width: 30%; height: auto"></div>
        </body>`);
};

///////////////////////// Create Assistant function //////////////////////////////
// Create an AI assistant that can be used to interact with users. ///////////////
// The assistant will be able to respond to messages and provide information. ///
// The assistant will be able to provide information on a variety of topics. ////
// The assistant will be able to answer questions and provide assistance. //////
///////////////////////////////////////////////////////////////////////////////

exports.createAssistant = async (req, res) => {
    console.log('Create Assistant');
    const assistant = await openai.beta.assistants.create({
      name: "Insurance Agent",
      instructions: "Lets Role Play, Your an AI insurance agent for Insurapro company, we provide auto insurance in all 50 states, you call yourself Arwin ",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o"
    });
    console.log(assistant);
    res.send(`<body style="background: black; display: flex">
      <div style="width: 30%; height: auto"></div>
      <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
      <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   AI Assistant Routes   👽</h1> \n 
      <h2 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">${assistant.id}</h2>
      </div><div style="width: 30%; height: auto"></div>
      </body>`)
}

/////////////////// Create Thread function ////////////////////////////////
// Create a thread that can be used to store messages and responses. //////
// The thread will be used to keep track of conversations with users. /////
// The thread will be used to store information and provide context. //////
// The thread will be used to manage interactions with the AI assistant. //
///////////////////////////////////////////////////////////////////////////

exports.createThread = async (req, res) => {
  const thread = await openai.beta.threads.create();
  console.log(thread);
  res.send(`<body style="background: black; display: flex">
    <div style="width: 30%; height: auto"></div>
    <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
    <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   AI Thread Routes   👽</h1> \n 
    <h2 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">${thread.id}</h2>
    </div><div style="width: 30%; height: auto"></div>
    </body>`)
}

//////////////////////////// Api Message Testing setup //////////////////////////////////
// Create a message that can be used to test the AI assistant. //////////////////////////
// The message will be used to test the AI assistant's ability to respond. //////////////
// The message will be used to test the AI assistant's ability to provide information. //
// The message will be used to test the AI assistant's ability to answer questions. ////
////////////////////////////////////////////////////////////////////////////////////////

exports.createMessage = async (req, res) => {
  const message = await openai.beta.threads.messages.create(
    process.env.THREAD_ID,
    {
      role: "user",
      content: "Im looking for information on auto insurance for my 2019 Toyota Camry in California, whats your name?, what company do you work for?"
    }
    );
    
  console.log(message);
  res.send(`<body style="background: black; display: flex">
    <div style="width: 30%; height: auto"></div>
    <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
    <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   AI Message Routes   👽</h1> \n 
    <h2 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">${message}</h2>
    </div><div style="width: 30%; height: auto"></div>
    </body>`)
}

// /////////////////////////////// Run Api For AI Response ///////////////////////////////
// Create a message that can be used to test the AI assistant. ///////////////////////////
// The message will be used to test the AI assistant's ability to respond. ///////////////
// The message will be used to test the AI assistant's ability to provide information. //
// The message will be used to test the AI assistant's ability to answer questions. ////
////////////////////////////////////////////////////////////////////////////////////////

exports.getAiResponse = async (req, res) => {
  let run = await openai.beta.threads.runs.createAndPoll(
    process.env.THREAD_ID,
    { 
      assistant_id: process.env.ASSISTANT_ID,
      instructions: "Please address the with your name Arwin and provide a informative response",
    },
    {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Lets Role Play, Your an AI insurance agent for Insurapro company, we provide auto insurance in all 50 states, you call yourself Arwin ",
        }
      ]
    }
    );
    console.log(run);
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );
      let response = '';
      for (const message of messages.data.reverse()) {
        response += `${message.role} > ${message.content[0].text.value}\n`;
        console.log(`${message.role} > ${message.content[0].text.value}`);
      }
      res.send(`<body style="background: black; display: flex">
      <div style="width: 30%; height: auto"></div>
      <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
      <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   AI Response   👽</h1>  
      <h2 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">${response}</h2>
      </div><div style="width: 30%; height: auto"></div>
      </body>`)
      } else {
      console.log(run.status);
      }
  }
    