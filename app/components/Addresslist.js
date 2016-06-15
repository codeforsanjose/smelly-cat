import React from 'react'
import { render } from 'react-dom'
import Listitem from './Listitem'

export default React.createClass({
  update(obj){
    this.props.update(obj);
  },
  render() {
    const list = this.props.list;

    const selected = this.props.selected;

    const addresses = list.map((item, i)=>{
        if(i==selected){
          return <Listitem key={i} index={i} type="list-group-item active" text={item.Address} update={this.update}/>
        }else{
          return <Listitem key={i} index={i} type="list-group-item" text={item.Address} update={this.update}/>
        }
    });

    return (
				<ul id="list" className="list-group">
          {addresses}
        </ul>
    )
  }
})
