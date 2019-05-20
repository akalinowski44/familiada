import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  }



  render() {
  const { isLoading, users, error } = this.state;
  return (
    <React.Fragment>
      <h1>Random User</h1>
      // Display a message if we encounter an error
      {error ? <p>{error.message}</p> : null}
      // Here's our data check
      {!isLoading ? (
        users.map(user => {
          const { username, name, email } = user;
          return (
            <div key={username}>
              <p>Name: {name}</p>
              <p>Email Address: {email}</p>
              <hr />
            </div>
          );
        })
      // If there is a delay in data, let's let the user know it's loading
      ) : (
        <h3>Loading...</h3>
      )}
    </React.Fragment>
  );
}

fetchUsers() {
  // Where we're fetching data from
  fetch(`https://jsonplaceholder.typicode.com/users`)
    // We get the API response and receive data in JSON format...
    .then(response => response.json())
    // ...then we update the users state
    .then(data =>
      this.setState({
        users: data,
        isLoading: false,
      })
    )
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false }));
}

componentDidMount() {
  this.fetchUsers();
}



}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
