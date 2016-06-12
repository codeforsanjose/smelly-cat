import React from 'react'
import { render } from 'react-dom'

export default React.createClass({

  render() {
    return (
      <div className="container">
  			<div className="row">
  				<div id="place_holder">
  					<div>
  						<ul id="list" className="list-group">
                {this.props.hits}
              </ul>
  					</div>
  				</div>
  			</div>

  			<div id="details"></div>
  		</div>
    )
  }
})
