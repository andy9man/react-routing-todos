import React, { Component } from 'react';
import {
  BrowserRouter,
//  NavLink,
  Link,
  Route,
  Switch
} from 'react-router-dom';
import './ui-toolkit/css/nm-cx/main.css';
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
        <div className="padding-bottom-large">
          <ul className="tabs padding-left-medium padding-top-small">
          {
            props.users.map( (user, index) => {
              return (
                // <li key={index} className="tab-title">
                //   <NavLink
                //     to={`${props.match.path}/${index}`}
                //     className="heading-nav-entry"
                //     activeClassName="active"
                //   >{user.name}</NavLink>
                // </li>

                <OldSchoolMenuLink key={index} to={`${props.match.path}/${index}`} label={user.name} generalClassName="tab-title" activeOnlyWhenExact={true} />
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
 //Using a custom component and help with destructuring we can pass props down to child components...
 //  thus solving the UI Toolkit conundrum
const OldSchoolMenuLink = ( {label, to, activeOnlyWhenExact, generalClassName} ) => {
  console.log(generalClassName);
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={ ({match}) => {
      return (
      <li className={`${generalClassName} ${match ? 'active' : ''}`}>
        <Link to={to}><button style={ {fontWeight: 'normal'} }>{label}</button></Link>
      </li>
      )}
    } />
  );
}

class User {
  constructor(name) {
    this.name = name;
    this.todos = [`${name}'s I'm a todo`, `${name}'s Whatever this todo stuff is`, `${name}'s Why am I even trying this`];
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
        <div className="App bg-off-white padding-medium">
          <header>
            <h1 className="padding-bottom-medium">React Routing - Todos</h1>
            <nav>
              <ul className="heading-nav padding-bottom-medium">
                <OldSchoolMenuLink to="/" label="Home" generalClassName="heading-nav-entry" activeOnlyWhenExact={true} />
                <OldSchoolMenuLink to="/users" label="Users" generalClassName="heading-nav-entry" activeOnlyWhenExact={true} />
                <OldSchoolMenuLink to="/todos" label="Todos" generalClassName="heading-nav-entry" activeOnlyWhenExact={true} />
                {/* <li className="heading-nav-entry" style={ {fontWeight: 'normal'} }><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li className="heading-nav-entry" style={ {fontWeight: 'normal'} }><NavLink to="/users" activeClassName="active">Users</NavLink></li>
                <li className="heading-nav-entry" style={ {fontWeight: 'normal'} }><NavLink to="/todos" activeClassName="active">ToDos</NavLink></li> */}

              </ul>
            </nav>
          </header>
          <div className="card padding-vert-xlarge padding-horiz-xlarge">
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
