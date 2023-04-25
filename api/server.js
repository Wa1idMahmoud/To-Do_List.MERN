/* This will handle the API */
const express = require('express');

/* This will handle our database */
const mongoose = require('mongoose');

/* imports the cors middleware in a Node.js application, which enables Cross-Origin Resource Sharing (CORS) for handling HTTP requests */
const cors = require('cors');

/* Creates express app */
const app = express();

/* Allow us to use content type application json inside of our api */
app.use(express.json());

/* Stop any cross-origin errors we get from other domains as we use api's */
app.use(cors());

/* This will connect to our database as well as giving it a name (todo-mern) */
mongoose.connect("mongodb://127.0.0.1:27017/todo-mern", {

    /* ensures that you are using the latest and most flexible connection string parser available in the Node.js driver. */
    useNewUrlParser: true,

    /*  enables your application to take advantage of the new features and improvements in the MongoDB Node.js driver's connection engine. */ 
    useUnifiedTopology: true
})

/* This will print on screen if and when you are connected to the database */
.then(() => console.log("connected to DB"))
.catch(console.error);

/* This will import the schema that is written in Todo.js, you dont need to put .js because it does it automatically */
const Todo = require('./models/Todo');

/*  list out the todos, by doing app.get, make it a async request, make it request and respond */
app.get('/todos', async (req, res) => {

    /* find our todos connected to mongoose DB, find it all and pass to this todos file */
    const todos = await Todo.find();
    
    /* this will send the response on json todos.*/
    res.json(todos);
});

/* This is the function to create new todos, this will be created in our new todo table in the mongo DB.  */
app.post('/todo/new', (req, res) => {
    const { text } = req.body;
    const todo = new Todo({
        text: text
    });

    todo.save()
    .then(() => res.json(todo))
    .catch(error => res.status(500).json({ error }));
});

app.delete('/todo/delete/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).send('Todo not found');
      }
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });  

/* handles a PUT request to update a todo's completion status by toggling the "complete" field in the database and then returning the updated todo as a JSON response. */
app.get('/todo/complete/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
  
      if (!todo) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }
  
      todo.complete = !todo.complete;
  
      todo.save();
  
      res.json(todo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

/* */
app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

/* This will local host the server on port number specified and with a callback function it will print on screen when the server is running and which number */
app.listen(3001, () => console.log("Server started on port 3001"))
