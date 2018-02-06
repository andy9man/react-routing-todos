import React, { Component } from 'react';
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';

const HomeView = props => {
  return (
    <div style={ {textAlign: 'center'} }>
      <h2>Users & Todos</h2>
      <p>More to come... </p>
    </div>
  )
}

const UserView = props => {
  console.log(props.match);
  return (
    <div>
      <h3>Users</h3>
        <div className="subnav">
          <ul className="heading-nav">
          {
            props.users.map( (user, index) => {
              return (
                <NavLink key={index} to={`${props.match.path}/${index}`} className="heading-nav-entry" activeClassName="active">{user.name}</NavLink>
              );
            })
          }
          </ul>
        </div>

      <Route path={`${props.match.path}/:id`} render={ ({match}) => (
        <div>
          <ul>
            {
              props.users.length > match.params.id ? props.users[match.params.id].todos.map( (todo, index) => (
                <li key={index}>{todo}</li>
              )) :
              <i><b><h3>User Not Found...</h3></b></i>
            }
          </ul>
        </div>
      )} />
    </div>
  )
}

const TodoView = props => {
  return (
    <div>
      <h3>Todos</h3>
      <div>
        <li>Todo 1</li>
        <li>Todo 2</li>
        <li>Todo 3</li>
        <li>Todo 4</li>
      </div>
    </div>
  )
}

class User {
  constructor(name) {
    this.name = name;
    this.todos = ["I'm a todo", "Whatever this todo stuff is", "Why am I even trying this"];
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [new User('Bob'), new User('George'), new User('Amy')]

    }
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App" style={ {height: '100vh', width: '100vw'} }>
          <header>
            <nav>
              <NavLink exact to="/" activeClassName="active">Home</NavLink>
              <NavLink to="/users" activeClassName="active">Users</NavLink>
              <NavLink to="/todos" activeClassName="active">ToDos</NavLink>
            </nav>
          </header>
          <div style={ {margin: '20px', height: '100%'} }>
            <Switch>
              <Route exact path="/" component={HomeView} />

              <Route path="/users" render={ props => (
                <UserView {...props} users={this.state.users} />
              )} />

              <Route path="/todos" component={TodoView} />

              <Route render={ () => (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <h1>THAT ITEM WAS NOT FOUND!</h1>
                </div>
              )} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
