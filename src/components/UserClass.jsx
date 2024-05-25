import React from "react";

class userClass extends React.Component {
  constructor(props) {
    console.log("child constructor")
    super(props);

    this.state = {
      userInfo : {
        name: "adarsh",
        bio : "There is no nobility in poverty"
      }
    };
  }

  async componentDidMount (){

    const data = await fetch("https://api.github.com/users/adarshgajbhare");
    const json = await data.json();
   // console.log(json);

    this.setState({
      userInfo : json,
    })
  }

  render() {
    console.log("child render")
    // const { name, location, username } = this.props;
    const { name , avatar_url, followers , following , html_url , login , public_repos ,bio } = this.state.userInfo;
    return (
      <div className="userCard">
        <img src={avatar_url}  />
        <h2>Name : {name}</h2>
        <h3>username : {login}</h3>
        <h3>Bio : {bio}</h3>
        <h3>Public Repo : {public_repos}</h3>
        <h3>Followers : {followers} Following : {following}</h3>
        <button> <a href={html_url} target="_blank"> Visit</a></button>
      </div>
    );
  }
}
export default userClass;
