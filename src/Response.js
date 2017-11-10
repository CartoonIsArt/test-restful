import React, { Component } from 'react'

export default class Response extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollpased: false
    }
  }
  render() {
    const {
      status,
      className,
      text,
    } = this.props
    const {
      isCollpased
    } = this.state
    return(
      <div>
        <button 
          onClick={ () => this.setState({
            isCollpased: !this.state.isCollpased
          })}
          className={ className }
        >
          { status }
        </button>
        { !isCollpased &&
          <p>
            { text }
          </p>
        }
      </div>
    )
  }
}