var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');


var TextInput = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var content = $('#text-input').val();
    var username = this.props.username.get('username');
    var createdAt = new Date();
    $('#text-input').val('');
    if(username == undefined){
      username = "Mr./Mrs. No Name";
    }
    this.props.collection.create({"username": username, "content": content, "createdAt": createdAt});
    console.log(this.props.collection);
  },
  render: function(){
    return (
      <form id='text-form'>
        <input type="text" className="form-control" id="text-input" placeholder="Text here" />
         <button type="button" className="btn btn-default" onClick={this.handleSubmit}>Send</button>
      </form>
    )
  }
});

module.exports= TextInput;
