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
const Btn2 = styled.button`
border: 1px solid #d1d1d1;
  padding:4px 6px;
  background:white;
  cursor:pointer;
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
  font-weight:600;
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
  max-width:300px;
  position:absolute;
  top:0px;
  right:-250px;
  display:flex;
  flex-wrap:wrap;
  padding-bottom:20px;
  margin-bottom:20px;

 
`;
const More = styled.div`
  position:relative;
  max-width:250px;
 
`;
const Circle = styled.span`
border: 1px solid #d1d1d1;
border-radius:50%;
padding:4px;
margin-right:5px;
font-size:.6em;
 
`;
const Figure = styled.img`
  grid-column-start:1;
  grid-column-end:3;
  grid-row-start:1;
  grid-rows-end:2;
  border: 1px solid #d1d1d1;
`;
const New = styled.a`
  color:black;
  font-weight:500;
  text-decoration:none;
  ::after{
    content:' \f064';
    font-family: 'FontAwesome';
  }
`;
const Badget = styled.a`
background:yellow;
padding:10px;
margin:2px 2px;
font-size:.7em;
color:black;

`;
class App extends Component {

  state = {
    user: "JohnDoe",
    value: '',
    stat: false,
    init: null,
    details: '',
    page: 0
  }
  getUser = () => {
    fetch(`https://api.github.com/users/${this.state.value}`)
    .then(data => data.json())
    .then(data => 
        this.setState({
        user:data,
        stat:true,
        details: '',
        page:0
        })
    ).catch(err => console.log("error", err))  
  }
  moreDetails = () => {

    if((this.state.user.followers) >= (this.state.page*60)){
      fetch(`https://api.github.com/users/${this.state.value}/followers?per_page=60&page=${this.state.page}`)
      .then(data => data.json())
      .then(data => 
          this.setState({
          details:data,
          page:this.state.page+1,
          status: true
          })
      )
    
    }

  console.log("Limit reached");
}
   moreDetailsReverse = () => {
    if((this.state.page > 0 )){
    fetch(`https://api.github.com/users/${this.state.value}/followers?per_page=60&page=${this.state.page}`)
    .then(data => data.json())
    .then(data => 
        this.setState({
        details:data,
        page:this.state.page-1
        })
    )
    }
   }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value
    })
  }
  render() {
    console.log(this.state.user);
    console.log("details", this.state.details);
    console.log(this.state.page);
    const {login,avatar_url, blog, following, followers,bio, company, created_at, hireable, html_url, location, name} = this.state.user;
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
          ( this.state.user.message) ? "User not found or limit reached" :
            this.state.stat ?
              <Content>
                <Figure src={avatar_url} alt="avatar" height="auto" width="300px"/><span></span>
                <Caption>Name:</Caption> <Paragraph>{name}</Paragraph>
                <Caption>Login:</Caption> <Paragraph>{login}</Paragraph>
                <Caption>Location:</Caption> <Paragraph>{location}</Paragraph>
                <Caption>Created_at:</Caption> <Paragraph>{created_at}</Paragraph>
                <Caption>Blog_url:</Caption> <New href={blog} target="_blank" rel="noopener noreferrer">Blog</New>
                <Caption>Html_url:</Caption> <New href={html_url} target="_blank" rel="noopener noreferrer">Github</New>                
                <Caption>Company:</Caption> <Paragraph>{company}</Paragraph>
                <Caption>Bio:</Caption> <Paragraph>{bio}</Paragraph>
                <Caption>Followers:</Caption>
                { this.state.user.followers && <More><Circle>{followers}</Circle><Btn2 onClick={this.moreDetails}>More</Btn2><Btn2 onClick={this.moreDetailsReverse}>Less</Btn2>
                {this.state.user && <Take>
                    { this.state.details && this.state.details.map((item) => {
                     return(
                       <Badget  href={item.html_url} key={item.id} target="_blank" rel="noopener noreferrer"> 
                        {item.login}
                       </Badget>
                     )}
                   )}

                </Take>
                }
                </More>
                 }
                <Caption>Following:</Caption> <Paragraph><Circle>{following}</Circle></Paragraph>
                <Caption>Hireable:</Caption> <Paragraph>{hireable}</Paragraph>

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
