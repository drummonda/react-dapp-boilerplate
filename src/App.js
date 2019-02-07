import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import TodoList from '../build/contracts/todoList.json';
import contract from 'truffle-contract';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoListInstance: {},
      todos: [],
      taskName: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getNumTodos = this.getNumTodos.bind(this);
  }

  async componentDidMount() {
    await this.instantiateContract();
  }

  async instantiateContract() {
    const todoList = contract(TodoList);
    todoList.setProvider(window.web3.currentProvider);
    const todoListInstance = await todoList.deployed();
    this.setState({ todoListInstance });
  }

  async getNumTodos() {
    const { todoListInstance: { getTotalNumTodos }} = this.state;
    const totalNumTodos = await getTotalNumTodos();
    window.alert("there are", totalNumTodos.toString(), "todos");
  }

  async handleClick() {
    const { taskName, todoListInstance: { createTodo } } = this.state;
    console.log("taskName", taskName);
    window.web3.eth.getAccounts(async (err, accounts) => {
      if(err) throw new Error(err);
      // create the todo
      createTodo(taskName, { from: accounts[0] });
      this.setState({ taskName: '' });
    })
  }

  handleChange({ target: { value }}) {
    this.setState({ taskName: value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Sweeet
          </p>
          <div>
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">Task</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Large" 
                aria-describedby="inputGroup-sizing-sm"
                placeholder="new todo here"
                value={this.state.taskName}
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button
                  onClick={this.handleClick}>
                  Click me
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <Button
            onClick={this.getNumTodos}>
            How many todos
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
