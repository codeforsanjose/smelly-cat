import React from 'react'
import { render } from 'react-dom'

export default React.createClass({
  render() {

    return (
      <div className="thumbnail text-center detail">
        <div>
          <span>
            <button type="button" id="get_notified" className="btn btn-info btn-xs" data-toggle="modal" data-target="#myModal">Get Notified</button>
          </span>
        </div>
        <h3 className="detail-address text-primary">
          {this.props.address}
        </h3>
        <h3 className="detail-day text-primary">
          Pickup Day: {this.props.pickup}
        </h3>
      </div>
    )
  }
})
