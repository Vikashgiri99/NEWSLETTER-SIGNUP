const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname +"/signup.html");
})

app.post('/', function(req, res) {

   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email = req.body.email;

   const data = {
    members: [{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName,

      }
    }]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/0c5da64c00";

   const options = {
    method: 'POST',
    auth:"vikash:294cd95165f1dba09d4dc22b7e83868a-us21"
   }

  const request =  https.request(url,Option,function(response){

      if(response.statusCode === 200){
        res.sendFile(__dirname+"/sucess.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }

    response.on('data',function(data){
      console.log(JSON.parse(data));
    });
   });

   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
     res.redirect("/")
});

app.listen(process.env.PORT || 3000,function(){
console.log("Server is started in port 3000");
});


// Api Key @Mailchamp
// 294cd95165f1dba09d4dc22b7e83868a-us21

// audiance id
// 0c5da64c00