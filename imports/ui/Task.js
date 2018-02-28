import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';
import InputTask from './InputTask.js';

// Task component - represents a single todo item
export default class Task extends Component {
  constructor() {
    super();
    this.state = { editing: false }
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  }

  handler = (e) => {
     e.preventDefault();
     this.setState({ editing: !this.state.editing });
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  renderItemOrEditField( item ) {
    if(this.state.editing ){
       return(
         <li key={item._id}>
          <InputTask task={item} handler={this.handler} />
         </li>
       );
    } else {
      const taskClassName = this.props.task.checked ? 'checked' : '';
      return(
        <li key={item._id} className={taskClassName}>
          <button className="delete" onClick={this.deleteThisTask.bind(this)}>
            &times;
          </button>
          <input
              type="checkbox"
              readOnly
              checked={!!this.props.task.checked}
              onClick={this.toggleChecked.bind(this)}
            />
          <span className="text" onClick={ this.toggleEditing }>{this.props.task.text}</span>
        </li>
      );
    }
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS

    return (
      <div key={this.props.task._id}>
        {this.renderItemOrEditField(this.props.task)}
      </div>
    );
  }
}
