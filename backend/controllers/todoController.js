<<<<<<< HEAD
// Importing model
const Todo = require("../models/todo");

// Add a todo
exports.addTodo = async (req, res) => {
  try {
    //Get title form req.body
    const { title } = req.body;

    //check if title valid or not
    if (!title) {
      res.status(401).send("Title not found");
    }

    const newTodo = new Todo({
      title: title,
    });

    // Save to db
    const createdNewTodo = await newTodo.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Todo created successsully",
      createdNewTodo,
    });

    //
  } catch (error) {
    console.log(error);
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Add a task
exports.createTodoTask = async (req, res) => {
  try {
    // Get todoId from req.params
    const { todoId } = req.params;
    // Find a todo in db by id
    const todo = await Todo.findById(todoId);

    // If todo doesnt exist..
    if (!todo) {
      res.status(401).send("Todo doesn't exist");
    }

    // Get text from req.body
    const { text } = req.body;
    if (!text) {
      res.status(401).send("Please enter some text");
    }

    // Push the text into the tasks array
    todo.tasks.push(text);

    // Save to db
    await todo.save();

    // Send the success response
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    // Get todoId from req.params
    const { todoId } = req.params;

    // Delete todo
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    // Send the success response
    res.status(201).json({
      success: true,
      message: "Todo deleted successfully",
      deletedTodo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a task
exports.deleteTodoTask = async (req, res) => {
  try {
    // Get todoId from req.params
    const { todoId } = req.params;

    // Get taskKey from req.body
    const { taskKey } = req.body;

    // Get todo and remove task
    const todo = await Todo.findById(todoId);
    todo.tasks.splice(taskKey, 1);

    // Save to db
    await todo.save();

    // send success response
    res.status(201).json({
      success: true,
      message: "Task deleted successfully",
      todo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit todo
exports.editTodo = async (req, res) => {
  try {
    //get id from req.params
    const { todoId } = req.params;
    // get title from body
    const { newTitle } = req.body;

    // Get todo from db by id
    const todo = await Todo.findById(todoId);

    if (!todo) {
      res.status(401).send("Todo not found");
    }

    // Edit the title
    todo.title = newTitle;

    // Save to db
    await todo.save();

    // send success response
    res.status(201).json({
      success: true,
      message: "Title updated successfully",
      todo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit task
exports.editTask = async (req, res) => {
  try {
    //Get taskKey and UpdatedTask from req.body
    const { taskKey, updatedTask } = req.body;
    // Get todoId from req.params
    const { todoId } = req.params;

    //Get todo by id
    const todo = await Todo.findById(todoId);

    if (!todo) {
      res.status(401).send("Todo not found");
    }

    // Update the task
    todo.tasks[taskKey] = updatedTask;

    // Save to db
    await todo.save();

    // send success response
    res.status(201).json({
      success: true,
      message: "Task updated successfully",
      todo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    // Get todos from db
    const allTodos = await Todo.find();

    // send success response
    res.status(201).json({
      success: true,
      message: "All Todos",
      allTodos,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a todo
exports.getTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);

    // send success response
    res.status(201).json({
      success: true,
      message: "Got the todo",
      todo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Search todo
exports.searchTodo = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    // If no query entered
    if (!searchQuery) {
      throw new Error("Search value  is required to fetch the todos");
    } else {
      // if query exists, send filtered data as per query(title of todo)
      const todo = await Todo.find({
        $or: [
          { title: new RegExp(searchQuery, "i") },
          { tasks: new RegExp(searchQuery, "i") },
        ],
      });
      // if no data found
      if (todo.length === 0) {
        // return whole data
        const todo = await Todo.find();
        // send response
        return res.status(200).json({
          status: "Fail",
          message: "Displaying all Todos",
          results: todo.length,
          data: {
            todo,
          },
        });
      }
      // else send the matched todo
      return res.status(200).json({
        status: "success",
        results: todo.length,
        data: {
          todo,
        },
      });
    }
  } catch (error) {
    console.log(error);
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Home page
exports.home = async (req, res) => {
  res.status(201).send("Welcome to homepage");
};
// Importing model
const Todo = require("../models/todo");

// Add a todo
exports.addTodo = async (req, res) => {
  try {
    //Get title form req.body
    const { title } = req.body;

    //check if title valid or not
    if (!title) {
      res.status(401).send("Title not found");
    }

    const newTodo = new Todo({
      title: title,
    });

    // Save to db
    const createdNewTodo = await newTodo.save();

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Todo created successsully",
      createdNewTodo,
    });

    //
  } catch (error) {
    console.log(error);
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Add a task
exports.createTodoTask = async (req, res) => {
  try {
    // Get todoId from req.params
    const { todoId } = req.params;
    // Find a todo in db by id
    const todo = await Todo.findById(todoId);

    // If todo doesnt exist..
    if (!todo) {
      res.status(401).send("Todo doesn't exist");
    }

    // Get text from req.body
    const { text } = req.body;
    if (!text) {
      res.status(401).send("Please enter some text");
    }

    // Push the text into the tasks array
    todo.tasks.push(text);

    // Save to db
    await todo.save();

    // Send the success response
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    // Get todoId from req.params
    const { todoId } = req.params;

    // Delete todo
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    // Send the success response
    res.status(201).json({
      success: true,
      message: "Todo deleted successfully",
      deletedTodo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a task
exports.deleteTodoTask = async (req, res) => {
  try {
    // Get todoId from req.params
    const { todoId } = req.params;

    // Get taskKey from req.body
    const { taskKey } = req.body;

    // Get todo and remove task
    const todo = await Todo.findById(todoId);
    todo.tasks.splice(taskKey, 1);

    // Save to db
    await todo.save();

    // send success response
    res.status(201).json({
      success: true,
      message: "Task deleted successfully",
      todo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit todo
exports.editTodo = async (req, res) => {
  try {
    //get id from req.params
    const { todoId } = req.params;
    // get title from body
    const { newTitle } = req.body;

    // Get todo from db by id
    const todo = await Todo.findById(todoId);

    if (!todo) {
      res.status(401).send("Todo not found");
    }

    // Edit the title
    todo.title = newTitle;

    // Save to db
    await todo.save();

    // send success response
    res.status(201).json({
      success: true,
      message: "Title updated successfully",
      todo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit task
exports.editTask = async (req, res) => {
  try {
    //Get taskKey and UpdatedTask from req.body
    const { taskKey, updatedTask } = req.body;
    // Get todoId from req.params
    const { todoId } = req.params;

    //Get todo by id
    const todo = await Todo.findById(todoId);

    if (!todo) {
      res.status(401).send("Todo not found");
    }

    // Update the task
    todo.tasks[taskKey] = updatedTask;

    // Save to db
    await todo.save();

    // send success response
    res.status(201).json({
      success: true,
      message: "Task updated successfully",
      todo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    // Get todos from db
    const allTodos = await Todo.find();

    // send success response
    res.status(201).json({
      success: true,
      message: "All Todos",
      allTodos,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a todo
exports.getTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findById(todoId);

    // send success response
    res.status(201).json({
      success: true,
      message: "Got the todo",
      todo,
    });
  } catch (error) {
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Search todo
exports.searchTodo = async (req, res) => {
  try {
    const { searchQuery } = req.query;
    // If no query entered
    if (!searchQuery) {
      throw new Error("Search value  is required to fetch the todos");
    } else {
      // if query exists, send filtered data as per query(title of todo)
      const todo = await Todo.find({
        $or: [
          { title: new RegExp(searchQuery, "i") },
          { tasks: new RegExp(searchQuery, "i") },
        ],
      });
      // if no data found
      if (todo.length === 0) {
        // return whole data
        const todo = await Todo.find();
        // send response
        return res.status(200).json({
          status: "Fail",
          message: "Displaying all Todos",
          results: todo.length,
          data: {
            todo,
          },
        });
      }
      // else send the matched todo
      return res.status(200).json({
        status: "success",
        results: todo.length,
        data: {
          todo,
        },
      });
    }
  } catch (error) {
    console.log(error);
    // send the error response
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Home page
exports.home = async (req, res) => {
  res.status(201).send("Welcome to homepage");
};
