pragma solidity ^0.5.0;


/**
 * The todoList contract allows a user to keep track of their todos
 */
contract todoList {
	
	/*-------------------- DATA TYPES --------------------*/

    struct Todo {
        string task;
        bool complete;
    }

    /*--------------------- STORAGE ---------------------*/

    // stores all our todos
    Todo[] todos;

    /*--------------------- CREATION ---------------------*/
    function createTodo (string memory task) public {
    	// create a todo and push it into the storage array
    	todos.push(Todo(task, false)) - 1;
    }

    /*--------------------- COMPLETION ---------------------*/
    function completeTodo (uint id) public {
    	// access the todo in storage
        Todo storage todo = todos[id];
        // mark the todo as complete
        todo.complete = true;
    }

    /*--------------------- QUERYING ---------------------*/

    // on the front end, we can initially call this func to get the total number of todos
    // then create a for loop, loop from (i = 0 => totalToDos) and call returnToDo (seen below)
    function getTotalNumTodos() public view returns (uint){
        return todos.length;
    }

    // return a given todo by id
    function returnTodo(uint todoId) public view returns (string memory task, bool completed) {
        Todo storage todo = todos[todoId];
        task = todo.task;
        completed = todo.complete;
    }

}
