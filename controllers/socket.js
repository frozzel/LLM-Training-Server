

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