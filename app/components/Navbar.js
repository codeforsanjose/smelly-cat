import React from 'react'
import { render } from 'react-dom'

export default React.createClass({
  propTypes:{
    brand: React.PropTypes.string.isRequired
  },
  getDefaultProps(){
    return{
      brand:"Brand",
      color: 'light'
    }
  },
  render() {
    let navClass;
    if(this.props.color == 'dark'){
      navClass = 'navbar navbar-inverse';
    }else{
      navClass = 'navbar navbar-default';
    }
    return (
      <nav className={navClass}>
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">{this.props.brand}</a>
          </div>
        </div>
      </nav>
    )
  }
})
