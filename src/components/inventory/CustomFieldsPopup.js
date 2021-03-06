import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Select from 'react-select';

const types = [
    { value: 'SHORT_STRING', label: 'SHORT_STRING' },
    { value: 'LONG_STRING', label: 'LONG_STRING' },
    { value: 'INT', label: 'INT' },
    { value: 'FLOAT', label: 'FLOAT' }];


class CustomFieldsPopup extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			type: "",
			isPrivate: false,
      perInstance: false
		}
	}

	handleInputChange(event) {
    var newState = {};
    newState[event.target.name] = event.target.checked;
    this.setState(newState);
  }

	handleTypeChange(value){
		this.setState({
			type: value,
		});
	}

	makeForm(){
		var name =
			<input type="text"
				className="form-control"
				ref={"field_name"}
				key={"field_name"}>
			</input>

		var type =
			<Select
				simpleValue
				value={this.state.type}
	      		ref={"field_type"}
				clearable={true}
				placeholder="Choose Type"
				options={types}
				onChange={this.handleTypeChange.bind(this)}
	      		key={"field_type"}/>

		var is_private =
			<input type="checkbox"
	      		checked={this.state.isPrivate}
				onChange={this.handleInputChange.bind(this)}
				key={"field_isPrivate"}
        		name="isPrivate">
			</input>

    var perInstance =
      <input type="checkbox"
        checked={this.state.perInstance}
        onChange={this.handleInputChange.bind(this)}
        name="perInstance"
        key={"field_perInstance"}>
      </input>

		return (

			<div>
				<div className="form-group" key={"createform-div-row-"}>
				  <label htmlFor={"createform-row-"}>Name</label>
				  {name}
			  </div>

			  <div className="form-group">
					<label htmlFor={"createform-row-"}>Type</label>
					{type}
				</div>

				<div className="form-group row customfield-maker-isprivate">
					<div className="col-xs-10">
						<label htmlFor={"createform-row-"}>Private</label>
					</div>
					<div className="col-xs-2 customfield-maker-checkbox">
						{is_private}
					</div>
				</div>
        		<div className="form-group row customfield-maker-isprivate">
					<div className="col-xs-10">
						<label htmlFor={"createform-row-"}>Per Instance</label>
					</div>
					<div className="col-xs-2 customfield-maker-checkbox">
						{perInstance}
					</div>
				</div>
			</div>
		);
	}

 	clearForm() {
	    this.refs.field_name.value = "";
	    this.setState({
	      type: "",
	      isPrivate: false,
	    });
  	}

 	onSubmission() {
		var custom_field = {
			name: this.refs.field_name.value,
			type: this.state.type,
			isPrivate: this.state.isPrivate,
      perInstance: this.state.perInstance
		}

	    if(!custom_field.name){
	      alert("Must add name");
	    }
	    else if(!custom_field.type){
	      alert("Must specify type");
	    }
	    else {
	      this.props.api.post('/api/customFields/', custom_field)
	  	  	.then(function(response) {
	  	        if (response.data.error) {
	          		console.log(response.data.error);
	  	        } else {
	              alert("Custom Field made successfully");
	              this.clearForm();
	  						this.props.callback();
	  	        }
	  	      }.bind(this))
	  	      .catch(function(error) {
	  	        console.log(error);
	  	      }.bind(this));
	    }
  	}

	render() {
		var button =
			<a className="nav-link userpage-tab" href="#"
				data-toggle="modal"
				data-target={"#makeCustomFieldModal"}>
				Make Field
			</a>

		return (
		<div>
			{button}
			<div className="modal fade"
				id={"makeCustomFieldModal"}
				tabIndex="-1"
				role="dialog"
				aria-labelledby="createLabel"
				aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content customfield-editor-modal">
			      <div className="modal-header">
			        <h5 className="modal-title" id="createLabel">Create New Field</h5>
			      </div>
			      <div className="modal-body">
			        {this.makeForm()}
			      </div>
			      <div className="modal-footer">
              		<button onClick={e => {this.clearForm()}} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      		     	<button onClick={e => {this.onSubmission()}} type="button" className="btn btn-primary">Submit</button>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
		);
	}

}

export default CustomFieldsPopup
