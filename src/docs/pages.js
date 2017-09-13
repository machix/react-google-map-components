import React from "react";
import { PolylineWithDirectionService } from "../examples/polyline/PolylineWithDirectionService";
import {
  DataPolygon,
  FullscreenControl,
  GoogleMap,
  InfoWindow,
  MapTypeControl,
  Marker,
  MarkerIcon,
  RotateControl,
  ScaleControl,
  StreetViewControl,
  ZoomControl,
} from "../modules";
import { FitBounds } from "../modules/animations/FitBounds";
import { PanBy } from "../modules/animations/PanBy";
import { PanTo } from "../modules/animations/PanTo";
import { PanToBounds } from "../modules/animations/PanToBounds";
import { CustomControl } from "../modules/custom-control/CustomControl";
import { DrawingControl } from "../modules/drawing-control/DrawingControl";
import { Polyline } from "../modules/polyline/Polyline";

import Icon from "./assets/icon.svg";

import { DocsContext } from "./docs-context/DocsContext";
import {
  boolean,
  number,
  select,
  text,
  textArea,
  withDynamicProps,
} from "./hocs/WithDynamicProps";
import { withEventHandlers } from "./hocs/WithEventHandlers";

export const context = new DocsContext();

const { google: { maps } } = window;
const styles = { map: { minHeight: "320px", height: "100%" } };
const defaultCenter = { lat: 36.964, lng: -122.015 };
const cities = [
  "san jose, ca",
  "palo alto, ca",
  "gilroy, ca",
  "salinas, ca",
  "monterey, ca",
];

const dynamicProps = {
  lat: number("lat", "Latitude", defaultCenter.lat),
  lng: number("lng", "Longitude", defaultCenter.lng),
  visible: boolean("visible", "Visible", true),

  mapTypeId: select("mapTypeId", "Map Type", [
    "HYBRID",
    "ROADMAP",
    "SATELLITE",
    "TERRAIN",
  ]),

  style: select("style", "Style", [
    "DEFAULT",
    "DROPDOWN_MENU",
    "HORIZONTAL_BAR",
  ]),

  animation: select("animation", "Animation", ["BOUNCE", "DROP"]),

  position: select("position", "Position", [
    "BOTTOM_CENTER",
    "BOTTOM_LEFT",
    "BOTTOM_RIGHT",
    "LEFT_BOTTOM",
    "LEFT_CENTER",
    "LEFT_TOP",
    "RIGHT_BOTTOM",
    "RIGHT_CENTER",
    "RIGHT_TOP",
    "TOP_CENTER",
    "TOP_LEFT",
    "TOP_RIGHT",
  ]),
};

context
  .addSection("<GoogleMap />")
  .addPage(
    "Basics",
    withDynamicProps(
      [
        dynamicProps.lat,
        dynamicProps.lng,
        number("zoom", "Zoom", 8),
        dynamicProps.mapTypeId,
        text("backgroundColor", "Background Color", "#ffffff"),
        boolean("clickableIcons", "Clickable Icons", true),
        boolean("disableDoubleClickZoom", "Disable Double Click Zoom", false),
      ],
      props => (
        <GoogleMap
          maps={maps}
          style={styles.map}
          zoom={props.zoom}
          mapTypeId={props.mapTypeId}
          clickableIcons={props.clickableIcons}
          center={{ lat: props.lat, lng: props.lng }}
          disableDoubleClickZoom={props.disableDoubleClickZoom}
        />
      ),
    ),
  )
  .addPage(
    "Events",
    withEventHandlers(
      [
        "onClick",
        "onDoubleClick",
        "onRightClick",
        "onMouseMove",
        "onMouseOut",
        "onMouseOver",
        "onDrag",
        "onDragEnd",
        "onDragStart",
        "onIdle",
        "onTilesLoaded",
        "onTiltChanged",
        "onZoomChanged",
        "onBoundsChanged",
        "onCenterChanged",
        "onHeadingChanged",
        "onMapTypeIdChanged",
        "onProjectionChanged",
      ],
      props => (
        <GoogleMap
          {...props}
          maps={maps}
          zoom={8}
          style={styles.map}
          center={defaultCenter}
        />
      ),
    ),
  );

context
  .addSection("Controls")
  .addPage(
    "<FullscreenControl />",
    withDynamicProps([dynamicProps.visible, dynamicProps.position], props => (
      <GoogleMap maps={maps} zoom={8} style={styles.map} center={defaultCenter}>
        {props.visible && <FullscreenControl position={props.position} />}
      </GoogleMap>
    )),
  )
  .addPage(
    "<MapTypeControl />",
    withDynamicProps(
      [
        dynamicProps.visible,
        dynamicProps.style,
        dynamicProps.position,

        boolean("hybrid", "Hybrid", true),
        boolean("roadmap", "Roadmap", true),
        boolean("satellite", "Satellite", true),
        boolean("terrain", "Terrain", true),
      ],
      props => (
        <GoogleMap
          maps={maps}
          zoom={8}
          style={styles.map}
          center={defaultCenter}
        >
          {props.visible && (
            <MapTypeControl
              style={props.style}
              position={props.position}
              mapTypeIds={[
                props.hybrid && "HYBRID",
                props.roadmap && "ROADMAP",
                props.satellite && "SATELLITE",
                props.terrain && "TERRAIN",
              ].filter(Boolean)}
            />
          )}
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "<RotateControl />",
    withDynamicProps([dynamicProps.visible, dynamicProps.position], props => (
      <GoogleMap
        maps={maps}
        zoom={18}
        mapTypeId="SATELLITE"
        style={styles.map}
        center={defaultCenter}
      >
        {props.visible && <RotateControl position={props.position} />}
      </GoogleMap>
    )),
  )
  .addPage(
    "<ScaleControl />",
    withDynamicProps([dynamicProps.visible], props => (
      <GoogleMap maps={maps} zoom={8} style={styles.map} center={defaultCenter}>
        {props.visible && <ScaleControl />}
      </GoogleMap>
    )),
  )
  .addPage(
    "<StreetViewControl />",
    withDynamicProps([dynamicProps.visible, dynamicProps.position], props => (
      <GoogleMap
        maps={maps}
        zoom={18}
        style={styles.map}
        center={defaultCenter}
      >
        {props.visible && <StreetViewControl position={props.position} />}
      </GoogleMap>
    )),
  )
  .addPage(
    "<ZoomControl />",
    withDynamicProps([dynamicProps.visible, dynamicProps.position], props => (
      <GoogleMap maps={maps} zoom={8} style={styles.map} center={defaultCenter}>
        {props.visible && <ZoomControl position={props.position} />}
      </GoogleMap>
    )),
  )
  .addPage(
    "<CustomControl />",
    withDynamicProps(
      [
        dynamicProps.visible,
        {
          ...dynamicProps.position,
          defaultValue: dynamicProps.position.options[0],
        },
        text("label", "Label", "Click It!"),
        text("message", "Message", "Boom!"),
      ],
      props => (
        <GoogleMap
          maps={maps}
          zoom={8}
          style={styles.map}
          center={defaultCenter}
        >
          {props.visible && (
            <CustomControl position={props.position}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => alert(props.message)}
              >
                {props.label}
              </button>
            </CustomControl>
          )}
        </GoogleMap>
      ),
    ),
  );

context
  .addSection("Animations")
  .addPage(
    "<FitBounds />",
    withDynamicProps(
      [
        number("lat1", "Latitude 1", 36),
        number("lng1", "Longitude 1", -122),
        number("lat2", "Latitude 2", 34),
        number("lng2", "Longitude 2", -120),
        number("lat3", "Latitude 3", 34),
        number("lng3", "Longitude 3", -124),
      ],
      props => {
        const position1 = { lat: props.lat1, lng: props.lng1 };
        const position2 = { lat: props.lat2, lng: props.lng2 };
        const position3 = { lat: props.lat3, lng: props.lng3 };

        return (
          <GoogleMap
            maps={maps}
            zoom={8}
            style={styles.map}
            center={defaultCenter}
          >
            <Marker position={position1} />
            <Marker position={position2} />
            <Marker position={position3} />

            <FitBounds latLngBounds={[position1, position2, position3]} />
          </GoogleMap>
        );
      },
    ),
  )
  .addPage(
    "<PanBy />",
    withDynamicProps([number("x", "X", 0), number("y", "Y", 0)], props => (
      <GoogleMap maps={maps} zoom={8} style={styles.map} center={defaultCenter}>
        <PanBy x={props.x} y={props.y} />
      </GoogleMap>
    )),
  )
  .addPage(
    "<PanTo />",
    withDynamicProps([dynamicProps.lat, dynamicProps.lng], props => {
      const position = { lat: props.lat, lng: props.lng };

      return (
        <GoogleMap
          maps={maps}
          zoom={8}
          style={styles.map}
          center={defaultCenter}
        >
          <Marker position={position} />
          <PanTo latLng={position} />
        </GoogleMap>
      );
    }),
  )
  .addPage(
    "<PanToBounds />",
    withDynamicProps(
      [
        number("lat1", "Latitude 1", defaultCenter.lat),
        number("lng1", "Longitude 1", defaultCenter.lng),
        number("lat2", "Latitude 2", defaultCenter.lat),
        number("lng2", "Longitude 2", defaultCenter.lng),
        number("lat3", "Latitude 3", defaultCenter.lat),
        number("lng3", "Longitude 3", defaultCenter.lng),
      ],
      props => {
        const position1 = { lat: props.lat1, lng: props.lng1 };
        const position2 = { lat: props.lat2, lng: props.lng2 };
        const position3 = { lat: props.lat3, lng: props.lng3 };

        return (
          <GoogleMap
            maps={maps}
            zoom={8}
            style={styles.map}
            center={defaultCenter}
          >
            <Marker position={position1} />
            <Marker position={position2} />
            <Marker position={position3} />

            <PanToBounds latLngBounds={[position1, position2, position3]} />
          </GoogleMap>
        );
      },
    ),
  );

context
  .addSection("<Marker />")
  .addPage(
    "Basics",
    withDynamicProps(
      [
        dynamicProps.lat,
        dynamicProps.lng,
        dynamicProps.animation,
        text("label", "Label", ""),
        text("title", "Title", "Marker Title"),
        boolean("draggable", "Draggable", false),
        boolean("crossOnDrag", "Cross On Drag", false),
        dynamicProps.visible,
      ],
      props => (
        <GoogleMap
          maps={maps}
          zoom={8}
          style={styles.map}
          center={{ lat: props.lat, lng: props.lng }}
        >
          <Marker
            position={{ lat: props.lat, lng: props.lng }}
            label={props.label}
            visible={props.visible}
            title={props.title}
            draggable={props.draggable}
            crossOnDrag={props.crossOnDrag}
            animation={props.animation}
            onDragEnd={x => {
              props.change("lat", x.latLng.lat());
              props.change("lng", x.latLng.lng());
            }}
          />
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "Events",
    withEventHandlers(
      [
        "onClick",
        "onDoubleClick",
        "onRightClick",
        "onMouseDown",
        "onMouseOut",
        "onMouseOver",
        "onMouseUp",
        "onDrag",
        "onDragStart",
        "onDragEnd",
        "onPositionChanged",
      ],
      props => (
        <GoogleMap
          maps={maps}
          zoom={8}
          center={defaultCenter}
          style={styles.map}
        >
          <Marker draggable position={defaultCenter} {...props} />
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "<MarkerIcon />",
    withDynamicProps([number("label", "Label", 10)], props => {
      const label = String(props.label || "");
      const iconSize =
        label.length < 3 ? 24 : label.length === 3 ? 30 : label.length * 9;

      const size = { height: iconSize, width: iconSize };

      return (
        <GoogleMap
          zoom={8}
          maps={maps}
          style={styles.map}
          center={defaultCenter}
        >
          <Marker
            label={label}
            position={defaultCenter}
            icon={
              <MarkerIcon
                url={Icon}
                size={size}
                scaledSize={size}
                anchor={{ x: iconSize / 2, y: iconSize / 2 }}
              />
            }
          />
        </GoogleMap>
      );
    }),
  );

context
  .addSection("<InfoWindow />")
  .addPage(
    "Basics",
    withDynamicProps(
      [
        dynamicProps.lat,
        dynamicProps.lng,
        number("maxWidth", "Max Width", 300),
        text("content", "Content", "Info Window Content"),
        dynamicProps.visible,
      ],
      props => (
        <GoogleMap
          zoom={8}
          maps={maps}
          style={styles.map}
          center={{ lat: props.lat, lng: props.lng }}
        >
          {props.visible && (
            <InfoWindow
              maxWidth={props.maxWidth}
              position={{ lat: props.lat, lng: props.lng }}
            >
              {props.content}
            </InfoWindow>
          )}
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "Events",
    withEventHandlers(["onCloseClick"], props => (
      <GoogleMap maps={maps} zoom={8} center={defaultCenter} style={styles.map}>
        <InfoWindow
          {...props}
          maxWidth={props.maxWidth}
          position={defaultCenter}
        >
          Info Window Content
        </InfoWindow>
      </GoogleMap>
    )),
  )
  .addPage(
    "JSX Content",
    withDynamicProps(
      [
        boolean("visible", "Visible", true),
        number("maxWidth", "Max Width", 300),
        text("heading", "Heading", "Uluru"),
        textArea(
          "content",
          "Content",
          "<b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
            "sandstone rock formation in the southern part of the " +
            "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
            "south west of the nearest large town, Alice Springs; 450&#160;km " +
            "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
            "features of the Uluru - Kata Tjuta National Park. Uluru is " +
            "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
            "Aboriginal people of the area. It has many springs, waterholes, " +
            "rock caves and ancient paintings. Uluru is listed as a World " +
            "Heritage Site.</p>" +
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
            "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
            "(last visited June 22, 2009).",
        ),
      ],
      props => (
        <GoogleMap
          zoom={8}
          maps={maps}
          style={styles.map}
          center={{ lat: -25.363, lng: 131.044 }}
        >
          {props.visible && (
            <InfoWindow
              maxWidth={props.maxWidth}
              position={{ lat: -25.363, lng: 131.044 }}
            >
              <div>
                <h1>{props.heading}</h1>

                <p
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: props.content }}
                />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ),
    ),
  );

context
  .addSection("<Polyline />")
  .addPage(
    "Basics",
    withDynamicProps(
      [
        boolean("visible", "Visible", true),
        boolean("clickable", "Clickable", true),
        boolean("draggable", "Draggable", false),
        text("strokeColor", "Stroke Color", "#FF0000"),
        number("strokeWidth", "Stroke Width", 1),
        number("strokeOpacity", "Stroke Opacity", 1),
        number("lat1", "Latitude 1", 37.33821),
        number("lng1", "Longitude 1", -121.88633),
        number("lat2", "Latitude 2", 37.00578),
        number("lng2", "Longitude 2", -121.56826),
      ],
      props => (
        <GoogleMap
          zoom={8}
          maps={maps}
          style={styles.map}
          center={defaultCenter}
        >
          <Polyline
            {...props}
            path={[
              { lat: props.lat1, lng: props.lng1 },
              { lat: props.lat2, lng: props.lng2 },
            ]}
            onDragEnd={x => {
              props.change("lat1", x.path[0].lat());
              props.change("lng1", x.path[0].lng());

              props.change("lat2", x.path[1].lat());
              props.change("lng2", x.path[1].lng());
            }}
          />
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "Events",
    withEventHandlers(
      [
        "onDrag",
        "onClick",
        "onMouseUp",
        "onDragEnd",
        "onMouseOut",
        "onMouseDown",
        "onDragStart",
        "onMouseOver",
        "onMouseMove",
        "onRightClick",
        "onDoubleClick",
      ],
      props => (
        <GoogleMap
          zoom={8}
          maps={maps}
          style={styles.map}
          center={defaultCenter}
        >
          <Polyline
            {...props}
            draggable
            clickable
            path={[
              { lat: 37.33821, lng: -121.88633 },
              { lat: 37.00578, lng: -121.56826 },
            ]}
          />
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "With DirectionService",
    withDynamicProps(
      [
        select(
          "travelMode",
          "Travel Mode",
          ["DRIVING", "BICYCLING", "TRANSIT", "WALKING"],
          "DRIVING",
        ),
        select("origin", "Origin", cities),
        select("destination", "Destination", cities),
      ],
      props => (
        <PolylineWithDirectionService
          zoom={8}
          maps={maps}
          style={styles.map}
          center={defaultCenter}
          origin={props.origin}
          travelMode={props.travelMode}
          destination={props.destination}
        />
      ),
    ),
  );

context
  .addSection("<DataPolygon />")
  .addPage(
    "Basics",
    withDynamicProps(
      [
        dynamicProps.visible,
        number("centerLat", "Center Latitude", -33),
        number("centerLng", "Center Longitude", 151),

        number("lat", "Polygon Latitude", -32),
        number("lng", "Polygon Longitude", 153),
      ],
      props => (
        <GoogleMap
          zoom={5}
          maps={maps}
          style={styles.map}
          center={{ lat: props.centerLat, lng: props.centerLng }}
        >
          {props.visible && (
            <DataPolygon
              geometry={[
                [
                  { lat: props.lat, lng: props.lng },
                  { lat: props.lat - 3, lng: props.lng },
                  { lat: props.lat - 3, lng: props.lng + 5 },
                  { lat: props.lat, lng: props.lng + 5 },
                ],
                [
                  { lat: -33, lng: 154 },
                  { lat: -34, lng: 154 },
                  { lat: -34, lng: 155 },
                  { lat: -33, lng: 155 },
                ],
                [
                  { lat: -33, lng: 156 },
                  { lat: -34, lng: 156 },
                  { lat: -34, lng: 157 },
                  { lat: -33, lng: 157 },
                ],
              ]}
            />
          )}
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "Styling",
    withDynamicProps(
      [
        dynamicProps.visible,
        boolean("clickable", "Clickable", false),
        boolean("draggable", "Draggable", false),
        text("fillColor", "Fill Color", "#000000"),
        number("fillOpacity", "Fill Opacity", 0.4),
        text("strokeColor", "Stroke Color", "#000000"),
        number("strokeOpacity", "Stroke Opacity", 1),
        number("strokeWeight", "Stroke Weight", 3),
      ],
      props => (
        <GoogleMap
          zoom={5}
          maps={maps}
          style={styles.map}
          center={{ lat: -33, lng: 151 }}
        >
          {props.visible && (
            <DataPolygon
              clickable={props.clickable}
              draggable={props.draggable}
              fillColor={props.fillColor}
              fillOpacity={props.fillOpacity}
              strokeColor={props.strokeColor}
              strokeOpacity={props.strokeOpacity}
              strokeWeight={props.strokeWeight}
              geometry={[
                [
                  { lat: -32, lng: 153 },
                  { lat: -35, lng: 153 },
                  { lat: -35, lng: 158 },
                  { lat: -32, lng: 158 },
                ],
                [
                  { lat: -33, lng: 154 },
                  { lat: -34, lng: 154 },
                  { lat: -34, lng: 155 },
                  { lat: -33, lng: 155 },
                ],
                [
                  { lat: -33, lng: 156 },
                  { lat: -34, lng: 156 },
                  { lat: -34, lng: 157 },
                  { lat: -33, lng: 157 },
                ],
              ]}
            />
          )}
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "Events",
    withEventHandlers(
      [
        "onClick",
        "onDoubleClick",
        "onRightClick",
        "onMouseOut",
        "onMouseOver",
        "onMouseDown",
        "onMouseUp",
      ],
      props => (
        <GoogleMap
          zoom={5}
          maps={maps}
          style={styles.map}
          center={{ lat: -33, lng: 151 }}
        >
          <DataPolygon
            {...props}
            clickable
            draggable
            geometry={[
              [
                { lat: -32, lng: 153 },
                { lat: -35, lng: 153 },
                { lat: -35, lng: 158 },
                { lat: -32, lng: 158 },
              ],
              [
                { lat: -33, lng: 154 },
                { lat: -34, lng: 154 },
                { lat: -34, lng: 155 },
                { lat: -33, lng: 155 },
              ],
              [
                { lat: -33, lng: 156 },
                { lat: -34, lng: 156 },
                { lat: -34, lng: 157 },
                { lat: -33, lng: 157 },
              ],
            ]}
          />
        </GoogleMap>
      ),
    ),
  );

context
  .addSection("<DrawingControl />")
  .addPage(
    "Basics",
    withDynamicProps(
      [
        dynamicProps.visible,
        dynamicProps.position,
        boolean("marker", "Marker", true),
        boolean("polyline", "Polyline", true),
        boolean("rectangle", "Rectangle", true),
        boolean("circle", "Circle", true),
        boolean("polygon", "Polygon", true),
      ],
      props => (
        <GoogleMap
          maps={maps}
          zoom={8}
          style={styles.map}
          center={defaultCenter}
        >
          {props.visible && (
            <DrawingControl
              position={props.position}
              drawingModes={[
                props.marker && "marker",
                props.polyline && "polyline",
                props.rectangle && "rectangle",
                props.circle && "circle",
                props.polygon && "polygon",
              ].filter(Boolean)}
            />
          )}
        </GoogleMap>
      ),
    ),
  )
  .addPage(
    "Events",
    withEventHandlers(
      [
        "onCircleComplete",
        "onMarkerComplete",
        "onOverlayComplete",
        "onPolygonComplete",
        "onPolylineComplete",
        "onRectangleComplete",
      ],
      props => (
        <GoogleMap
          zoom={8}
          maps={maps}
          style={styles.map}
          center={defaultCenter}
        >
          <DrawingControl {...props} />
        </GoogleMap>
      ),
    ),
  );
