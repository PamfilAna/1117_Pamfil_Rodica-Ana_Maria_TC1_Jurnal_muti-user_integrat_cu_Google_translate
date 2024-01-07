import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Menu extends Component {
  render() {
    return (
      <section id="navigation">
         <ul id="navigationBar">
             <li><a href="/" className="buttonNav">Home</a></li>
             <li><a href="http://localhost:8080/nodeadmin/" className="buttonNav">NodeAdmin</a></li>
         </ul>
      </section>
    )
  }
}
  
class UserLinkComponent extends Component {
  render(){
    let userLink = this.props.user;
    return(
      <div>
        <button className="buttonUser" onClick={() => this.props.handleLoadPosts(userLink.id)}>
          {userLink.id}. {userLink.name}
        </button>
      </div>
    )
  }
}

class UserSidebar extends Component {
  render(){
    return (
      <ul id="userList">
        <button className="buttonUser" onClick={() => this.props.handleLoadPosts(0)}>Refresh posts</button>
        <button className="buttonUser" onClick={() => this.props.handleUsers()}>Refresh users</button>
        {this.props.users.map(user =>(
          <UserLinkComponent key={user.id} user={user} handleLoadPosts={this.props.handleLoadPosts} />
        ))}
      </ul>
    )
  }  
}

class PostComponent extends Component {
  handleDeletePost(id){
    let api = `http://localhost:8080/posts/${id}`;
    axios.delete(api).catch(error => {
      console.log(error);
    });
    this.props.handleLoadPosts(0);
  }

  render(){
    let post = this.props.post;
    return(
      <div className="post">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>Posted on: {post.createdAt}</p>
        <p>by: {post.user.name}</p>
        <button onClick={() => {this.handleDeletePost(post.id)}}>Delete</button>
      </div> 
    )
  }
}

class ContentPosts extends Component {
  render() {
     return (
       <section id="content">
          {this.props.posts.map(post =>(
            <PostComponent key={post.id} post={post} handleLoadPosts={this.props.handleLoadPosts}/>
          ))}
        </section>
      )
  };
}

class NewPost extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      title: "",
      content: "",
      id_user:2,
      name:"",
      pass:"",
      loggedInAs:"anonymous"
    }
    this.handleInputTitleChange=this.handleInputTitleChange.bind(this)
    this.handleInputContentChange=this.handleInputContentChange.bind(this)
    this.handleInputUserChange=this.handleInputUserChange.bind(this)
    this.handleInputPassChange=this.handleInputPassChange.bind(this)
  }
  
  handleLogin(){
    let api0 = `http://localhost:8080/users/ids/${this.state.name}/${this.state.pass}`;
    axios.get(api0).then((results) => {
      this.setState({id_user:results.data.id})
      console.log(this.state.id_user,results.data)
      alert(`Logged in as ${results.data.name}!`);
      this.setState({loggedInAs: results.data.name});
    }).catch(error => {
      console.log(error);
      alert("Login failed!");
    });
  }

  handlePost(){
    let api = 'http://localhost:8080/posts';
    axios.post(api,{
      title: this.state.title,
      content: this.state.content,
      id_user: this.state.id_user
    }).then(() => {
      alert("Post successful!");
    }).catch(error => {
      console.log(error);
    });
    this.props.handleLoadPosts(0);
  }

  handleNewUser(){
    let api = 'http://localhost:8080/users';
    axios.post(api, {
      name: this.state.name,
      password: this.state.pass
    }).then(() => {
      alert("Registered!");
    }).catch(error => {
      console.log(error);
    });
    this.props.handleUsers();
  }

  handleInputTitleChange(event) {
    this.setState({title: event.target.value});
    console.log(this.state.title);
  }

  handleInputContentChange(event) {
    this.setState({content: event.target.value});
    console.log(this.state.content);
  }

  handleInputUserChange(event) {
    this.setState({name: event.target.value});
    console.log(this.state.name);
  }

  handleInputPassChange(event) {
    this.setState({pass: event.target.value});
    console.log(this.state.pass);
  }

  render(){
    return(
      <section id="inputArea">
        <input type="text" label="username" value={this.state.name} onChange={this.handleInputUserChange} />
        <input type="password" value={this.state.pass} onChange={this.handleInputPassChange} />
        <button className="buttonLogin" onClick={() => this.handleLogin()}>Login</button>
        <button className="buttonRegister" onClick={() => this.handleNewUser()}>Register</button>
        Logged in as: {this.state.loggedInAs}
        <div>
          <textarea id="inputTitle" cols="50" value={this.state.title} onChange={this.handleInputTitleChange}></textarea>
          <br/>(Title - max 255 characters)
        </div>
        <div>
          <textarea id="inputContent" rows="6" cols="50" value={this.state.content} onChange={this.handleInputContentChange}></textarea>
          <br/>(Post - max 2000 characters)
        </div>
        <input id="inputSubmit" type="submit" value="Post" onClick={() => this.handlePost()}/>
      </section>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      users: [],
      posts: [],
      userDetails: null,
      userIDforPosts: 0
    }
    
    this.handleLoadPosts = this.handleLoadPosts.bind(this)
    this.handleUsers = this.handleUsers.bind(this)
  }
  
  componentDidMount() {
    this.handleLoadPosts(this.state.userIDforPosts);
    this.handleUsers();
  }
  
  handleLoadPosts(n) {
    if(n===0){
      let api = 'http://localhost:8080/posts';
      axios.get(api).then((results) => {
        this.setState({posts:results.data})
      });
    }
    else { 
      let api = `http://localhost:8080/users/${n}/posts`;
      axios.get(api).then((results) => {
        this.setState({posts:results.data})
        console.log(n);
        console.log(results.data);
      });
    }
  }
  
  handleUsers = () => {
    let api = 'http://localhost:8080/users';
    axios.get(api).then((results) => {
      this.setState({users:results.data})
    });
  }
  
  render() {
    return (
      <div id="container">
        <header>
          <section id="title">
            <h1>Jurnal Online</h1>
          </section>
        </header>
        <main>
          <section className="sidebarLeft">
            <UserSidebar users={this.state.users} handleLoadPosts={this.handleLoadPosts} handleUsers={this.handleUsers}/>
          </section>
          <Menu/>
          <NewPost users={this.state.users} handleUsers={this.handleUsers} handleLoadPosts={this.handleLoadPosts} />
          <ContentPosts id="cp" posts={this.state.posts} handleLoadPosts={this.handleLoadPosts}/>
        </main>
      </div>
    );
  }
}

export default App;
