import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import FilterBox from './FilterBox.js';
import ErrorMessage from './ErrorMessage.js';

var filterNames = ["name", "model_number", "required_tags", "excluded_tags"];

class PaginationContainer extends Component {

	/*
		Props contain:
			- component that will be rendered
			- extra props that aren't common among all components that are renderd by this class
			- data processing method to feed the component.
			- URL to query for items
	*/
	
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			initialLoad: true,
			page: 1,
			rowsPerPage: 10,
			errorHidden: true,
			error: {
				title: "",
				message: ""
			},
      		filters: {
		        name: "",
		        model_number: "",
		        excluded_tags: "",
		        required_tags: ""
      		}
		};
	}

	componentWillMount() {
		this.instance = axios.create({
		  baseURL: 'https://' + location.hostname + ':3001',
		  headers: {'Authorization': localStorage.getItem('token')}
		});
		this.loadData(1, false);
	}

	loadData(page, justDeleted) {
	  if (page <= 0) {
	    document.getElementById("pageNum").value = this.state.page;
	    return;
	  }

	  this.instance.get(this.getURL(page, this.state.rowsPerPage))
	  .then(function (response) {
	    if (this.state.initialLoad) {
	      this.setState({initialLoad: false});
	    }
	    // reponse is empty:
	    if (response.data.length === 0) {
	      if (page === 1) {
	        this.setState({items: []});
	        this.renderError('', "No results to show!");
	      } else {
	        document.getElementById("pageNum").value = this.state.page;
	        if (justDeleted === true) {
	        	this.previousPage();
	        }
	        else {
	        	this.renderError('', "Page does not exist!");
	        }
	      }
	    }
	    // response not empty:
	    else {		  
	      this.setState({
	        items: this.props.processData(response),
	        page: page
	      });
		  
	      document.getElementById("pageNum").value = page;
	    }
	  }.bind(this));
	}

	previousPage() {
		this.loadData(this.state.page - 1, false);
	}

	nextPage() {
		this.loadData(this.state.page + 1, false);
	}

	getURL(page, rowsPerPage) {
		var url = this.props.url
		  + '?page=' + page
		  +'&per_page='+rowsPerPage;
		
		filterNames.forEach(function(filterName) {
		  if (this.state.filters[filterName]) {
		    url += "&" + filterName + "=" + this.state.filters[filterName];
		  }
		}.bind(this));

		return url;
	}

	filterItems(name, modelNumber, requiredTags, excludedTags) {
	    this.setState({
	      page: 1,
	      filters: {
	        name: name,
	        model_number: modelNumber,
	        required_tags: requiredTags,
	        excluded_tags: excludedTags
	      }
	    }, function () {
	      this.loadData(1, false);
	    });
  	}

  	setRowCount(numRows) {
    	this.state.rowsPerPage = numRows;
    	this.loadData(1, false);
  	}

	makePageBox() {
    	return (
      	<input type="text" defaultValue={this.state.page} className="form-control pagenum-textbox" id="pageNum"></input>
    	);
  	}

	makePageGoButton() {
		return(
		  <button type="button"
		    className="btn btn-primary"
		    onClick={e=> this.loadData(document.getElementById('pageNum').value, false)}>
		    GO
		  </button>
		);
		//
	}

	renderError(title, message) {
	    this.setState({
	      errorHidden: false,
	      error: {
	        title: title,
	        message: message
	      }
	    });		
	}

	makePerPageController() {
	    return(
	      <div className="btn-group">
	        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	          Items per Page
	        </button>
	        <div className="dropdown-menu rowcount-dropdown">
	          <a onClick={()=>this.setRowCount(5)} className="dropdown-item" href="#">
	            {5}
	          </a>
	          <a onClick={()=>this.setRowCount(10)} className="dropdown-item" href="#">
	            {10}
	          </a>
	          <a onClick={()=>this.setRowCount(15)} className="dropdown-item" href="#">
	            {15}
	          </a>
	          <a onClick={()=>this.setRowCount(20)} className="dropdown-item" href="#">
	            {20}
	          </a>
	          <a onClick={()=>this.setRowCount(25)} className="dropdown-item" href="#">
	            {25}
	          </a>
	          <a onClick={()=>this.setRowCount(30)} className="dropdown-item" href="#">
	            {30}
	          </a>
	          <a onClick={()=>this.setRowCount(35)} className="dropdown-item" href="#">
	            {35}
	          </a>
	          <a onClick={()=>this.setRowCount(40)} className="dropdown-item" href="#">
	            {40}
	          </a>
	          <a onClick={()=>this.setRowCount(45)} className="dropdown-item" href="#">
	            {45}
	          </a>
	          <a onClick={()=>this.setRowCount(50)} className="dropdown-item" href="#">
	            {50}
	          </a>
	        </div>
	      </div>
	      );
	}

	render() {
	    var table = null;
		var TableComp = this.props.renderComponent;

	    if (this.state.initialLoad) {
	      table = (<div></div>);
	    } else if (this.state.items.length === 0) {
	      table = (<div className="center-text">No items found.</div>);
	    } else {
	      table = (<TableComp
	        data={this.state.items}
	        api={this.instance}
	        callback={e => this.loadData(this.state.page, e)}/>);
	    }
	    return (
	      <div className="row inventory-page">
	        <div className="col-md-3">
	            <FilterBox
	              api={this.instance}
	              filterItems={this.filterItems.bind(this)}
	            />
	        </div>

	        <div className="col-md-9">
	          <div className="row page-section">
	              <div className="col-md-3">
	                <nav aria-label="page-buttons">
	                  <ul className="pagination">
	                    <li className="page-item">
	                      <a onClick={e=> this.previousPage()} className="page-link" href="#">
	                        <span className="fa fa-chevron-left"></span>
	                      </a>
	                    </li>
	                    <li className="page-item">
	                      <a onClick={e=> this.nextPage()} className="page-link" href="#">
	                        <span className="fa fa-chevron-right"></span>
	                      </a>
	                    </li>
	                    <li className="page-item">{this.makePageBox()}</li>
	                    <li className="page-item">{this.makePageGoButton()}</li>
	                  </ul>
	                </nav>
	              </div>

	              <div className="col-md-3">
	                {this.makePerPageController()}
	              </div>

	              <div className="col-md-6" id="error-region">
	                <ErrorMessage
	                  key={"errormessage"}
	                  title={this.state.error.title}
	                  message={this.state.error.message}
	                  hidden={this.state.errorHidden}
	                  hideFunction={()=> this.state.errorHidden=true}/>
	              </div>

	          </div>

	          <div className="row">
	            {table}
	          </div>
	        </div>
	      </div>
	      );
	}
}

export default PaginationContainer;