import React, { Component } from 'react';
import styled from 'styled-components'

const Wrap = styled.div`
    max-width:1200px;
    height:100%;
    padding:10px;
    margin:0 auto;
    display:flex;
    align-content:center; 
`;
const Content = styled.div`
  display:grid;
  grid-template-columns:150px 200px;
  grid-template-rows:auto
  align-items:center;
`;
const SearchBox = styled.input`
border: 1px solid #d1d1d1;
font-size: 1.2em;
width: 200px;
height:54px;
padding:0px 5px;
margin: 0 0 15px 0;
box-sizing:border-box;

`;
const Header = styled.h1`
  font-size:3em;
`;
const Caption = styled.span`
  font-size:1em;
  grid-column-start:1;
  grid-column-end:2;
  padding:10px 0;
  position:relative;
`;
const Paragraph = styled.p`
  font-size:1em;
  padding:10px 0;
  margin:0;
  width:200px;
  
`;
const Btn = styled.button`
  border: 1px solid #d1d1d1;
  height:54px;
  margin-left:5px;
  width:100px;
  cursor:pointer;
  background:white;
  font-size:1em;
  
`;
const Take = styled.div`
  height:100%;
  max-width:400px;
  position:absolute;
  top:0px;
  right:-350px;
  display:flex;
  flex-wrap:wrap;
  background:gray;
 
`;
const More = styled.div`
  position:relative;
  max-width:250px;
`;
const Figure = styled.img`
  grid-column-start:1;
  grid-column-end:3;
  grid-row-start:1;
  grid-rows-end:2;
`;
const New = styled.a`
`;
const Badget = styled.span`
background:yellow;
padding:10px;
margin:0 5px;
`;
class App extends Component {

  state = {
    user: "JohnDoe",
    value: '',
    stat: false,
    init: null,
    details: ''
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
  moreDetails = () => {
    fetch(`https://api.github.com/users/${this.state.value}/followers`)
    .then(data => data.json())
    .then(data => 
        this.setState({
        details:data,
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
    console.log(this.state.user);
    console.log("details", this.state.details)
    const {login,avatar_url, blog, following, followers, gists_url,bio, company, created_at, hireable, html_url, location, name} = this.state.user;
    return (
      <div className="App">
        <Wrap>
          <Header>GithubUserFinder</Header>
        </Wrap>
        <Wrap>
          <SearchBox onChange={this.handleChange} value={this.state.value} placeholder="Username"/>
          <Btn onClick={this.getUser}>Search</Btn>
        </Wrap>
        <Wrap>
          {
          ( this.state.user.message) ? "User not found" :
            this.state.stat ?
              <Content>
                <Figure src={avatar_url} alt="avatar" height="auto" width="300px"/><span></span>
                <Caption>Name:</Caption> <Paragraph>{name}</Paragraph>
                <Caption>Login:</Caption> <Paragraph>{login}</Paragraph>
                <Caption>Location:</Caption> <Paragraph>{location}</Paragraph>
                <Caption>Created_at:</Caption> <Paragraph>{created_at}</Paragraph>
                <Caption>Blog_url:</Caption> <New href={blog} target="_blank" rel="noopener noreferrer">Blog</New>
                <Caption>Gists_url:</Caption> <New href={gists_url}>Gists</New>
                <Caption>Following:</Caption> <Paragraph>{following}</Paragraph>
                <Caption>Followers:</Caption> <Paragraph>{followers}</Paragraph>
                <Caption>Bio:</Caption> <Paragraph>{bio}</Paragraph>
                <Caption>Followers:</Caption> <More onClick={this.moreDetails}>See more...
                {this.state.details &&<Take>
                    {this.state.details.map((item) => {
                     return(
                       <Badget key={item.id}> 
                         {item.login}
                       </Badget>
                     )}
                   )}

                </Take>
                }
                </More>
                <Caption>Company:</Caption> <Paragraph>{company}</Paragraph>
                <Caption>Hireable:</Caption> <Paragraph>{hireable}</Paragraph>
                <Caption>Html_url:</Caption> <Paragraph>{html_url}</Paragraph>
              </Content>
            :
            <span>No user yet...</span>
          }
      
        </Wrap>  
      </div>
    );
  }
}
export default App;
