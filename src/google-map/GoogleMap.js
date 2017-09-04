import React from "react";
import PropTypes from "prop-types";
import { LatLngType, MapTypeIdType } from "../internal/Props";
import { MapManager } from "../internal/MapManager";
import { GoogleMapManager } from "./GoogleMapManager";
import { forEachGoogleMapsEvent } from "./GoogleMapHandlers";

const styles = { map: { height: "100%" } };

export class GoogleMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.mapManager = new MapManager(props.maps);
    this.manager = new GoogleMapManager(this.mapManager);
  }

  getChildContext() {
    return { mapManager: this.mapManager };
  }

  componentDidMount() {
    this.manager.attach(this.node, this.props);

    forEachGoogleMapsEvent((event, handler) => {
      this.manager.addListener(event, x => {
        const fn = this.props[handler];

        if (fn) {
          fn(x);
        }
      });
    });
  }

  componentDidUpdate(prevProps) {
    this.manager.update(prevProps, this.props);
  }

  componentWillUnmount() {
    this.manager.detach();
  }

  render() {
    const { style, className } = this.props;

    return (
      <div style={style} className={className}>
        <div style={styles.map} ref={x => (this.node = x)} />

        {this.props.children}
      </div>
    );
  }
}

GoogleMap.childContextTypes = {
  mapManager: PropTypes.instanceOf(MapManager).isRequired,
};

if (__DEV__) {
  GoogleMap.propTypes = {
    /**
     * Google Maps instance.
     */
    maps: PropTypes.object.isRequired,

    /**
     * The initial Map center.
     */
    center: LatLngType.isRequired,

    /**
     * The initial Map zoom level.
     * Valid values: Integers between zero, and up to the supported maximum zoom level.
     */
    zoom: PropTypes.number.isRequired,

    /**
     * The initial Map mapTypeId. Defaults to ROADMAP.
     */
    mapTypeId: MapTypeIdType,

    /**
     * Google Maps child components.
     */
    children: PropTypes.node,

    //
    // Styling
    //

    /**
     * Styles of map div.
     */
    style: PropTypes.object,

    /**
     * Classes of map div.
     */
    className: PropTypes.string,

    /**
     * Color used for the background of the Map div.
     * This color will be visible when tiles have not yet loaded as the user pans.
     * This option can only be set when the map is initialized.
     */
    backgroundColor: PropTypes.string,

    //
    // Events
    //

    /**
     * This handler is called when the user clicks on the map.
     * An ApiMouseEvent with properties for the clicked location is returned unless a place icon was clicked,
     * in which case an IconMouseEvent with a placeid is returned.
     * IconMouseEvent and ApiMouseEvent are identical, except that IconMouseEvent has the placeid field.
     * The event can always be treated as an ApiMouseEvent when the placeid is not important.
     * The click event is not fired if a marker or infowindow was clicked.
     */
    onClick: PropTypes.func,

    /**
     * This handler is called when the user double-clicks on the map.
     *
     * Note that the click event will also fire, right before this one.
     */
    onDoubleClick: PropTypes.func,

    /**
     * This handler is called when the DOM context menu event is fired on the map container.
     */
    onRightClick: PropTypes.func,

    /**
     * This handler is called whenever the user's mouse moves over the map container.
     */
    onMouseMove: PropTypes.func,

    /**
     * This handler is called when the user's mouse exits the map container.
     */
    onMouseOut: PropTypes.func,

    /**
     * This handler is called when the user's mouse enters the map container.
     */
    onMouseOver: PropTypes.func,

    /**
     * This handler is repeatedly called while the user drags the map.
     */
    onDrag: PropTypes.func,

    /**
     * This handler is called when the user stops dragging the map.
     */
    onDragEnd: PropTypes.func,

    /**
     * This handler is called when the user starts dragging the map.
     */
    onDragStart: PropTypes.func,

    /**
     * This handler is called when the map becomes idle after panning or zooming.
     */
    onIdle: PropTypes.func,

    /**
     * This handler is called when the visible tiles have finished loading.
     */
    onTilesLoaded: PropTypes.func,

    /**
     * This handler is called when the map tilt property changes.
     */
    onTiltChanged: PropTypes.func,

    /**
     * This event is fired when the map zoom property changes.
     */
    onZoomChanged: PropTypes.func,

    /**
     * This handler is called when the viewport bounds have changed.
     */
    onBoundsChanged: PropTypes.func,

    /**
     * This handler is called when the map center property changes.
     */
    onCenterChanged: PropTypes.func,

    /**
     * This handler is called when the map heading property changes.
     */
    onHeadingChanged: PropTypes.func,

    /**
     * This handler is called when the `mapTypeId` property changes.
     */
    onMapTypeIdChanged: PropTypes.func,

    /**
     * This handler is called when the projection has changed.
     */
    onProjectionChanged: PropTypes.func,
  };
}
