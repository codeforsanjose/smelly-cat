import React from 'react'
import { render } from 'react-dom'
import Listitem from './Listitem'

export default React.createClass({
  render() {
    const list = this.props.list;

    const addresses = list.map((item, i)=>{
        if(i==0){
          return <Listitem key={i} type="list-group-item active" text={item.Address}/>
        }else{
          return <Listitem key={i} type="list-group-item" text={item.Address}/>
        }
    });

    return (
				<ul id="list" className="list-group">
          {addresses}
        </ul>
    )
  }
})
