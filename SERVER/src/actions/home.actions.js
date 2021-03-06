import { Http_Get, Http_Post, Http_Put } from '../utils/app.apis'
import { SEARCH_CUSTOMER, REQUEST_ORDER, REQUEST_LINE_ITEMS, UPDATE_ORDER } from '../constants/home.constants'

export const SearchCustomers = dispatch => {
  return searchObject => {
    dispatch ({
      type:"SEARCH_CUSTOMER"
    })
    Http_Get(SEARCH_CUSTOMER+searchObject.value)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"SEARCH_CUSTOMER_SUCCESS",
        customers : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"SEARCH_CUSTOMER_FAILURE",
        error : "Error Message"
      })
    })
  }
}

export const UpdateCustomerValue = dispatch => {
  return searchText => {
    dispatch ({
      type: "UPDATE_CUSTOMER_VALUE",
      searchText: searchText
    })
  }
}

export const ClearCustomers = dispatch => {
  return () => {
    dispatch ({
      type: "CLEAR_CUSTOMERS"
    })
  }
}

export const UpdateCustomers = dispatch => {
  return (customers, serarchValue) => {
    dispatch ({
      type: "UPDATE_CUSTOMERS",
      customers,
      serarchValue
    })
  }
}

export const CustomerSelected = dispatch => {
  return selectedCustomer => {
    dispatch ({
      type:"CUSTOMER_SELECTED",
      selectedCustomer : selectedCustomer
    })
  }
}

export const UpdateOrderOptions = (dispatch) => {
  return (orderOptions, mode, showSpan, sortParam) => {
    dispatch ({
      type:"UPDATE_ORDER_OPTIONS",
      orderOptions : orderOptions,
      mode : mode,
      showSpan : showSpan,
      sortParam : sortParam
    })
  }
}

export const RequestOrders = (dispatch) => {
  return (selectedCustomer, orderOptions, selectedOrder) => {
    dispatch ({
      type:"FETCH_ORDERS"
    })
    let query = selectedCustomer.customerId
    query += "?skip="+((orderOptions && orderOptions.skip) ? orderOptions.skip : 0)
    query += "&limit="+((orderOptions && orderOptions.limit) ? orderOptions.limit : 20)
    query += "&sortby="+((orderOptions && orderOptions.sortby) ? orderOptions.sortby : 'date')
    query += "&sorthow="+((orderOptions && orderOptions.sorthow) ?orderOptions.sorthow : 'desc')
    Http_Get(REQUEST_ORDER+query)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"FETCH_ORDERS_SUCCESS",
        orders : response,
        orderOptions:orderOptions,
        selectedOrder:selectedOrder
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"FETCH_ORDERS_FAILURE",
        error : "Error Message"
      })
    })
  }
}

export const RequestLineItems = dispatch => {
  return (searchLine, options) => {
    dispatch ({
      type:"FETCH_LINE_ITEMS"
    })    
    let query = "?"
    if(searchLine){
      query += "name="+searchLine+"&"
    }
    query += "skip="+options.skip
    query += "&limit="+options.limit
    Http_Get(REQUEST_LINE_ITEMS+query)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"FETCH_LINE_ITEMS_SUCCESS",
        lineItems : response,
        searchLine, options
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"FETCH_LINE_ITEMS_FAILURE",
        error : "Error Message"
      })
    })
  }
}

export const SelectOrder = dispatch => {
  return order => {
    dispatch ({
      type:"SELECT_ORDER",
      order : order
    })
  }
}

export const ToggleLineItemMode = dispatch => {
  return lineItemMode => {
    dispatch ({
      type:"TOGGLE_LINE_ITEM_MODE",
      lineItemMode : lineItemMode
    })
  }
}

export const SelectLineItems = dispatch => {
  return (selectedLines, item) => {
    dispatch ({
      type:"SELECT_LINE_ITEMS",
      selectedLines: selectedLines,
      item : item
    })
  }
}

export const EditLineItems = dispatch => {
  return (item) => {
    dispatch ({
      type:"EDIT_LINE_ITEMS",
      item : item
    })
  }
}

export const UpdateLineUnits = dispatch => {
  return (unit, item) => {
    dispatch ({
      type:"UPDATE_LINE_UNITS",
      unit : unit,
      item : item
    })
  }
}

export const SaveLineItems = dispatch => {
  return (selectedOrder, selectedLines) => {
    let lineItems = selectedOrder.lineItems.concat(selectedLines)
    selectedOrder.lineItems = lineItems
    dispatch ({
      type:"UPDATE_ORDER"
    })
    Http_Put(UPDATE_ORDER, selectedOrder)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"UPDATE_ORDER_SUCCESS",
        success : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"UPDATE_ORDER_FAILURE",
        error : "Error Message"
      })
    })
  }
}

export const SaveLineUnits = dispatch => {
  return (selectedOrder, item) => {
    selectedOrder.lineItems = selectedOrder.lineItems.map(line => {
      if(line.productId === item.productId){
        line = item
      }
      return line
    })
    dispatch ({
      type:"UPDATE_ORDER"
    })
    Http_Put(UPDATE_ORDER, selectedOrder)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"UPDATE_ORDER_SUCCESS",
        success : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"UPDATE_ORDER_FAILURE",
        error : "Error Message"
      })
    })
  }
}

export const RemoveLineItems = dispatch => {
  return (selectedOrder, item) => {
    selectedOrder.lineItems = selectedOrder.lineItems.filter(line => {
      return line.productId !== item.productId
    })
    dispatch ({
      type:"UPDATE_ORDER"
    })
    Http_Put(UPDATE_ORDER, selectedOrder)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      dispatch ({
        type:"UPDATE_ORDER_SUCCESS",
        success : response
      })
    })
    .then(function(myJson) {
      dispatch ({
        type:"UPDATE_ORDER_FAILURE",
        error : "Error Message"
      })
    })
  }
}