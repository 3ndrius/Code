import React, { Component } from 'react';
import styled from 'styled-components'
import Chart from 'chart.js';


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
  grid-template-rows:auto;
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
`;
const Paragraph = styled.p`
  font-size:1em;
  padding:10px 0;
  margin:0;
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
const Figure = styled.img`
  grid-column-start:1;
  grid-column-end:3;
  grid-row-start:1;
  grid-rows-end:2;
`;
class App extends Component {

  state = {
    user: "JohnDoe",
    value: '',
    stat: false,
    init: null
  }
  componentDidMount = () => {
    var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [{
            label: '# of Votes',
            data: [30, 12],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
               
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

fetch(`https://api.github.com//orgs/octokit/repos`)
.then(data => data.json())
.then(data => 
    this.setState({
    init:data
    })
) 

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
    console.log(this.state.user);
    console.log("Init:",this.state.init);
    const {login,avatar_url, blog, following, followers, gists_url,bio, company, created_at, hireable, html_url, location, name,subscriptions_url} = this.state.user;
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
          ( this.state.user.message) ? "User not found" :
            this.state.stat ?
              <Content>
                <Figure src={avatar_url} alt="avatar" height="auto" width="300px"/><span></span>
                <Caption>Name:</Caption> <Paragraph>{name}</Paragraph>
                <Caption>Login:</Caption> <Paragraph>{login}</Paragraph>
                <Caption>Location:</Caption> <Paragraph>{location}</Paragraph>
                <Caption>Created_at:</Caption> <Paragraph>{created_at}</Paragraph>
                <Caption>Blog_url:</Caption> <Paragraph>{blog}</Paragraph>
                <Caption>Gists_url:</Caption> <Paragraph>{gists_url}</Paragraph>
                <Caption>Following:</Caption> <Paragraph>{following}</Paragraph>
                <Caption>Followers:</Caption> <Paragraph>{followers}</Paragraph>
                <Caption>Bio:</Caption> <Paragraph>{bio}</Paragraph>
                <Caption>Subscription:</Caption> <Paragraph>{subscriptions_url}</Paragraph>
              </Content>
            :
            <span>No user yet...</span>
          }
          <Wrap>
        {<canvas id="myChart" width="400" height="400"></canvas>}
          </Wrap>
        </Wrap>  
      </div>
    );
  }
}
export default App;
