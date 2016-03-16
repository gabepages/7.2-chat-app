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
var UserMessageCollection = new UserMessageCollection();


//components
var User = require('./components/user-form.jsx');
var TextInput = require('./components/text-input.jsx');



//rendering components to DOM
ReactDOM.render(
  <User model={username}/>,
  $('.user-info')[0]
);
ReactDOM.render(
  <TextInput
    username={username}
    collection={UserMessageCollection}
  />,
  $('#footer')[0]
);
