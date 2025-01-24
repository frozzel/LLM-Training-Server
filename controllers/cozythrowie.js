//////////// Cozy Throwie Controller ///////////////


///////////// Importing Dependencies ///////////////
const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

//////////////// testApi function ///////////////////////////
exports.testApi = (req, res) => {
    res.send(`<body style="background: black; display: flex">
        <div style="width: 30%; height: auto"></div>
        <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
        <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   Cozy Throwie Routes   👽</h1> \n 
        </div><div style="width: 30%; height: auto"></div>
        </body>`);
};

//////////////// Get Cozy Blogs function ///////////////////////////

exports.getCozyBlogs = async (req, res) => {
    console.log('Getting Cozy Blogs');
    
    res.json({ message: 'Getting Cozy Blogs' });
}

//////////////// Create Cozy AI Assistant function ////////////////
/// Save the assistant id to the env for future reference /////////
///////////////////////////////////////////////////////////////////

exports.createAssistant = async (req, res) => {
    const trainingData = "You are a content creator for Cozy Throwie, a blog that focuses on cozy living, home decor, and lifestyle. You are responsible for creating engaging content that resonates with your audience. Your goal is to create content that inspires and informs your readers. You are passionate about creating a warm and inviting space for your readers to relax and unwind. You are dedicated to providing valuable information and resources that help your readers live a cozy and comfortable life. You blogs will include links to Amazon products, and you will earn a commission on any sales generated through your blog. You are excited to share your love of cozy living with your readers and help them create a warm and inviting space in their own homes. Each Blog Will start with a Title, a summary description, feature photo, followed by Sections which include a paragraph of text, a photo, and a links to an Amazon products. All photos should be 16:9 aspect ratio and high quality. You will also create social media post for Facebook, Instagram, X (Twitter) and Pinterest. Please include any applicable tags keep inline with each platforms content requirements.  Return your results in this JSON format: {titleMain: 'Title', descriptionSummary: 'Description', featuredPhoto: 'Photo', facebook: {text: 'Text', photo: photo}, instagram: {text: 'Text', photo: 'Photo'}, twitter: {text: 'Text', photo: 'Photo'}, pinterest: {text: 'Text', photo: 'Photo'} sections: [{title: 'Title', description: 'Description', photo: 'Photo', links: ['Link1', 'Link2']}]}";

    console.log('Create Assistant');
    const assistant = await openai.beta.assistants.create({
      name: "Insurance Agent",
      instructions: trainingData,
    //   tools: [{ type: "code_interpreter" }],
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

//////////////////////////// Api Message Testing setup //////////////////////////////////
// Create a message that can be used to test the AI assistant. //////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

exports.createMessage = async (req, res) => {
    const message = await openai.beta.threads.messages.create(
        process.env.COZY_THREAD_ID,
        {
            role: "user",
            content: "The Links and Photos are not real can we fix this?"
        });
        console.log(message);
        res.send(`<body style="background: black; display: flex">
            <div style="width: 30%; height: auto"></div>
            <div style="display: flex-column; position: relative; top: 25%; width: 100%; height: 15%; box-shadow: 0 0 3px 2px #0fa; padding: 1em; border-radius: 8px;">
            <h1 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">👽   AI Message Routes   👽</h1> \n 
            <h2 style="text-align: center; color: white; text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa">${message}</h2>
            </div><div style="width: 30%; height: auto"></div>
            </body>`)
 }

// ////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////// Run Api For AI Response ///////////////////////////////
// Create a message that can be used to test the AI assistant. ///////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


exports.getAiResponse = async (req, res) => {
    const trainingData = "You are a content creator for Cozy Throwie, a blog that focuses on cozy living, home decor, and lifestyle. You are responsible for creating engaging content that resonates with your audience. Your goal is to create content that inspires and informs your readers. You are passionate about creating a warm and inviting space for your readers to relax and unwind. You are dedicated to providing valuable information and resources that help your readers live a cozy and comfortable life. You blogs will include links to Amazon products, and you will earn a commission on any sales generated through your blog. You are excited to share your love of cozy living with your readers and help them create a warm and inviting space in their own homes. Each Blog Will start with a Title, a summary description, feature photo, followed by Sections which include a paragraph of text, a photo, and a links to an Amazon products. All photos should be 16:9 aspect ratio and high quality. You will also create social media post for Facebook, Instagram, X (Twitter) and Pinterest. Please include any applicable tags keep inline with each platforms content requirements.  Return your results in this JSON format: {titleMain: 'Title', descriptionSummary: 'Description', featuredPhoto: 'Photo', facebook: {text: 'Text', photo: photo}, instagram: {text: 'Text', photo: 'Photo'}, twitter: {text: 'Text', photo: 'Photo'}, pinterest: {text: 'Text', photo: 'Photo'} sections: [{title: 'Title', description: 'Description', photo: 'Photo', links: ['Link1', 'Link2']}]}";

    let run = await openai.beta.threads.runs.createAndPoll(
      process.env.COZY_THREAD_ID,
      { 
        assistant_id: process.env.COZY_ASSISTANT_ID,
        instructions: trainingData,
      },
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: trainingData,
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