This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Interesting usage in this application

- Utilized React Stateful Components
- Implemented React-Router-DOM
- Created a custom Navigation component to utilize a 3rd party style guide
  - This is interesting because by default, <Link> or <NavLink> applies 'active' to the child component
  - Our style guide implemented, needs the parent <li> to have 'active' applied to it
