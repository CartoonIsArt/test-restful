import React, { Component } from 'react'

export default class Arg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onKeyEdit: true,
      onValueEdit: false,
    }
  }
  handleValueBtnClick() {
    this.setState({ onValueEdit: true })
  }
  handleValueBlur(e) {
    this.setState({ onValueEdit: false })
    this.props.onValueChange(e.target.value)
  }
  handleKeyBtnClick() {
    this.setState({ onKeyEdit: true })
  }
  handleKeyBlur(e) {
    this.setState({ onKeyEdit: false })
    this.props.onKeyChange(e.target.value)
  }
  render() {
    const {
      onTypeBtnClick,
      onKeyChange,
      onValueChange,
      type,
      keyOfValue,
      value
    } = this.props
    const {
      onKeyEdit,
      onValueEdit,
    } = this.state
    const typeBtnClass = type + " type"
    return (
      <div>
        <div className="flex" style={{ margin: "4px 0px" }}>
          <button onClick={ () => onTypeBtnClick() } className={ type } >
          {
            type === "Number" ?
            0 :
            "S"
          }
          </button>
          {onKeyEdit ? 
            <input 
              defaultValue={ keyOfValue }
              autoFocus
              onBlur={ e => this.handleKeyBlur(e) }
            />
            :
            <button className="key"
              onClick={ () => this.handleKeyBtnClick() }
            >
              { keyOfValue }
            </button>
          }
        </div>
        {onValueEdit ?
          <input 
            defaultValue={ value }
            autoFocus
            onBlur={ e => this.handleValueBlur(e) }
          /> :
          <button className="key outline-grey mute"
            onClick={ () => this.handleValueBtnClick() }
          >
            { value }
          </button>
        }
      </div>
    )
  }
}