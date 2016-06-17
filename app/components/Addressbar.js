import React from 'react'
import { render } from 'react-dom'
import jquery from 'jquery'
import Addresslist from './Addresslist'
import Result from './Result'

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
    console.log(event.target.value.toUpperCase());
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
    this.setState({result:false});
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
    document.addEventListener("keydown", this.navigate, false);
  },
  query(address,handleData){
    const url = 'http://192.168.99.100:9200/addresses/_search?q=Address:'+address+'~';

    const self = this;
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
    debugger;
    let hits = this.state.hits;
    let index = this.state.selected;
    this.setState({hauler:hits[index]}, function () {
        this.setState({result:true});
        debugger;
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

              {this.state.result ? result : <Addresslist list={this.state.hits}
                                                         selected={this.state.selected}
                                                         update={this.updateVal} />
              }

              <button type="submit" className="btn btn-default hidden">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})
