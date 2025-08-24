# MongoDB and Mongoose

Here, we'll learn how to create schemas and models. <br>
also deeply understand how to use them in our NodeJS application !

## Schema and Model
- Schema :
to create a schema, we've to do something like
```js
let me = new mongoose.schema({
    name: String,
    age: Number,
    size: Number
});
```

- Model:
used to create a model like that
```js
const Me = mongoose.model("Me", me);
```

## Create and Save 
sometime, to save new document, we'll have to do something like

- model.save() :
used when we wanna create an instance of our model, it can optional take in argument a callback function.
```js
let newMe = new Me();
newMe.save();
// or
newMe.save(function(err, data) {
    // handle error or idk
});
```

- model.create() :
when we want to create many instance of our model.
```js
let arrayOfMe = [me, me, me];
Me.create(arrayOfMe);

// or

Me.create(arrayOfMe, function(err, data) {
    // handle error or idk
});
```

## Search 
there are the multiple way to fetch data form our MongoDB database

- model.find() : 
it can be use to fetch many documents one time !
    - if nothing is passed as filter it will retrun all document from database as an array
    ```js
    // by doing something like
    model.find();
    model.find({});
    ```

    - to pass a filter you just have to do something like this 
    ```js
    model.find({field: value});
    ```

- model.findOne() :
it can be use to fetch one document, even if there are multiple items !
```js
// used like this
model.findOne({field: value});

// if not filter is passed, like
model.findOne()
// findOne will return a random document founded in the collection or null if there is no one in the collection
```

### Search by _id
to find document by id, mongoose provide a specific method to use `findById()`
```js
model.findById(documentID, function(err, data) {
    // ...
});
```

## Update 
There are many way to update data.

- traditionaly we can do something as found the doc by id update it and save it with `.save()`
```js
// like this
model.finsById(documentID, function(err, doc) {
    doc.field = "update value";
    // update any doc value there
    doc.save(function(err, updatedDoc) {
        // Here you can do whatever you want
    });
});
```

- model.findOneAndUpdate() or model.findByIdAndUpdate()
usually take 4 arguments !
```js
model.findOneAndUpdate(
    {field: value},
    {fieldToUpdate: updatedValue},
    {new: true}, // If you want finoneandupdate return the updated object
    function(err, data) {
        // handle the updated data there !
    });
```

# Delete
To delete data, you can use 

- model.findByIdAndRemove()
i think that the method name already describe it very well
```js
model.findByIdAndRemove(docId, function(err, data) {
    // ...
});
```

- model.findOneAndRemove()
find one element using a specific filter
```js
model.findOneAndRemove({field: value}, function(err, data) {
    // ...
});
```

- model.remove()
used to delete all the documents matching given filter
```js
// can be use like this :
model.remove({name: "fredy"}, function(err, data) {
    // ...
});
```

!note: the model.remove() doesn't return the deleted document, but a JSON object containing the outcome of the operation, and the number of affected items.