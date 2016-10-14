import React from 'react'
import { render } from 'react-dom'
// import ReactFire from 'reactfire'
// import Firebase from 'firebase'
import Listitem from './Listitem'

// const rootURL = 'https://codeforsanjose-1110.firebaseio.com/';

export default React.createClass({
  // mixins: [ReactFire],
  // getInitialState(){
  //   return {
  //     address : '',
  //     pickupDay : '',
  //     phone : '',
  //     time : '9:00 PM',
  //     uploaded : false
  //   }
  // },
  // componentWillMount(){
  //   this.bindAsObject(new Firebase(rootURL + 'items/'), 'items');
  // },
  handleClick (){

    // const firebaseRef = new Firebase(rootURL + 'items/');
    const userData = {
      address : this.props.reminder.Address,
      pickupDay : this.props.reminder.PickupDay,
      phone : '' + document.getElementById('phone').value,
      time : (document.getElementById('timeVal').value) ? document.getElementById('timeVal').value :'9:00 PM'
    }

    const keyRef = this.firebaseRefs.items.push(userData);
    console.log(keyRef.toString());

    if(keyRef.toString()){
      this.setState(
        {uploaded:true},
        function(){
          console.log(this.state);
      });
    }


  },
  render() {
    const {Address,PickupDay} = this.props.reminder;
    // console.log(this.state);

    return (
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <form id="set_alerts" action="submitUser" method='put'>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Setup Alets</h4>
              </div>
              <div className="modal-body">
                  <div className="form-group">
                    <label><strong>Address:</strong></label>
                    <span id="address"> {Address} </span>
                  </div>

                  <div className="form-group">
                    <label><strong>Pickup Day:</strong></label>
                    <span id="pickup_day"> {PickupDay}</span>
                  </div>

                  <div className="form-group">
                    <label><strong>Phone Number:</strong></label>
                    <input className="form-control" type="text" id="phone"/>
                  </div>

                  <div className="form-group">
                    <label><strong> Time (preferred time to receive an sms reminder):</strong></label>
                    <input className="form-control" type="text" id="timeVal"/>
                  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.handleClick}>Set</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
})
