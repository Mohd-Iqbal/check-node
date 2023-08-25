import mongoose from "mongoose";
import Joi from "joi";

const todoSchema = mongoose.Schema({
  userId: {
    type: String,
    trim: true,
  },
  text: {
    type: String,
    minlength: 3,
    required: true,
    trim: true,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  select: {
    type: String,
    default: "Default",
  },
  finished: {
    type: Boolean,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

let schema;
function validateTodo() {
  return (schema = Joi.object({
    userId: Joi.string().min(3),
    text: Joi.string().required(),
    date: Joi.string(),
    time: Joi.string(),
    select: Joi.string(),
    finished: Joi.boolean(),
  }));
}

export { Todo, validateTodo };
