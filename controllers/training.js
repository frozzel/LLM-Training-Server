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

//////////////// Create Assistant function ///////////////////////////

exports.createAssistant = async (req, res) => {
    console.log('Create Assistant');
    let reponse = '';
    const assistant = await openai.beta.assistants.create({
      name: "Math Tutor",
      instructions: "You are a personal math tutor. Write and run code to answer math questions.",
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o"
    });
    console.log(assistant);
    const thread = await openai.beta.threads.create();
    console.log(thread);


    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
        role: "user",
        content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
        }
        );
        console.log(message);

    
        let run = await openai.beta.threads.runs.createAndPoll(
            thread.id,
            { 
              assistant_id: assistant.id,
              instructions: "Please address the user as Jane Doe. The user has a premium account."
            }
            );
            if (run.status === 'completed') {
                const messages = await openai.beta.threads.messages.list(
                  run.thread_id
                );
                // reponse = messages.data[messages.data.length - 1].content[0].text.value;
                for (const message of messages.data.reverse()) {
                  console.log(`${message.role} > ${message.content[0].text.value}`);
                
                }
                } else {
                console.log(run.status);
                }
   console.log(run);
   res.send(`<body style="background: black; display: flex">
        <div style="width: 30%; height: auto"></div>
        <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
        <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   Assistant Routes   👽</h1> \n 
        <h2 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">${reponse}</h2> \n
        </div><div style="width: 30%; height: auto"></div>
        </body>`)
}
// main();
    