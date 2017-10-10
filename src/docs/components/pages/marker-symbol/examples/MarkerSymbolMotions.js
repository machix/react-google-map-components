import React from "react";
import PropTypes from "prop-types";
import { spring, Motion } from "react-motion";
import fpGet from "lodash/fp/get";
import fpFlow from "lodash/fp/flow";
import { Marker } from "../../../../../modules/marker/Marker";
import { MarkerSymbol } from "../../../../../modules/marker/MarkerSymbol";
import { Polyline } from "../../../../../modules/polyline/Polyline";
import { FitBounds } from "../../../../../modules/animations/FitBounds";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { CustomControl } from "../../../../../modules/custom-control/CustomControl";
import Car from "./assets/car.json";

export const pageName = "React-Motion Example";

const getPath = fpFlow(
  fpGet(["routes", 0, "overview_path"]),
  JSON.stringify,
  JSON.parse,
);

class MarkerSymbolMotions extends React.Component {
  static contextTypes = {
    maps: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const { DirectionsService } = context.maps;

    this.state = { path: null, step: 0 };
    this.service = new DirectionsService();
  }

  componentDidMount() {
    this.fetchDirections();
  }

  computeHeading = (a, b) => {
    const { LatLng, geometry } = this.context.maps;

    return geometry.spherical.computeHeading(new LatLng(a), new LatLng(b));
  };

  fetchDirections() {
    this.service.route(
      {
        origin: "san jose, ca",
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
            <FitBounds latLngBounds={path} />

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
              defaultStyle={{ position: 0 }}
              style={{
                position: spring(step, { stiffness: 10, damping: 100 }),
              }}
            >
              {style => {
                const next = Math.floor(style.position);

                return (
                  <div>
                    <Polyline path={path.slice(0, next)} />

                    <Marker
                      position={path[next]}
                      icon={
                        <MarkerSymbol
                          scale={0.7}
                          path={Car.path}
                          strokeColor="#fff"
                          strokeWeight={0.1}
                          fillOpacity={1}
                          fillColor="#404040"
                          anchor={{ x: 10, y: 25 }}
                          rotation={
                            next === 0
                              ? 0
                              : this.computeHeading(path[next - 1], path[next])
                          }
                        />
                      }
                    />
                  </div>
                );
              }}
            </Motion>
          </div>
        )}
      </GoogleMap>
    );
  }
}

export default MarkerSymbolMotions;
