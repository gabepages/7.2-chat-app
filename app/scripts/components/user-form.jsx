var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var RouterMixin = {
  componentWillMount : function() {
    this.callback = (function() {
      this.forceUpdate();
    }).bind(this);

    this.props.router.on("route", this.callback);
  },
  componentWillUnmount : function() {
    this.props.router.off("route", this.callback);
  }
};

var User = React.createClass({
  mixins:[RouterMixin],
  getInitialState: function() {
    return {
      username: ''
    }
  },
  handleUserName: function( name ){
    name = name.replace(/\s+/g, '');
    this.setState({ username: name });
    this.props.model.set({'username': name});
    console.log(this.props.model.get('username'));
    this.props.router.navigate('user/' + name, {trigger: true});
  },
  render: function(){
    var id = this.props.model.get('username');
    if(this.props.router.current == ''){
      return(
        <UserForm onSubmit={this.handleUserName} />
      )
    }else if (this.props.router.current == 'user/' + id){
      return (
        <UserName username={id} router={this.props.router}/>
      )
    }
    return <div></div>
  }
})

var UserForm = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    var username = $('#username').val();
    this.props.onSubmit(username);
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
  handleClick: function(){
    this.props.router.navigate('', {trigger: true})
  },

  render: function(){
    return (
      <div>
        <button className="btn btn-default actual-user" id='edit' onClick={this.handleClick} type="submit">
          <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
        </button>
        <h3 id='get-username'>Username: {this.props.username}</h3>
      </div>
    )
  }
});



module.exports = User;
