import _ from "lodash";
import React, { Component } from "react";
import { findDOMNode } from "react-dom";

/*
  Adapted from Apparatus:
  https://github.com/cdglabs/apparatus/blob/master/src/View/Generic/EditableText.coffee
 */

class EditableText extends Component {

  shouldComponentUpdate(nextProps) {
    return this._isDirty || nextProps.value !== this.props.value
  }

  render() {
    const { value } = this.props;
    return (
      <div contentEditable="true"
           onInput={this._onInput.bind(this)}
           onKeyDown={this._onKeyDown.bind(this)}
           onFocus={this._onFocus.bind(this)}
           onBlur={this._onBlur.bind(this)}
           value={value} />
    )
  }

  componentDidMount() {
    this._refresh();
    // Autofocus if empty string value
    const { value } = this.props
    if (value === "" || !value) {
      findDOMNode(this).focus();
    }
  }

  componentDidUpdate() {
    this._refresh();
  }

  _refresh() {
    const el = findDOMNode(this);
    const { value } = this.props
    if (el.textContent !== value) {
      el.textContent = value;
    }
    this._isDirty = false;
  }

  _onInput() {
    this._isDirty = true;
    const el = findDOMNode(this);
    this.props.setValue(el.textContent);
  }

  _onFocus() {
    findDOMNode(this).classList.add("focus")
  }

  _onBlur() {
    findDOMNode(this).classList.remove("focus")
  }

  _onKeyDown(e) {
    if (e.keyCode === 13) { // Enter
      e.preventDefault();
    }
  }

}

export default EditableText;