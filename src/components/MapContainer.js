import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PropTypes from "prop-types";
import config from "../config";

class MapContainer extends React.Component {
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
          onClick={() => console.log("You clicked me!")}
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
  width: "75%",
  height: "75%"
};

MapContainer.propTypes = {
  google: PropTypes.object,
  stores: PropTypes.any,
  title: PropTypes.string
};

export default GoogleApiWrapper({
  apiKey: config.API_KEY
})(MapContainer);
