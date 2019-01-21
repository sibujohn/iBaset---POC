import React, { Component } from 'react'

class AddComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      searchLine : ""
    }
  }
  componentDidMount() {
    this.props.RequestLineItems(this.state.searchLine, {first:0, rows:10})
  }
  updateSearchLine = e =>{
    this.setState({
      searchLine:e.target.value
    })
    this.triggerLineSearch()
  }
  triggerLineSearch = () =>{
    this.props.RequestLineItems(this.state.searchLine, {first:0, rows:10})
  }
  toggleSelectLine = (event, item) =>{
    if(!item.selected){
      this.props.SelectLineItems(this.props.selectedLines, item)
    }
    else{
      this.props.UnSelectLineItems(this.props.selectedLines, item)
    }
  }
  render(){
    return (
      <div className="full-height">
        <form className="search-box w-100" >
            <div className="input-group input-group-sm">
                <input type="text" className="form-control" placeholder="Search lineitem..." value={this.state.searchLine} onChange={this.updateSearchLine}/>
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div>
        </form>
        <div className="add-list-elements scroller">
          <ul className="list-group">
            { this.props.lineItems && this.props.lineItems.map((item, index) =>
              <li className="list-group-item d-flex flex-row align-items-center" key={index} onClick={(e) => this.toggleSelectLine(e, item)}>
                <div className="check-box" >
                  <i className={item.selected ? 'fas fa-check-square' : 'fas fa-square'}></i>
                </div>
                <div className="content-box">
                    <div className="item-name">
                        <label>Item Name: </label>
                        <span>{item.uom}</span>
                    </div>
                    <div className="item-description">
                        <label className="w-100"> 
                            Description:
                        </label>
                        <span className="text-justify">
                          {item.desc}
                        </span>
                    </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default AddComponent
