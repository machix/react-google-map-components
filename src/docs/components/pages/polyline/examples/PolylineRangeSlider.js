import React from "react";
import PropTypes from "prop-types";

import fpGet from "lodash/fp/get";
import fpFlow from "lodash/fp/flow";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { Polyline } from "../../../../../modules/polyline/Polyline";
import { CustomControl } from "../../../../../modules/custom-control/CustomControl";

export const pageName = "Range Slider Example";

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

  componentDidMount() {
    this.fetchDirections();
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
            <Polyline path={path.slice(0, step)} />

            <CustomControl position="BOTTOM_CENTER">
              <input
                type="range"
                min={0}
                max={path.length}
                step="1"
                value={step}
                onChange={x => this.setState({ step: x.target.value })}
              />
            </CustomControl>
          </div>
        )}
      </GoogleMap>
    );
  }
}

export default PolylineMotions;
