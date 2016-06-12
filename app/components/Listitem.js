import React from 'react'
import { render } from 'react-dom'

export default React.createClass({
  render() {
    // const list = this.props.list;
    //
    // const addresses = list.map((item, i)=>{
    //     // const address = <li key={i} className="list-group-item">{item.Address}</li>;
    //
    //     return ({i==0 ? <li key={i} className="list-group-item active">{item.Address}</li>:<li key={i} className="list-group-item">{item.Address}</li>})
    //
    //     // return {{i}==0 ? <li key={i} className="list-group-item active">{item.Address}</li> :
    //     //     <li key={i} className="list-group-item">{item.Address}</li>};
    // });
    return (
				<li key={this.props.key} className={this.props.type}>{this.props.text}</li>
    )
  }
})
