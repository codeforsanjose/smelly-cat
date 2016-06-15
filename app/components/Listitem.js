import React from 'react'
import { render } from 'react-dom'

export default React.createClass({
  handleClick(event){
    const obj={
      "name": event.target.innerHTML,
      "index": this.props.index
    };

    console.log(obj);

    this.props.update(obj);
  },
  render() {
    return (
				<li onClick={this.handleClick} key={this.props.key} className={this.props.type}>{this.props.text}</li>
    )
  }
})
