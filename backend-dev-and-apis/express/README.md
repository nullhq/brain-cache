# Basic Node and Express

## working with express server

let's learn more about methods in the express class :

- one fundamentat method is : app.listen(port)
it tells to our server to listen on a given port, always put at the running state...

- routes in express, their take the following structure : app.METHOD(PATH, HANDLER)
    - METHOD is an http method in lowercase (get, post, put, patch)
    - HANDLER the function called by express when the route is matched it look like 
    ```js
     function(req, res) {...}
    ```
- with express to serve a static file from folder, you've to do something like this : 
```js 
let express = require("express");
express.static(folderPath);
```

- remember that, REST means (REpresentational State Transfert)
- middleware is a function that intercept a route, manage and add some kind of information.
    - middleware is mounted with the method: 
        ```js
        app.use(path, middlewareFunction);
        ```
        !note: this middleware will be executed for all the request received by our app.
    - we can add a middleware for a specific HTTP verbs (get, post, put, patch, delete,...)
        ```js
        // eg for POST
        app.post(path, mwareFunc);
        ```

- res's methods
    - send : to reply with some text
    - sendFile: to reply with file
    - json: to reply with object converted in `JSON`

- req's attributs
    - method: to get the current request method
    - path: to get the path smth like `/user`
    - ip: to get de ip address of the client

- How to get input from the client ??
to get input from the client we can use the `params` attribut in the request object...
    - params: to capture route parameters e.g. 
        ```js
            // for endpoint like /:name/print
            let name = req.params.name;
            console.log("print: " +name);
        ```
    

we can also get input from user with `query` attribut also in the request object...
    - the client can do something like : `/ask?question=what's your name`