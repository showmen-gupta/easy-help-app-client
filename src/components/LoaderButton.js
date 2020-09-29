import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "../styles/css/LoaderButton.css";
import PropTypes from "prop-types";

class LoaderButton extends React.Component {
  render() {
    return (
      <Button
        block
        type="submit"
        bsSize="large"
        className={this.props.className}
        disabled={this.props.disabled || this.props.isLoading}
      >
        {this.props.isLoading && (
          <Glyphicon glyph="refresh" className="spinning" />
        )}
        {this.props.children}
      </Button>
    );
  }
}

LoaderButton.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.any
};

export default LoaderButton;
