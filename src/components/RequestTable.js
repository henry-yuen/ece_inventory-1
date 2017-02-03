import React, { Component } from 'react';
import '../App.css';
import SubtableRow from '../SubtableRow';
import Request from './Request.js';

var meta;

function getKeys(data) {

	if (data.length == 0)
		return;

	var keys = Object.keys(data[0]);
	var i;
	var ret = [];
	for (i=0; i<keys.length; i++) {
    if (keys[i] === "_id" || keys[i] == "user_id") {
			continue;
		}
		else ret.push(keys[i]);
	}
	return ret;
}

function getValues(data, keys) {
	var i; var j;
	var vals = [];
	for (i=0; i<data.length; i++) {
		var row = [];
		for (j=0; j<keys.length; j++) {
			row.push(String(data[i][keys[j]]).replace(/,/g,', '));
		}
		vals.push(row);
	}
	return vals;
}

class RequestTable extends Component {

	constructor(props) {
		super(props);
		this.state = {
			columnKeys: getKeys(this.props.data),
			rows: getValues(this.props.data, getKeys(this.props.data)),
      isAdmin: this.props.isAdmin
		}
    this.denyButton = this.denyButton.bind(this);
	}



	makeColumnKeyElements(keys) {
		var i;
		var list = [];
		for (i=0; i<keys.length; i++) {
			list.push(<th key={keys[i]+"-requestcol"}> {keys[i]} </th>);
		}
		list.push(<th key={"buttonSpace"}> </th>);
		return list;
	}

	makeRows(rowData) {
		var i;
		var list = [];
		for (i=0; i<rowData.length; i++) {
			var elem;
			var id = this.props.data[i]["_id"] + this.props.data[i]["user_id"] + i;
			elem = (<SubtableRow
					columnKeys={this.props.columnKeys}
					data={rowData[i]}
					idTag={id}
					row={i}
					key={id+"-row"}
					api={this.props.api}
          buttons={this.denyButton(i)}/>)
			list.push(elem);
		}
		return list;
	}

  denyButton(index){
    return(
      <button className="btn btn-primary" onClick={e => this.denyRequest(index)}>
        Deny
      </button>
    );
  }


  denyRequest(index){
    console.log(this.state.rows);

    this.state.rows[index][4] = 'Eat a dick'
    this.forceUpdate();
  }

  render() {
		return (
			<table className="table subtable-body">
			  <thead className="thread">
			    <tr>
		    	  {this.makeColumnKeyElements(this.state.columnKeys)}
			    </tr>
			  </thead>
			  <tbody>
			  	{this.makeRows(this.state.rows)}
			  </tbody>
			</table>
		);
	}


}

export default RequestTable;