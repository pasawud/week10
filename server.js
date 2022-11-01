var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var fs = require('fs');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// read from file to user
//ทำให้สมบูรณ์
app.get('/inmsg', async (req, res) => {
  let readdata = await readMsg();
  res.send(readdata);
})

//from user, write data to file
//ทำให้สมบูรณ์
app.post('/outmsg', async (req, res) => {
const newMessage = req.body;
let readFileMessage = await readMsg();
let updateFileMessage = await updateMsg(newMessage,readFileMessage);
let writeFileMessage = await writeMsg(updateFileMessage);
res.send(writeFileMessage);
//console.log(writeFileMessage);
      
})

// read json data from file
//ทำให้สมบูรณ์
const readMsg = () => {
  return new Promise((resolve, rejects) => {
    fs.readFile('log.json', 'utf-8', (err, data) => {
        if (err)
            rejects(err);
        else {
            console.log(data);
            resolve(data);
        }
    });
})
} 

// update json data
//ทำให้สมบูรณ์
const updateMsg = (new_msg, data1) => {
  return new Promise((resolve,rejects) => {
    let newdata = JSON.parse(data1);
    newdata.dataMsg.push(new_msg);
    resolve(JSON.stringify(newdata));
  })
  
}

// write json data to file
//ทำให้สมบูรณ์
const writeMsg = (data) => {
  return new Promise((resolve,rejects) => {

    fs.writeFile('log.json',data,(err)=>{
        if(err)
        rejects(err);
        else
        outputdata = data;
        //console.log(outputdata);
        resolve(data);

    });
})
}

var server = http.listen(3001, () => {
  console.log('server is running on port http://localhost:'+ server.address().port);
});