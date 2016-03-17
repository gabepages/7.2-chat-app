var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

//Requiring in models and collections
var MessageCollection = require("./models/messages");
var UserMessageCollection = require("./models/current-user");
var UserName = require('./models/user-name');

//instantiating new models and collections
var username = new UserName();
var messageCollection = new MessageCollection();
var userMessageCollection = new UserMessageCollection();


//components
var User = require('./components/user-form.jsx');
var TextInput = require('./components/text-input.jsx');
var Messages = require('./components/message-field.jsx');



var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'user/:id': 'user'
  },
  index: function(){
    this.current = '';
  },
  user: function(id){
    this.current = 'user/' + id;
    ReactDOM.render(
      <Messages
          userCollection = {userMessageCollection}
          othersCollection = {messageCollection}
          router= {router}
          username= {username}
      />,
    $('.messages')[0]
    );
  }

});

var router = new Router();

//rendering components to DOM
ReactDOM.render(
  <User
    model={username}
    router={router}
  />,
  $('.user-info')[0]
);
ReactDOM.render(
  <TextInput
    username={username}
    collection={userMessageCollection}
    router={router}
  />,
  $('#footer')[0]
);




Backbone.history.start();
