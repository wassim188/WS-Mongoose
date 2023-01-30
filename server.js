const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config()
const  Persons = require("./models/Person");



mongoose
  .connect(
    "mongodb+srv://MyApp:alert1999@cluster0.zjkcy7e.mongodb.net/MyApp?retryWrites=true&w=majority"
  )
  .then(() => console.log("DBS connected"))
  .catch((err) => console.log(err));

const addPersons = async () => {
    try {
        const newPerson = new Persons({
          name: "achref",
          age: 16,
          favoriteFoods: ["sapagheti", "Salade", "Broudou"],
        });
        const  person = await newPerson.save();
        console.log(person)
    } catch (error) {
        if(error) throw error;        
    }
};
//addPersons();

//Find one
Persons.findOne({ favoriteFoods: "Pizza" }, (err, data) => {
  if (err) throw err;
   //console.log(data)
});

//find by id

Persons.findById({ _id: "63d71209853bb848c5aebfd6" }, (err, data) => {
  if (err) throw err;
  //console.log(data)
});

//find and update by id 

Persons.findOneAndUpdate(
  { _id:"63d712320c7f6cb55dc3f38e" },
  { $push: { favoriteFoods: "hamburger" }},
  (err, data) => {
    if (err) throw err;
    
    //console.log(data);
  },
);

//find one and delete

Persons.findByIdAndRemove({ _id: "63d7126774ca4b430f5a6cad" }, (err) => {
  if (err) throw err;
  //console.log('Deleted successfully');
}); 
Persons.findById({ _id: "63d7126774ca4b430f5a6cad" }, (err, data) => {
  if (err) throw err;
  //console.log(data)
});

//delete many

Persons.deleteMany({name:'Mary'} ,(err)=>{
    if(err) throw err
   //console.log('Mary is deleted');
});

//removePerson

const removeAll = async () => {
  try {
    const result =await Persons.remove({ age: {$lt:20}});
    console.log(result);
  } catch (error) {
    if (err) throw  err;
    
  }
};
//removeAll();


//Chain Search Query

const findChain = async () => {
  try {
    const result = await Persons.find()
      .sort({ age: 1 })
      .limit(2)
      .sort({ firstName: 1 })
      .select({ age: true })
      .exec();
    console.log(result);
  } catch (error) {
    if (err) throw err;
  }
};
findChain();

app.listen(5000,(err) =>{
    if (err) throw err;
    console.log("server is up and running...")
})