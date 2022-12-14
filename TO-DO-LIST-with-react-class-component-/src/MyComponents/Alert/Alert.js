import React, { Component } from 'react'

export default class Alert extends Component {
    static defaultProps = {
        type : "primary",
        msg : "something happened !!"
    }
  render() {
    return (
        <div class={`alert alert-${this.props.type} fixed-top fade show bg-opacity-25`} style={{marginTop:"56px"}} role="alert">
            {this.props.msg}
        </div>
    )
  }
}
