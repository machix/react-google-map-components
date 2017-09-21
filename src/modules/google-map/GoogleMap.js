import PropTypes from "prop-types";
import React from "react";
import { MapContext } from "../internal/MapContext";
import { createListeners } from "../internal/Utils";
import GoogleMapEvents from "./GoogleMapEvents";
import { GoogleMapManager } from "./GoogleMapManager";

const styles = { map: { height: "100%" } };

/**
 * Draws `google.maps.Map`.
 *
 * **Usage:**
 *
 * ```javascript
 * import React from "react";
 * import { GoogleMap } from "react-google-map-components"
 *
 * export default function GoogleMapWrapper(props) {
 *   return <GoogleMap {...props} maps={google.maps} />
 * }
 * ```
 *
 * **Google Maps Docs:**
 * * [google.maps.Map](https://developers.google.com/maps/documentation/javascript/reference#Map)
 * * [google.maps.MapOptions](https://developers.google.com/maps/documentation/javascript/reference#MapOptions)
 */
export class GoogleMap extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.manager = new GoogleMapManager(props.maps);
  }

  getChildContext() {
    return { mapContext: this.manager.context };
  }

  componentDidMount() {
    const listeners = createListeners(GoogleMapEvents, x => this.props[x]);

    this.manager.attach(this.node, this.props, listeners);
    this.forceUpdate();
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

        {Boolean(this.manager.map) && this.props.children}
      </div>
    );
  }
}

GoogleMap.childContextTypes = {
  mapContext: PropTypes.instanceOf(MapContext),
};

GoogleMap.defaultProps = {
  mapTypeId: "ROADMAP",

  clickableIcons: true,
  disableDoubleClickZoom: true,
};

/* istanbul ignore else */
if (process.env.NODE_ENV !== "production") {
  GoogleMap.propTypes = {
    /**
     * Loaded `google.Maps` instance.
     */
    maps: PropTypes.object.isRequired,

    /**
     * The initial Map `center`.
     */
    center: PropTypes.shape({
      /**
       * The latitude in degrees.
       */
      lat: PropTypes.number.isRequired,
      /**
       * The longitude in degrees.
       */
      lng: PropTypes.number.isRequired,
    }).isRequired,

    /**
     * The initial Map `zoom` level.
     */
    zoom: PropTypes.number.isRequired,

    /**
     * The initial Map `mapTypeId`.
     */
    mapTypeId: PropTypes.oneOf(["HYBRID", "ROADMAP", "SATELLITE", "TERRAIN"]),

    /**
     * Google Maps child components.
     */
    children: PropTypes.node,

    /**
     * When `false`, map icons are not clickable.
     *
     * A map icon represents a point of interest, also known as a POI.
     */
    clickableIcons: PropTypes.bool,

    /**
     * Enables/disables `zoom` and `center` on double click.
     */
    disableDoubleClickZoom: PropTypes.bool,

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
     * Color used for the background of the Map.
     *
     * This color will be visible when tiles have not yet
     * loaded as the user pans.
     */
    backgroundColor: PropTypes.string,

    //
    // Events
    //

    /**
     * This handler is called when the user clicks on the map.
     *
     * An `ApiMouseEvent` with properties for the clicked location is returned
     * unless a place icon was clicked, in which case an `IconMouseEvent`
     * with a `placeid` is returned.
     *
     * `IconMouseEvent` and `ApiMouseEvent` are identical, except that
     * `IconMouseEvent` has the `placeid` field.
     *
     * The event can always be treated as an `ApiMouseEvent` when the
     * `placeid` is not important.
     *
     * The click event is not fired if a `Marker` or `InfoWindow` was clicked.
     */
    onClick: PropTypes.func,

    /**
     * This handler is called when the user double-clicks on the map.
     *
     * Note that the `onClick` handler will be also called,
     * right before this one.
     */
    onDoubleClick: PropTypes.func,

    /**
     * This handler is called when the DOM context menu event is
     * fired on the map container.
     */
    onRightClick: PropTypes.func,

    /**
     * This handler is called whenever the user's mouse moves over
     * the map container.
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
     * This handler is called when the map `tilt` property changes.
     */
    onTiltChanged: PropTypes.func,

    /**
     * This event is fired when the map `zoom` property changes.
     */
    onZoomChanged: PropTypes.func,

    /**
     * This handler is called when the viewport bounds have changed.
     */
    onBoundsChanged: PropTypes.func,

    /**
     * This handler is called when the map `center` property changes.
     */
    onCenterChanged: PropTypes.func,

    /**
     * This handler is called when the map `heading` property changes.
     */
    onHeadingChanged: PropTypes.func,

    /**
     * This handler is called when the `mapTypeId` property changes.
     */
    onMapTypeIdChanged: PropTypes.func,

    /**
     * This handler is called when the `projection` has changed.
     */
    onProjectionChanged: PropTypes.func,
  };
}
