import React, { Component } from 'react';
import '../../App.css';

function formatDate(dateString) {
  var i;
  var split = dateString.split(' ');
  var date = '';
  for (i=1; i<=4; i++) {
    date += split[i] + ' ';
  }
  return date;
}

class LoanTableRow extends Component {

	/*
		Row should contain:
			- initiating user
			- date created
			- date last modified
			- items table:
				- name
				- quantity
				- status
				- id (not displayed)
	*/

	constructor(props) {
		super(props);
		this.state = {
			_id: props.params._id,
			user: props.params.user,
			created: props.params.created,
			modified: props.params.modified,
			items: props.params.items,
			itemsModified: props.params.items,
			controlBarVisible: {}
		}
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			_id: newProps.params._id,
			user: newProps.params.user,
			created: newProps.params.created,
			modified: newProps.params.modified,
			items: newProps.params.items,
			itemsModified: newProps.params.items,
		});
	}

	makeItemRows() {
		var items = this.state.items;
		var list = [];
		var i;
		for (i=0; i<items.length; i++) {
			var key = "loan-item-id-"+items[i]._id;

			list.push(
			    <tr key={key}>
			      <td key={key + "-col1"}>{items[i].item.name}</td>
			      <td key={key + "-col2"}>{items[i].quantity}</td>
			      { 
			      	(this.state.controlBarVisible[i]) === true ? this.makeControlBar(i) :
				      (<td className="status-cell" key={key + "-col3"}>
				      	<a href="#" 
					      	onClick={this.makeOnClickShow(i)}
					      	key={key + "-status"}> 
				      		{items[i].status}
				      	</a>
				      </td>
				      )
			  	  }
			  	  <td key={key+"-col-4"}></td>
			    </tr>
			);
		}
		return list;
	}

	makeOnClickShow(i) {  
		var func = this.showControlBar;
		var context = this;
	    return function() {  
	      func(i, context);
	      return false;
	    };  
	} 

	makeOnClickHide(i) {
		var func = this.hideControlBar;
		var context = this;
	    return function() {
	      func(i, context);
	      return false;
	    };  
	}

	showControlBar(itemRow, context) {
		var controlBar = context.state.controlBarVisible;
		controlBar[itemRow] = true;
		context.setState({
			controlBarVisible: controlBar
		});
	}

	hideControlBar(itemRow, context) {
		var controlBar = context.state.controlBarVisible;
		controlBar[itemRow] = false;

		var items = context.state.itemsModified;
		items[itemRow].status = context.state.items[itemRow].status;

		context.setState({
			controlBarVisible: controlBar,
			itemsModified: items
		});
		context.props.callback();
	} 

	makeControlBar(rowIndex) {
		var list = [];
		list.push(
			<td className="control-bar-cell" key={"controlBar-status-"+rowIndex}>
				<div className="btn-group request-type-dropdown">
			        <button type="button" className="btn btn-sm btn-secondary dropdown-toggle  loan-status-dropdown" data-toggle="dropdown">
			          {this.state.itemsModified[rowIndex].status}
			        </button>
			        <div className="dropdown-menu form-control">
			          	<a onClick={() => this.setDropdownStatus(rowIndex, "LENT")} 
			          		className="dropdown-item" href="#">
			            	LENT
			          	</a>
		          		<a onClick={() => this.setDropdownStatus(rowIndex, "DISBURSED")} 
		          			className="dropdown-item" href="#">
			            	DISBURSED
			          	</a>
		          		<a onClick={() => this.setDropdownStatus(rowIndex, "RETURNED")} 
		          			className="dropdown-item" href="#">
			            	RETURNED
			          	</a>
			        </div>
			    </div>
			</td>);

		list.push(
			<td className="control-bar-button" key={"controlBar-button-"+rowIndex}>
				<button onClick={() => this.updateItemStatus(rowIndex)} 
						type="button" 
						className="btn btn-sm btn-primary">
					Apply
				</button>
			</td>);

		list.push(
			<td className="control-bar-button" key={"controlBar-cancel-"+rowIndex}>
				<button onClick={this.makeOnClickHide(rowIndex)} 
						type="button" 
						className="btn btn-sm btn-outline-danger">
					Cancel
				</button>
			</td>);
		return list;
	}

	setDropdownStatus(rowIndex, newStatus) {
		var items = this.state.itemsModified;
		items[rowIndex].status = newStatus;
		this.setState({
			itemsModified: items
		});
	}

	updateItemStatus(rowIndex) {
		var items = this.state.itemsModified;
		var itemId = items[rowIndex].item._id;
		var loanId = this.state._id;
		var param = {items: []};

		for (var i=0; i<items.length; i++) {
			param.items.push({item: itemId, status: items[i].status});
		}

		this.props.api.put("api/loans/"+loanId, param)
		.then(response => {
				console.log(response);
				this.props.callback();
			});

		var controlBar = this.state.controlBarVisible;
		controlBar[rowIndex] = false;

		this.setState({
			controlBarVisible: controlBar
		});
	}

	render() {
		console.log(this.state.items);
		console.log(this.state.itemsModified);
		console.log(this.state.modified);
		return (
		    <li className="list-group-item">
				<div className="container">
		    		<div className="row">
		    			<strong>User: </strong> {this.state.user}
		    		</div>
		    		<div className="row">
		    			<strong>Date Created: </strong> {formatDate(new Date(this.state.created).toString())}
		    		</div>
		    		<div className="row">
		    			<strong>Last Modified: </strong> {formatDate(new Date(this.state.modified).toString())}
		    		</div>
		    		<br></br>
		    		<div className="row">
			    		<table className="table table-sm table-hover">
						  <thead>
						    <tr>
						      <th>Item Name</th>
						      <th>Quantity Loaned</th>
						      <th>Status</th>
						      <th></th>
						    </tr>
						  </thead>
						  <tbody>
						  	{this.makeItemRows()}
						  </tbody>
						</table>
		    		</div>		    		
		    	</div>
			</li>);
	}
}

export default LoanTableRow;