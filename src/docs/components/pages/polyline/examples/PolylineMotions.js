import React from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";

import fpGet from "lodash/fp/get";
import fpFlow from "lodash/fp/flow";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { Polyline } from "../../../../../modules/polyline/Polyline";
import { CustomControl } from "../../../../../modules/custom-control/CustomControl";

export const pageName = "React-Motion Example";

const getPath = fpFlow(
  fpGet(["routes", 0, "overview_path"]),
  JSON.stringify,
  JSON.parse,
);

class PolylineMotions extends React.Component {
  static contextTypes = {
    maps: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const { maps: { DirectionsService } } = context;

    this.state = { path: null, step: 0 };
    this.service = new DirectionsService();
  }

  fetchDirections() {
    this.service.route(
      {
        origin: "monterey, ca",
        waypoints: [
          { stopover: true, location: "salinas, ca" },
          { stopover: true, location: "gilroy, ca" },
          { stopover: true, location: "san jose, ca" },
        ],
        destination: "palo alto, ca",
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          this.setState({ path: getPath(result) });
        } else {
          this.setState({ path: null });
        }
      },
    );
  }

  componentDidMount() {
    this.fetchDirections();
  }

  render() {
    const { path, step } = this.state;
    const { maps, center } = this.context;

    return (
      <GoogleMap
        zoom={9}
        maps={maps}
        style={{ height: "600px" }}
        center={center}
      >
        {path && (
          <div>
            <Polyline path={path} strokeOpacity={0.3} />

            <CustomControl position="BOTTOM_CENTER">
              {step === 0 ? (
                <button
                  className="btn btn-primary mb-1"
                  onClick={() => this.setState({ step: path.length - 1 })}
                >
                  Start
                </button>
              ) : (
                <button
                  className="btn btn-primary mb-1"
                  onClick={() => this.setState({ step: 0 })}
                >
                  Revert
                </button>
              )}
            </CustomControl>

            <Motion
              defaultStyle={{ x: 0 }}
              style={{ x: spring(step, { stiffness: 10, damping: 26 }) }}
            >
              {style => <Polyline path={path.slice(0, style.x)} />}
            </Motion>
          </div>
        )}
      </GoogleMap>
    );
  }
}

export default PolylineMotions;
