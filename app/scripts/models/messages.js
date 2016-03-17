var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');


var Message = Backbone.Model.extend({
  defaults: {
    username: "username",
    content: "",
    createdAt: new Date()
  },
  idAttribute: "_id"
});

var MessageCollection = Backbone.Collection.extend({
  model:Message,
  url: "http://tiny-lasagna-server.herokuapp.com/collections/messages"
});

module.exports= MessageCollection;
