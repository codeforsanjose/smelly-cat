import React from 'react'
import { render } from 'react-dom'
import Listitem from './Listitem'

export default React.createClass({
  render() {
    const {Address,PickupDay} = this.props.reminder;

    return (
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <form id="set_alerts">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Setup Alerts</h4>
              </div>
              <div className="modal-body">
              <div className="form-group">
                <label><strong>Address:</strong></label>
                <span id="address"> {Address}</span>
              </div>

              <div className="form-group">
                <label><strong>Pickup Day:</strong></label>
                <span id="pickup_day"> {PickupDay}</span>
              </div>

              <div className="form-group">
                <label><strong>Phone Number:</strong></label>
                <input class="form-control" type="text"/>
              </div>

              <div className="form-group">
                <label><strong> Time (preferred time to receive an sms reminder):</strong></label>
                <input class="form-control" type="text"/>
              </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Set</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
})
