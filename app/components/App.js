import React from 'react';
import Navbar from './Navbar'
import Addressbar from './Addressbar'
import Addresslist from './Addresslist'

export default React.createClass({
  render() {
    return (
      <div>
        <Navbar color="dark" brand="Trash Pickup Portal"/>
        <Addressbar/>
      </div>
    );
  }
})
