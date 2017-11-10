import React, { Component } from 'react'
import axios from 'axios'
import Arg from './Arg'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      host: "http://localhost:3000/",
      target: '',
      args: [],
    }
  }
  addArg() {
    this.setState({
      args: [
        ...this.state.args,
        {
          type: "String",
          key: "",
          value: ""
        }
      ]
    })
  }
  onValueChange(value, idx) {
    let args = this.state.args
    args[idx].value = value
    this.setState({ args })
  }
  onKeyChange(value, idx) {
    let args = this.state.args
    args[idx].key = value
    this.setState({ args })
  }
  onTypeBtnClick(idx) {
    let args = this.state.args
    args[idx].type = args[idx].type === "Number" ? "String" : "Number"
    this.setState({ args })
  }
  keyValueToObject() {
    let r = {}
    this.state.args.forEach(e => {
      r[e.key] = e.value
    })
    return r
  }
  request(method) {
    let url = this.state.host + this.state.target
    if (method === 'GET') {
      if (this.state.args.length > 0) {
        url = url + '?'
        this.state.args.forEach(e => {
          url = url + e.key + '=' + e.value + '&'
        })
      }
      axios(url)
    }
    else if (["POST", "PUT", "PATCH"].includes(method)) {
      const data = this.keyValueToObject()
      console.log(data)
      axios({
        method,
        url,
        data,
      })
    }
  }
  render() {
    const methods = [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "PATCH"
    ]
    const {
      host,
      target,
      args
    } = this.state
    return (
      <div className="container">
        <h1> RESTFUL TESTPAGE </h1>
        <div className="flex">
          <div className="column">
              URL
              <div className="line" />
              <small> host </small>
              <input 
                value={ host }
                onChange={ e => this.setState({ host: e.target.value })}
                className="fill" 
              />
              <small> target </small>
              <input 
                value={ target }
                onChange={ e => this.setState({ target: e.target.value })}
                className="fill" 
              />
          </div>
          <div className="column">
              <div className="flex space-between">
                Arguments
                <button 
                  onClick={ () => this.addArg() }
                  className="plus" 
                 > + </button>
              </div>
              <div className="line" />
              {args.map((arg, idx) =>
                <Arg
                  key={ idx }
                  type={ arg.type }
                  keyOfValue={ arg.key }
                  value={ arg.value }
                  onTypeBtnClick={() => this.onTypeBtnClick(idx)}
                  onKeyChange={ value => this.onKeyChange(value, idx) }
                  onValueChange={ value => this.onValueChange(value, idx) }
                />
              )}
          </div>
          <div className="column" >
            Method
            <div className="line" />
            {methods.map((method, idx) => 
              <button 
                key={ idx }
                className="method"
                onClick={() => this.request(method)}
              >
                { method }
              </button>
            )}
          </div>
          <div className="column" >
            Response
            <div className="line" />
          </div>
        </div>
      </div>
    )
  }
}