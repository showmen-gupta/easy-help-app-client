import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import PropTypes from "prop-types";
import config from "../config";
import googleMapIcon from "google-maps-icons";

const options = { scale: 2, color: "800000" };
const iconUrl = googleMapIcon("dice", options);

class MapContainer extends React.Component {
  handleToggleOpen = () => {};

  handleToggleClose = () => {};

  displayInfoWindow = () => {
    if (this.props.showInfo)
      return (
        <InfoWindow onCloseClick={this.handleToggleClose()}>
          <span>Something</span>
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
          animation={this.props.google.maps.Animation.DROP}
          title={store.title}
          icon={{ url: iconUrl }}
          onClick={() => this.handleToggleOpen()}
        />
      );
    });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 58.96517684, lng: 5.7501957 }}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

const mapStyles = {
  width: "100%",
  height: "100%"
};

MapContainer.propTypes = {
  google: PropTypes.object,
  stores: PropTypes.any,
  title: PropTypes.string,
  showInfo: PropTypes.bool
};

export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer);
