import React from "react";
import fpGet from "lodash/fp/get";
import PropTypes from "prop-types";
import fpOmit from "lodash/fp/omit";

import { GoogleMap, Polyline } from "../../modules";

const { google: { maps } } = window;
const defaultCenter = { lat: 40, lng: -89 };
const styles = { map: { minHeight: "320px", height: "100%" } };

const getPath = fpGet("routes.0.overview_path");
const omitProps = fpOmit(["origin", "destination", "travelMode"]);

export default class PolylineContainer extends React.Component {
  static propTypes = {
    origin: PropTypes.string,
    destination: PropTypes.string,
    travelMode: PropTypes.string,
  };

  static defaultProps = {
    draggable: true,
    origin: "chicago, il",
    travelMode: "DRIVING",
    destination: "st louis, mo",
  };

  constructor() {
    super();

    this.state = {
      path: null,
    };
  }

  gettingDirections(props) {
    const { DirectionsService } = maps;
    const { origin, destination, travelMode } = props;

    const directionsService = new DirectionsService();

    if (origin && destination) {
      directionsService.route(
        {
          origin,
          destination,
          travelMode,
        },
        (result, status) => {
          if (status === "OK") {
            this.setState(state => ({
              ...state,
              path: getPath(result),
            }));
          }
        },
      );
    }
  }

  componentDidMount() {
    this.gettingDirections(this.props);
  }

  componentWillReceiveProps(props) {
    this.gettingDirections(props);
  }

  render() {
    const polylineProps = omitProps(this.props);

    return (
      <GoogleMap zoom={6} maps={maps} style={styles.map} center={defaultCenter}>
        {this.state.path && (
          <Polyline
            {...polylineProps}
            strokeColor="#ff0000"
            strokeOpacity={0.5}
            path={this.state.path}
          />
        )}
      </GoogleMap>
    );
  }
}
