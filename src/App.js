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
      newTodo: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  async handleClick() {
    
  }

  handleChange({ target: { value }}) {
    this.setState({ newTodo: value });
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
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button
                  onClick={() => null}>
                  Click me
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
