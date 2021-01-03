const express=require("express");
const bodyParser=require("body-parser");
const date =require(__dirname +"/date.js"); //take iternally the day function
const app =express();
const mongoose=require("mongoose");
app.set('view engine','ejs');

var items=[];

// render 
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));
mongoose.connect("Link Of MongoDB Atlas",{useNewUrlParser:true});
const itemsSchema ={ //schema
name:String

};

const Item=mongoose.model("Item",itemsSchema); //collection 

const item1=new Item({
name:"Welcome to your todolist!"

});

const item2=new Item({
  name:"Hit the + button to add new item"
  
  });
  const item3=new Item({
    name:"<-- Hit this to delete an item"
    
    });
const defaultItems=[item1,item2,item3];


app.get("/",function(req,res){

var day=date(); // we moved our date code out of app.js and here we call the function day
//render list with two values
Item.find({},function(err,foundItems){
  if(foundItems.length===0){
    Item.insertMany(defaultItems,function(err){

      if(err){console.log(err);}
      else{
        console.log("Succesfully saved deafault items to db");
      }
      
      });
      res.redirect("/");
  }
  else{
res.render("list",{kindofday:day, newItems:foundItems}); //dictionary key value
  }
});
});


//handle the post request
app.post("/",function(req,res){  
  const itemName=req.body.newItem;
  const item=new Item({ //making a instance
name:itemName
  })

item.save(); // addinng it to collection
res.redirect("/");
});
app.post("/delete",function(req,res){ //delete route
const checkedItemId=req.body.checkbox;
Item.findByIdAndRemove(checkedItemId,function(err){
  if(!err){
    console.log("succesfully deleted");
    res.redirect("/");
  }
})
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
// app.listen(port);

//sending srver running confirmation
app.listen(port,function(){

console.log("server has started succesfully");


});