import React from 'react'
import { render } from 'react-dom'
import jquery from 'jquery'
import Addresslist from './Addresslist'

export default React.createClass({
  getInitialState(){
    return {
      value:'',
      hits:''
    }
  },
  handleChange(event){
    this.setState({value: event.target.value});
    console.log(event.target.value);
    this.query(this.state.value);
  },
  handleData(data){
    console.log(data);
    this.setState({hits:data});
  },
  query(address,handleData){
    const url = 'http://192.168.99.100:9200/addresses/_search?q=Address:'+address+'~';
    console.log(url);
    var self = this;
    if(address!==''){
      jquery.ajax({
        'url':url,
        'type':"get",
        success(data){
            self.handleData(data.hits.hits);
        },
        error(err){
            console.log(err);
        }
      })
    }
  },
  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="search">
            <form className="form" id="query">
              <div className="form-group">
                <input type="text"
                       autoComplete="off"
                       className="form-control"
                       placeholder="Search by address"
                       id="address"
                       name="address"
                       value={this.state.value}
                       onChange={this.handleChange}/>
              </div>
              
              <button type="submit" className="btn btn-default hidden">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})
