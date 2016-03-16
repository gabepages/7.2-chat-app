var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var User = React.createClass({
  getInitialState: function() {
    return {
      toggleState: false,
      username: ''
    }
  },
  doToggle: function(){
    this.setState({ toggleState: !this.state.toggleState });
  },
  handleUserName: function( name ){
    this.setState({ username: name });
    this.props.model.set({'username': name});
    console.log(this.props.model.get('username'));
  },
  render: function(){
    var class1, class2;
    if(this.state.toggleState){
      class1 = 'hidden';
      class2 = '';
    }else{
      class1 = '';
      class2 = 'hidden';
    }
    return (
      <div>
        <div className={class1}>
          <UserForm onSubmit={this.handleUserName} doToggle={this.doToggle}/>
        </div>
        <div className={class2}>
          <UserName username={this.state.username} doToggle2={this.doToggle}/>
        </div>
      </div>
    );
  }
})

var UserForm = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    var username = $('#username').val();
    this.props.onSubmit(username);
    this.props.doToggle();
  },
  render: function(){
    return (
      <form id='user-form'>
        <button className="btn btn-default user-btn" onClick={this.handleClick} type="submit">
          <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
        </button>
        <input type="text" className="form-control" id="username" placeholder="Username" />
      </form>
    )
  }
});


var UserName = React.createClass({
  editField: function(){
    this.props.doToggle2();
  },
  render: function(){
    return (
      <div>
        <button className="btn btn-default actual-user" id='edit' onClick={this.editField} type="submit">
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
        <h3 id='get-username'>Username: {this.props.username}</h3>
      </div>
    )
  }
});



module.exports = User;
