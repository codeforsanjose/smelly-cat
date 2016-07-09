import React from 'react'
import { render } from 'react-dom'
import jquery from 'jquery'
window.$ = window.jQuery = require('jquery');
const Bootstrap = require('bootstrap');
Bootstrap.$ = $;
import Addresslist from './Addresslist'
import Result from './Result'
import Modal from './Modal'

export default React.createClass({
  getInitialState(){
    return {
      value:'',
      hits:[],
      hauler:[],
      selected:'',
      result: false
    }
  },
  handleChange(event){
    this.setState({result:false});

    this.setState({value: event.target.value.toUpperCase()},function(){
      this.query(this.state.value);
    });
  },
  handleData(data){
    const list = [];

    const hits = data.map((arr)=>{
      list.push(arr._source);
    });

    this.setState({hits:list,selected:0});
  },
  navigate(event){
    //navigate down the list
    if(event.keyCode==40){
      let selected = this.state.selected;
      let hits = this.state.hits;

      if(selected < hits.length-1){
        let latest_selected = this.state.selected+1;
        this.setState({selected:latest_selected});
        this.setState({hauler:hits[latest_selected]});
        this.setState({value:hits[latest_selected].Address});
      }
    }

    //navigate up the list
    if(event.keyCode==38){
      let selected = this.state.selected;
      let hits = this.state.hits;

      if(selected > 0){
        const latest_selected = this.state.selected-1;
        this.setState({selected:latest_selected});
        this.setState({hauler:hits[latest_selected]});
        this.setState({value:hits[latest_selected].Address});
      }
    }
  },
  componentDidMount(){
    jquery.ajax({
      'url':window.location.href+'getEnv',
      'type':"get"
    }).done(function(res){
      if(res=='development'){
        this.setState({base_url:'http://192.168.99.100'});
      }else{
        this.setState({base_url:'http://localhost'});
      }
    }.bind(this));

    document.addEventListener("keydown", this.navigate, false);
  },
  query(address,handleData){
    const self = this;
    const base_url = self.state.base_url;
    const url = base_url+':9200/addresses/_search?q=Address:'+address+'~';

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
  updateVal(obj){
    this.setState({value:obj.name,selected:obj.index});
    this.getHaulerData();
  },
  getHaulerData(){
    let hits = this.state.hits;
    let index = this.state.selected;
    this.setState({hauler:hits[index]}, function () {
        this.setState({result:true});
        this.setState({value:hits[index].Address});
    });
  },
  handleSubmit(event){
    event.preventDefault();
    this.getHaulerData();
  },
  render() {
    const hauler_data = this.state.hauler;
    const result = <Result address={hauler_data.Address} pickup={hauler_data.PickupDay} />;

    if(this.state.value==""){
      this.state.hits=[];
    }

    return (
      <div className="container">
        <div className="row">
          <div id="search">
            <form className="form" id="query" onSubmit={this.handleSubmit}>
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

              <button type="submit" className="btn btn-default hidden">Submit</button>
            </form>
            {this.state.result ? result : <Addresslist list={this.state.hits}
                                                       selected={this.state.selected}
                                                       update={this.updateVal} />
            }

            <Modal reminder={this.state.hauler}/>
          </div>
        </div>
      </div>
    )
  }
})
