const express = require("express");

const path = require("path");
const app =express();
const port = process.env.PORT || 3005;
const ejs=require('ejs');
const hbs = require("hbs");
var cons=require("consolidate");
require("./db/conn");



const Register= require("./models/user");
const useracc= require("./models/acc");
const { json } = require("express");


const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");



var bodyParser = require('body-parser');
const { config } = require("process");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))


app.set("view engine", "hbs");
app.set("views",template_path);

hbs.registerPartials( partial_path)

app.get("/", (req,res) => {
    res.render("index.hbs"); 
});
app.get("/logout",(req,res)=>{
  res.redirect("/");
});
app.get("/register", (req,res) => {
    res.render("register.hbs");
});
app.get("/transfer", (req,res) => {
  res.render("transfer.hbs");
});
app.get("/transferred", (req,res) => {
  res.render("transferred.hbs");
});
app.post("/transfer", (req,res) => {
  res.render("transfer.hbs");
});




 
 



 
 



app.get("/balance",(req,res,next)=>{

  req.app.set('view engine', 'ejs')
});






app.get("/login", (req,res) => {
  res.render("login.hbs");
});
    
  app.get("/succ", (req,res) => {
  res.render("succ.hbs");
});



app.post("/register", async(req, res) => {
  try {
    const password =req.body.password;
    const copassword =req.body.cpassword;
    const acno=req.body.accn;
   var accountNo = await useracc.findOne({accno:acno});
console.log(accountNo.accno)
   if ( accountNo.accno == acno)
   {
    if(password===copassword) 
    {
    var myData = new Register(req.body);
    
    myData.save()
      .then(item => { 
      res.render("login.hbs");
     })
      .catch(err => { 
        console.log(err);
        res.status(400).send("Email or phone number already exists");
      });
    }
    else
    {
      res.send("Password does not match.");
    
    }
  }else{

    res.send("Account number does not exists.");
  }
  } catch (error) {
    
      res.send("Invalid account number");
      location.reload()
  }
  
    
  




  });

  app.post( "/login",async(req,res) =>  {
try {
  const accno= req.body.accno;
  const password=req.body.password;

  var userMail = await Register.findOne({accn:accno});
  global.z=userMail.accn;

if(userMail.password===password)
{
global.x=userMail.accn;

  res.status(201).render("succ.hbs");
 
}
else
{
  res.status(400).send("invalid credentials")
}
} catch (error) {
 res.status(201).send("Invalid credentials")
}
  });
    
app.post("/balance", (req,res) => {
  req.app.set('view engine', 'ejs');

useracc.find({accno:x }, function(err,accs){
  console.log(x);
  res.render("balance.ejs",{
    userList:accs
});
})
    
});


app.post("/transferred", async(req,res,next) => {
  var raccno=parseFloat(req.body.accno)  ;
  console.log("1.",raccno);
  var aamount=parseFloat(req.body.amount);
console.log("2",aamount)
  var accountNo1 = await useracc.findOne({accno:raccno});

 
 
 try {
  if ( accountNo1.accno === raccno)
  {
   
      var w=await useracc.findOne({accno:x})
      console.log("5.",w.accno)
     
      var r=await useracc.findOne({accno:raccno})
      var t=r.amount;

     var y=w.amount;
     console.log(y < aamount)
    
     try {
      if ( y < aamount)
      {
        console.log("Balance",y < aamount)
        return res.status(400).send("Insufficient amount");
      }
      else
      {
        let result =await useracc.updateOne({amount:y},{$set:{amount:y-aamount}})
        
        let result1 =await useracc.updateOne({amount:t},{$set:{amount:t+aamount}})
        res.status(201).render("transferred.hbs");
      }
     } catch (error) {
      console.log(error)
     }
 
      
      
    
    /*
    res.send("ok")
  
   
   
    global.y=w.amount;
    try {
      if(y<1500)
      {
  res.send("Insufficient balance")
      }
     
    } catch (error) {
      res.send("Insufficient amount")
    }*/
   
    

    
  }
} catch (error) {
 res.send("No such account")
}

 
  

  

});




/*app.post("/register", async (req,res) => {
   try {
  
    const password =req.body.password;
    const copassword =req.body.cpassword;
    if(password === copassword)
    {
    const user = new Register({
   
    name: req.body.name,
    email:req.body.email,
    password:req.body.password,
    cpassword:req.body.cpassword,
    phone:req.body.phone
    });
    }else{
        res.send("not matching");
    }

 const registerd=await user.save();
 console.log(registered);
res.status(201).render("index")
} catch (error) {
    res.status(400).send(error);
   }
});*/


app.listen(port, () => {
    console.log( (port) );
})