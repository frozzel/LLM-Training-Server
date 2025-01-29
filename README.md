<div>
<a href=""><img src="https://github.com/frozzel/LLM-Training-Server/blob/28aa285985a8fde97537d617d0ace899047476a0/chatgptbanner.webp" align="center" height="" width="100%" ></a></div>

# Node.js Server for Training LLMs with OpenAI API

👋 Welcome to the Node.js server repository for testing and training Large Language Models (LLMs) utilizing OpenAI's ChatGPT API. This server acts as a flexible platform to interact with and extend language model functionalities through various testing and training protocols.

## ✨ Features ✨

- **Seamless Integration**: Easily interact with OpenAI's ChatGPT API.
- **Extensibility**: Designed to add new endpoints and features with minimal effort.
- **Logging and Monitoring**: Includes basic logging to monitor API requests and responses.
- **Configurable**: Customizable settings for API keys and server configurations.

## 🚀 Getting Started 🚀

Follow these instructions to get your server up and running.

### Prerequisites

- Node.js (>= version 14.x)
- npm (comes packaged with Node.js)
- OpenAI API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/frozzel/LLM-Training-Server.git
   cd LLM-Training-Server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**



> [!IMPORTANT] 
> Create a `.env` file in the root directory and add your API keys and other configurations. Here's a template for the `.env` file:




   ```env
    MONGODB_URI=mongodb://127.0.0.1:27017/test
    OPENAI_API_KEY=YOurKey
    ASSISTANT_ID=GET_API_ROUTE
    THREAD_ID=GET_API_ROUTE
   ```



4. **Start the server nodemon**

   ```bash
   npm run dev
   ```

> [!NOTE] 
> The server will be running at `http://localhost:8080`.

## Usage

### Endpoints

- **GET /api/train/query**

  Send messages to the ChatGPT API. Create New Assistants, new threads, begin training and testing on your gpt assistant

  **Request Body:**

  Each Route Has an HTML Response for Chrome Browser and Json Response in console of terminal. Example:

  ```json
  {
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Hello, how can I use your API service?"
      }
    ]
  }
  ```

  **Response:**

  The server will return the response from the ChatGPT model.

### Customization

🛠️ Feel free to add more endpoints or modify the current ones. The server's architecture supports easy integration with additional AI models or services.

## Contributing

  Created by: 👽[@frozzel](https://github.com/frozzel)
  
  Please contact me with questions at: [@frozzel](mailto:frozzel@me.com)

## License

  [![Github license](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
