require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Fredy",
    age: 19,
    favoriteFoods: ["Ndolè", "Riz", "Couscous Legumes"]
  });

  newPerson.save(function(err, data) {
    done(null , data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    done(null , data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, pers) {
    done(null, pers);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    done(null , data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person){
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, data) {
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updatedData) {
    done(null, updatedData);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data) {
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
  .find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: false})
  .exec(function(err, data) {
    done(err, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
