import React from "react";
import { geolocated, geoPropTypes } from "react-geolocated";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import PropTypes from "prop-types";

class InfoForm extends React.Component {
  setLocationData() {
    this.props.fields.lat = this.props.coords.latitude;
    this.props.fields.long = this.props.coords.longitude;
  }

  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div>
        {this.setLocationData()}
        <FormGroup controlId="fullname">
          <FormControl
            value={this.props.fields.fullname}
            type="text"
            onChange={this.props.handleFieldChange}
            placeholder="Full Name"
          />
        </FormGroup>
        <FormGroup controlId="age">
          <FormControl
            value={this.props.fields.age}
            type="number"
            onChange={this.props.handleFieldChange}
            placeholder="Age"
          />
        </FormGroup>
        <FormGroup controlId="phone">
          <FormControl
            value={this.props.fields.phone}
            type="text"
            onChange={this.props.handleFieldChange}
            placeholder="Phone"
          />
        </FormGroup>
        <FormGroup controlId="gender">
          <FormControl
            value={this.props.fields.gender}
            type="text"
            onChange={this.props.handleFieldChange}
            placeholder="Gender"
          />
        </FormGroup>
        <FormGroup controlId="address">
          <FormControl
            value={this.props.fields.address}
            componentClass="textarea"
            onChange={this.props.handleFieldChange}
            placeholder="Address"
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Profile Image</ControlLabel>
          <FormControl onChange={this.props.handleImageChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={this.props.isLoading}
          disabled={!this.props.validateForm()}
        >
          Update
        </LoaderButton>
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

InfoForm.propTypes = {
  ...InfoForm.propTypes,
  ...geoPropTypes,
  fields: PropTypes.any,
  handleFieldChange: PropTypes.func,
  handleImageChange: PropTypes.func,
  validateForm: PropTypes.func,
  isLoading: PropTypes.bool
};

export default geolocated()(InfoForm);
