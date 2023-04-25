const mongoose = require('mongoose');

const { Schema } = require('mongoose');

/* This code initializes a variable schema and assigns it the value of the schema property of the mongoose object. */
const schema = mongoose.schema;

/* creates a schema for a todo item with fields for text, completion status, and creation timestamp in a Node.js application using the Mongoose library */
const TodoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})

/* This creates the model name of the schema */ 
const Todo = mongoose.model("Todo", TodoSchema);

/* This allows us to import this in server.js */
module.exports = Todo;
