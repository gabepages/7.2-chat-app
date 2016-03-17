var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');



var UserMessage = Backbone.Model.extend({
idAttribute: "_id"
});

var UserMessageCollection = Backbone.Collection.extend({
  model:UserMessage,
  url: "http://tiny-lasagna-server.herokuapp.com/collections/messages"
});

module.exports= UserMessageCollection;
