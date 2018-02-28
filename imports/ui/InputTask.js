import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class InputTask extends Component {
  handleSubmitCreate(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  handleSubmitEdit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Tasks.update(this.props.task._id, {
      $set: { text: text },
    });
    this.props.handler(event);
  }

  renderInputTask(){
    if(this.props.task!=null){
      return(
        <form className="new-task" onSubmit={this.handleSubmitEdit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            defaultValue={this.props.task.text}
          />
        </form>
      );
    }

    return(
      <form className="new-task" onSubmit={this.handleSubmitCreate.bind(this)} >
        <input
          type="text"
          ref="textInput"
          placeholder="Type to add new tasks"
        />
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.renderInputTask()}
      </div>
    );
  }
}
