import React from "react";
import PropTypes from "prop-types";

import "./App.css";
import GoogleMapSection from "../pages/google-map/GoogleMapSection";
import FullscreenControlSection from "../pages/fullscreen-control/FullscreenControlSection";
import MapTypeControlSection from "../pages/map-type-control/MapTypeControlSection";
import RotateControlSection from "../pages/rotate-control/RotateControlSection";
import ScaleControlSection from "../pages/scale-control/ScaleControlSection";
import StreetViewControlSection from "../pages/street-view-control/StreetViewControlSection";
import ZoomControlSection from "../pages/zoom-control/ZoomControlSection";
import CustomControlSection from "../pages/custom-control/CustomControlSection";
import FitBoundsSection from "../pages/fit-bounds/FitBoundsSection";
import PanBySection from "../pages/pan-by/PanBySection";
import PanToSection from "../pages/pan-to/PanToSection";
import PanToBoundsSection from "../pages/pan-to-bounds/PanToBoundsSection";
import MarkerSection from "../pages/marker/MarkerSection";
import MarkerIconSection from "../pages/marker-icon/MarkerIconSection";
import InfoWindowSection from "../pages/info-window/InfoWindowSection";
import PolylineSection from "../pages/polyline/PolylineSection";
import DataPolygonSection from "../pages/data-polygon/DataPolygonSection";
import DrawingControlSection from "../pages/drawing-control/DrawingControlSection";

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
      <div className="container-fluid">
        <h1 className="mt-3">Basic Components</h1>

        <GoogleMapSection />
        <MarkerSection />
        <MarkerIconSection />
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
    );
  }
}
