import React from 'react'
import { render } from 'react-dom'
import jquery from 'jquery'
import Addresslist from './Addresslist'

export default React.createClass({
  getInitialState(){
    return {
      value:'',
      hits:[]
    }
  },
  handleChange(event){
    this.setState({value: event.target.value.toUpperCase()});
    this.query(this.state.value);
  },
  handleData(data){
    const list = [];

    const hits = data.map((arr)=>{
      list.push(arr._source);
    });

    this.setState({hits:list,selected:0});
  },
  navigate(event){
    if(event.keyCode==40){
      let selected = this.state.selected;
      let hits = this.state.hits;
      console.log(selected);

      if(selected < hits.length-1){
        let latest_selected = this.state.selected+1;
        console.log(latest_selected);
        this.setState({selected:latest_selected});
      }
    }

    if(event.keyCode==38){
      let selected = this.state.selected;
      let hits = this.state.hits;

      if(selected > 0){
        const latest_selected = this.state.selected-1;
        console.log(latest_selected);
        this.setState({selected:latest_selected});
      }
    }
  },
  componentDidMount(){
    document.addEventListener("keydown", this.navigate, false);
  },
  query(address,handleData){
    const url = 'http://192.168.99.100:9200/addresses/_search?q=Address:'+address+'~';

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
                       onChange={this.handleChange} />
              </div>
              <Addresslist list={this.state.hits} selected={this.state.selected} />
              <button type="submit" className="btn btn-default hidden">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})
