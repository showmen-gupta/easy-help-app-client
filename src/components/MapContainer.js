import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import PropTypes from "prop-types";
import config from "../config";
import googleMapIcon from "google-maps-icons";
import { Button } from "react-bootstrap";

const options = { scale: 2, color: "800000" };
const iconUrl = googleMapIcon("dice", options);

class MapContainer extends Component {
  state = {
    activeMarker: {},
    title: {},
    position: {},
    address: "",
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) => {
    console.log(props);
    this.setState({
      activeMarker: marker,
      title: props.title,
      position: props.position,
      address: props.address,
      showingInfoWindow: true
    });
  };

  onInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  };

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  displayInfoWindow = () => {
    return (
      <InfoWindow
        marker={this.state.activeMarker}
        onClose={this.onInfoWindowClose}
        visible={this.state.showingInfoWindow}
      >
        <div>
          <h4>{this.state.title}</h4>
          <div>{this.state.address}</div>
          <div>
            {this.state.position.lat}, {this.state.position.lng}
          </div>
          <div>
            <Button>Connect</Button>
          </div>
        </div>
      </InfoWindow>
    );
  };

  displayMarkers = () => {
    return this.props.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          title={store.title}
          icon={{ url: iconUrl }}
          onClick={this.onMarkerClick}
          address={store.address}
        />
      );
    });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={{ lat: 58.96517684, lng: 5.7501957 }}
        onClick={this.onMapClicked}
      >
        {this.displayMarkers()}
        {this.displayInfoWindow()}
      </Map>
    );
  }
}

const mapStyles = {
  width: "100%",
  height: "100%",
  position: "relative"
};

MapContainer.propTypes = {
  google: PropTypes.object,
  stores: PropTypes.any,
  title: PropTypes.string,
  address: PropTypes.string,
  showInfo: PropTypes.bool
};

export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer);
