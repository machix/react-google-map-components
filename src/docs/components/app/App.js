import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import MarkerSection from "../pages/marker/MarkerSection";
import PanBySection from "../pages/pan-by/PanBySection";
import PanToSection from "../pages/pan-to/PanToSection";
import PolylineSection from "../pages/polyline/PolylineSection";
import FitBoundsSection from "../pages/fit-bounds/FitBoundsSection";
import GoogleMapSection from "../pages/google-map/GoogleMapSection";
import InfoWindowSection from "../pages/info-window/InfoWindowSection";
import MarkerIconSection from "../pages/marker-icon/MarkerIconSection";
import DataPolygonSection from "../pages/data-polygon/DataPolygonSection";
import ZoomControlSection from "../pages/zoom-control/ZoomControlSection";
import MarkerSymbolSection from "../pages/marker-symbol/MarkerSymbolSection";
import PanToBoundsSection from "../pages/pan-to-bounds/PanToBoundsSection";
import ScaleControlSection from "../pages/scale-control/ScaleControlSection";
import CustomControlSection from "../pages/custom-control/CustomControlSection";
import RotateControlSection from "../pages/rotate-control/RotateControlSection";
import DrawingControlSection from "../pages/drawing-control/DrawingControlSection";
import MapTypeControlSection from "../pages/map-type-control/MapTypeControlSection";
import FullscreenControlSection from "../pages/fullscreen-control/FullscreenControlSection";
import StreetViewControlSection from "../pages/street-view-control/StreetViewControlSection";

export default class App extends React.Component {
  static childContextTypes = {
    maps: PropTypes.object.isRequired,
    center: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired,
  };

  getChildContext() {
    const { google: { maps } } = window;

    return {
      maps,
      center: { lat: 36.964, lng: -122.015 },
      styles: { map: { minHeight: "320px", height: "100%" } },
    };
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <h1 className="mt-3">Basic Components</h1>

          <GoogleMapSection />
          <MarkerSection />
          <MarkerIconSection />
          <MarkerSymbolSection />
          <InfoWindowSection />
          <PolylineSection />

          <h1 className="mt-3">Map Controls</h1>

          <FullscreenControlSection />
          <MapTypeControlSection />
          <RotateControlSection />
          <ScaleControlSection />
          <StreetViewControlSection />
          <ZoomControlSection />

          <CustomControlSection />
          <DrawingControlSection />

          <h1 className="mt-3">Map Transitions</h1>

          <FitBoundsSection />
          <PanBySection />
          <PanToSection />
          <PanToBoundsSection />

          <h1 className="mt-3">Data Layer</h1>

          <DataPolygonSection />
        </div>

        <footer className="footer">
          <nav className="navbar navbar-light bg-light navbar-expand-sm">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://github.com/umidbekkarimov/react-google-map-components"
                >
                  Github
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://twitter.com/umidbek_k">
                  Twitter
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    );
  }
}
