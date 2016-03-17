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

var TextInput = React.createClass({
  mixins:[RouterMixin],
  handleSubmit: function(e){
    e.preventDefault();
    var content = $('#text-input').val();
    var username = this.props.username.get('username');
    var createdAt = new Date();
    $('#text-input').val('');
    if(username == undefined){
      username = "Mr.NoName";
    }
    this.props.collection.create({"username": username, "content": content, "createdAt": createdAt});
    console.log(this.props.collection);
    this.props.router.navigate('user/' + username, {trigger: true});
  },
  render: function(){
    var id = this.props.username.get('username');
    if(this.props.router.current == ''){
      return(
        <PreventTextInput />
      );
    }else if(this.props.router.current == "user/"+ id){
      return (
        <EnabledTextInput onSubmit={this.handleSubmit} />
      );
    }

    return <div></div>;
  }
});



var EnabledTextInput = React.createClass({
  render: function(){
    return (
      <form id='text-form'>
        <input type="text" className="form-control" id="text-input" placeholder="Text here" />
         <button type="button" className="btn btn-default" onClick={this.props.onSubmit}>Send</button>
      </form>
    )
  }
});



var PreventTextInput = React.createClass({
  render: function(){
    return (
        <div className="alert alert-danger no-username" role="alert">
            <strong>Missing Username!</strong> You "mice" have a username to chat.
        </div>
    )
  }
});





module.exports= TextInput;
