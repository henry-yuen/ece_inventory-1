import React, { Component } from 'react';
import './App.css';
import RequestSubtable from './RequestSubtable.js';

class RequestPopup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		}
	}

	render() {
		console.log("Rendering with: ");
		console.log(this.state.data);
		var modalBody = this.makeModalBody();
		return (
			<td>
				<button type="button" className="btn btn-primary request-button" data-toggle="modal" 
					data-target={"#requestPopup-"+this.props.itemId}> 
					Request 
				</button>
				<div className="modal fade" 
					id={"requestPopup-"+this.props.itemId}  
					tabIndex="-1" role="dialog" 
					aria-labelledby="modalLabel" 
					aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="modalLabel">
				        	{this.props.itemName + ": " + this.props.modelName}
				        </h5>
				      </div>
				      	{modalBody}
				      <div className="modal-footer">
				        <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
				        <button type="button" className="btn btn-primary">Request</button>
				      </div>
				    </div>
				  </div>
				</div>
			
			</td>
		);
	}

	makeModalBody() {
		console.log("Data is: ");
		console.log(this.state.data);

		return (
		<div className="modal-body row">
			<RequestSubtable
				className="col-xs-12"
				data={this.state.data}
				itemId={this.props.itemId}/>
		</div>
		);
	}

	update(newData) {
		console.log("UPDATING! " + this.props.itemId);
		this.setState({
			data: [{
				Serial: "YES",
				Condition: "YES",
				Status: "YES",
				Quantity: "YES"
			}]
		});
		//this.render();
	}

	// left to do: from InventorySubtable, you need to extract the quantities that were selected per row (from RequestTableRow)
	// using refs, you can call a method that gets all the item id's and then posts a request.
}

export default RequestPopup;