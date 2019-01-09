import React, { Component } from 'react';
import styled from 'styled-components'


const Wrap = styled.div`
    max-width:1200px;
    min-height:200px;
    margin:0 auto;
    display:flex;
    justify-content:center;
    
`;

const SearchBox = styled.input`
  height:50px;
  width:250px;
  padding:0;
  margin:0;
  border:.1px solid black;
  font-size:1.2em;
`;
const Header = styled.h1`
  
  font-size:3em;
`;
const Btn = styled.button`
  border:1px solid black;
  border-left:none;
  height:50px;
  width:100px;
  cursor:pointer;
  background:white;
  font-size:1em;
  
`;
const List = styled.ul`
  list-style-type:none;
  font-size:1.2em;
`;
const Figure = styled.img`

`;
class App extends Component {

  state = {
    user: "JohnDoe",
    value: '',
    stat: false
  }

  getUser = () => {
    fetch(`https://api.github.com/users/${this.state.value}`)
    .then(data => data.json())
    .then(data => 
        this.setState({
        user:data,
        stat:true,
        })
    )    
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value
    })
  }



  render() {
    console.log(this.state.user.message);
    const {login,avatar_url, blog, following, followers, gists_url,bio } = this.state.user;
    return (
      <div className="App">
        <Wrap>
          <Header>GithubUserFinder</Header>
        </Wrap>
        <Wrap>
          <SearchBox onChange={this.handleChange} value={this.state.value}/>
          <Btn onClick={this.getUser}>Search</Btn>
        </Wrap>
        <Wrap>
          
          {
          ( this.state.user.message) ? this.state.user.message :
            this.state.stat ?
            <List>
              <li><span>Login: </span> {login}</li>
              <li><span>Blog_url: </span>{blog ? blog : "Not fill"}</li>
              <li>{following}</li>
              <li>{followers}</li>
              <li>{bio}</li>
              <li><Figure src={avatar_url} alt="avatar" width="100px" height="auto"/></li>
            </List>
            :
            <span>No user yet...</span>
        
          }

        </Wrap>
      
      </div>
    );
  }
}

export default App;
