import React from "react";
import PropTypes from "prop-types";
import fpGet from "lodash/fp/get";
import fpFlow from "lodash/fp/flow";
import { FormProps, wrapWithForm } from "../../../../hocs/WrapWithForm";
import { Polyline } from "../../../../../modules/polyline/Polyline";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";

export const pageName = "Complex Example";

const enhancer = wrapWithForm();

const getPath = fpFlow(
  fpGet(["routes", 0, "overview_path"]),
  JSON.stringify,
  JSON.parse,
);

class PolylineComplex extends React.Component {
  static contextTypes = {
    maps: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
  };

  static propTypes = {
    origin: FormProps.oneOf("Origin", [
      "san jose, ca",
      "palo alto, ca",
      "gilroy, ca",
      "salinas, ca",
      "monterey, ca",
    ]),

    destination: FormProps.oneOf("Destination", [
      "san jose, ca",
      "palo alto, ca",
      "gilroy, ca",
      "salinas, ca",
      "monterey, ca",
    ]),
  };

  static defaultProps = {
    origin: "san jose, ca",
    destination: "gilroy, ca",
  };

  constructor(props, context) {
    super(props, context);

    const { maps: { DirectionsService } } = context;

    this.state = { path: null };
    this.service = new DirectionsService();
  }

  componentDidMount() {
    const { origin, destination } = this.props;

    this.fetchDirections(origin, destination);
  }

  componentDidUpdate(prevProps) {
    const { origin, destination } = this.props;

    if (origin !== prevProps.origin || destination !== prevProps.destination) {
      this.fetchDirections(origin, destination);
    }
  }

  fetchDirections(origin, destination) {
    if (origin && destination) {
      this.setState({ path: null });

      this.service.route(
        { origin, destination, travelMode: "DRIVING" },
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

  render() {
    const { path } = this.state;
    const { maps, styles, center } = this.context;

    return (
      <GoogleMap zoom={8} maps={maps} style={styles.map} center={center}>
        {path && <Polyline path={path} />}
      </GoogleMap>
    );
  }
}

export default enhancer(PolylineComplex);
