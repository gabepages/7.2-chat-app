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

var Messages = React.createClass({
  mixins:[RouterMixin],
  componentWillMount: function(){

      setInterval( function(){
        this.props.othersCollection.fetch().done(function(data){
          this.forceUpdate();
        }.bind(this));
        this.props.userCollection.fetch().done(function(data){
          this.forceUpdate();
        }.bind(this));
      }.bind(this),1000);

    },

  render: function(){
    var username = this.props.username.attributes.username;
    if(this.props.router.current == ""){
      return <div></div>;
    }else {
      return(
        <div>
          <OtherMessages collection={this.props.othersCollection} username={username} />
          <UserMessages collection={this.props.userCollection} username={username}/>
        </div>
      )
    }
  }
});


var UserMessages = React.createClass({
  render: function (){
    var userMessage = this.props.collection.map(function(item){
      if(item.get('username') == this.props.username){
      return (
        <div key={item.id} className="user-message">
          <p>{item.get('content')}</p>
          <img src="images/rat.png" id='user-message-rat' alt="" />
        </div>
      )
      }
      // else{
      // //   return <div></div>;
      // // }
    }.bind(this));
    return (
        <div>
          {userMessage}
        </div>
    )
  }
});


var OtherMessages = React.createClass({

  render: function (){

    var messageList = this.props.collection.map(function(item){
      if(item.get('username') != this.props.username){
      return (
        <div key={item.id} className="message">
          <img src="images/rat.png" id='message-rat' alt="" />
          <h5>{item.get('username')}: </h5>
          <p>{item.get('content')}</p>
        </div>
      );
    }
    // else{
    //   return <div></div>;
    // }
  }.bind(this));

    return (
      <div>
        {messageList}
      </div>
    )
  }
});


module.exports = Messages;
