const mongoose = require('mongoose');

//if database does not exist, it will create it. calling localhost was not working
// mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost:27017/fruitsDB", {
//     directConnection:true,
//     serverSelectionTimeoutMS:2000,
//     appName:"mongosh+1.9.0"
// });
// mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0");
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");


const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Needs a name"]
    },
    rating: {
        type: Number,
        min: [1, 'Too Low'],
        max: [10, 'Too High']
    },
    review: String
});

//this creates the document plan using the correct schema
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Keeps the doctors away."
});

// fruit.save();


//can add fruitschema into the personSchema to show relationships
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});


//this creates the document plan/collection
const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Angela",
    age: 37
});

const person2 = new Person({
    name: "John",
    age: 31
});



const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great Fruit."
});

pineapple.save();

const person3 = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
});
person3.save();

// person.save();

//how to delete

// Person.deleteMany({name: "John"}, function(err){
//     if (err) {
//         console.log(err);
//     } else{
//         console.log("John deleted");
//     }
// }

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Best fruit"
});
const banana = new Fruit({
    name: "Banana",
    rating: 6,
    review: "It's aight"
});
const tomato = new Fruit({
    name: "Tomato",
    rating: 1,
    review: "Not sure if even a fruit"
});

Fruit.updateOne({name: "Apple"}, {name: "Apple1"});
// Fruit.updateOne({_id: "6470f4e4e817cb1084dd8fbc"}, {name: "Apple1"});
// , function(err){
//     if (err){
//         console.log(err)
//     } else {
//         console.log("Successfully updated apples")
//     }
// });
// Fruit.insertMany([kiwi, banana, tomato]);

//no longer accepts a callback
Fruit.find({}).then(function(err, fruits){
    if (err){
        console.log(err);
    } else{
        console.log(fruits);
    }
    mongoose.connection.close();
    
    // fruits.forEach(function(fruit){
    //     console.log(fruit.name);
    // });
   
});


