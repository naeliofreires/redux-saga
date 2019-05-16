import React from "react";
import { connect } from "react-redux";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { value } = this.state;
    await this.props.onRequestUser(value);

    console.log(this.props);
  }

  renderCard = user => (
    <div className="card">
      <img src={user.avatar_url} alt="avatar" />
      <ul className="box">
        <li className="username">{user.name}</li>
        <li className="login">@{user.login}</li>
        <li>
          Following:<small>{user.following}</small>
        </li>
        <li>
          Followers: <small>{user.followers}</small>
        </li>
        <li>Public Repos: {user.public_repos}</li>
      </ul>
    </div>
  );

  renderFeedBack = () => {
    const {
      userResponse: { error, user, fetching }
    } = this.props;

    if (fetching) {
      return <h1>Carregando...</h1>;
    }

    if (!fetching && !error && !user) {
      return (
        <h1 style={{ color: "blue" }}>Digite um username para buscar :)</h1>
      );
    }

    if (error || !user) {
      return (
        <h1 style={{ color: "red" }}>
          Desculpe, algo aconteceu!
          <br />
          Que tal, tentar outro username?
        </h1>
      );
    }
  };

  render() {
    const { value } = this.state;
    const {
      userResponse: { user }
    } = this.props;

    return (
      <div className="App">
        {user ? this.renderCard(user) : this.renderFeedBack()}

        <form onSubmit={this.handleSubmit}>
          <input type="text" value={value} onChange={this.handleChange} />
          <input type="submit" value="buscar" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userReducer } = state;
  return {
    userResponse: userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestUser: user => dispatch({ type: "API_CALL_REQUEST", user })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
