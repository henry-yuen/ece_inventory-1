import React, { Component } from 'react';
import './App.css';
import InventorySubTable from './InventorySubTable';

class CollapsibleRow extends Component {

	constructor(props) {
		super(props);
		this.state = {
			qty: props.qty
		}
		// props will include what is initially inside each cell in the row
	}

	makeSubtable() {
		/*var tableData = [{
					Model: "123", 
					Description: "LCD oscilloscope", 
					Location: "Hudson",
					Quantity: 10,
					Tags: "heavy, new, expensive, nice, fragile, white"
					},
					{Model: "456", 
					Description: "CRT oscilloscope", 
					Location: "Hudson",
					Quantity: 5,
					Tags: "old"
					}];
					*/
		var tableData = this.props.subItems;
		console.log(tableData);
		return (
			<InventorySubTable 
				data={tableData} 
				itemName={this.props.itemName}
				ref={this.props.itemName+"-component"} 
				hasButton={true}
				isInventorySubtable={true}
				className="subtable-body"/>
		);
	}

	render() {
		var subtable = this.makeSubtable();
		return (
			<div className="panel panel-default">
				<div className="panel-heading inventory-table-row">
		      		<h4 className="panel-title">
		      			<div className="row" data-toggle="collapse" data-parent="#accordion" href={"#"+String(this.props.itemName).replace(/ /g,'')}>
			        		<div className="col-xs-10 panel-font">{this.props.itemName}</div>
			        		<div className="col-xs-2 panel-font"> {this.state.qty} </div>
			        	</div>
		      		</h4>

		    	</div>
		    	<div id={String(this.props.itemName).replace(/ /g,'')} className="panel-collapse collapse">
			      <div className="subtable-body">
			      	{subtable}
			      </div>
    			</div>
		    </div>
		);
	}

}

export default CollapsibleRow