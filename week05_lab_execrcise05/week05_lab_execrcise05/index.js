const express = require('express');
const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  const filePath = path.join(__dirname, 'home.html');
  res.sendFile(filePath);
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: false, message: 'Internal Server Error' });
      return;
    }

    const userData = JSON.parse(data);
    res.json(userData);
  });
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
  const { username, password } = req.query;
  const user = userData.find((user) => user.username === username && user.password === password);

  if (user) {
    res.json({
      status: true,
      message: "User is valid"
    });
  } else if (!username) {
    res.json({
      status: false,
      message: "Username is not valid"
    });
  } else {
    res.json({
      status: false,
      message: "Password is not valid"
    });
  }
});
router.get('/login', (req,res) => {
  res.send('This is the login router');
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logged out.</b>`);
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));