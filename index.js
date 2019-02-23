require('dotenv').config();
bodyParser =require('body-parser');
express = require("express");
app = express();
app.use((req,res,next)=>{
  console.log(req.method+" "+req.path +" "+ req.ip)
  next()
})

app.listen("3000");
app.use(express.static("views"));
app.use(bodyParser.urlencoded({extended:false}))
app.get("/", (req, res) => {
  
});

app.get("/json", (req, res) => {
  if( process.env.MESSAGE_STYLE == "uppercase"){
    res.json({ message: "HELLO WORLD" });
  }
  else{
    res.json({ message: "Hello World" });
  }
});
app.post("/json",(req,res)=>{
  res.json({"message":"WoooHooo"})
});
app.get("/new",(req,res,next)=>{
  req.time = new Date().toString();
  next();
},(req,res,next)=>{
  res.send(req.time)
});
app.get('/echo/:word',(req,res)=>{
  res.json({"echo":req.params.word})
})

app.route("/name").get((req,res)=>{
res.json({"name":req.query.first+" "+req.query.last})
}).post((req,res)=>{res.json({"name":req.body.first+" "+req.body.last})});
