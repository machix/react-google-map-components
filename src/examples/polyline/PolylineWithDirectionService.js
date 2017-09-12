import fpFlow from "lodash/fp/flow";
import fpGet from "lodash/fp/get";
import isEqual from "lodash/isEqual";
import PropTypes from "prop-types";
import React from "react";
import { GoogleMap, Polyline } from "../../modules";

const getPath = fpFlow(
  fpGet(["routes", 0, "overview_path"]),
  JSON.stringify,
  JSON.parse,
);

export class PolylineWithDirectionService extends React.Component {
  static propTypes = {
    style: PropTypes.object,

    zoom: PropTypes.number.isRequired,
    maps: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,

    origin: PropTypes.any,
    travelMode: PropTypes.any,
    destination: PropTypes.any,
  };

  constructor(props, context) {
    super(props, context);

    const { maps: { DirectionsService } } = props;

    this.state = { path: null };
    this.service = new DirectionsService();
  }

  fetchDirections(origin, destination, travelMode) {
    if (origin && destination) {
      this.service.route(
        { origin, travelMode, destination },
        (result, status) => {
          if (status === "OK") {
            this.setState({ path: getPath(result) });
          } else {
            this.setState({ path: null });
          }
        },
      );
    }
  }

  componentWillMount() {
    const { origin, destination, travelMode } = this.props;

    this.fetchDirections(origin, destination, travelMode);
  }

  componentWillReceiveProps(nextProps) {
    const { origin, destination, travelMode } = nextProps;

    if (
      !isEqual(origin, this.props.origin) ||
      !isEqual(destination, this.props.destination) ||
      !isEqual(travelMode, this.props.travelMode)
    ) {
      this.fetchDirections(origin, destination, travelMode);
    }
  }

  render() {
    const { path } = this.state;
    const { maps, zoom, style, center } = this.props;

    return (
      <GoogleMap zoom={zoom} maps={maps} style={style} center={center}>
        {path && <Polyline path={path} />}
      </GoogleMap>
    );
  }
}
