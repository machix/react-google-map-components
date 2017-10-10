import React from "react";
import PropTypes from "prop-types";
import { wrapWithHandlers } from "../../../../hocs/WrapWithHandlers";
import { GoogleMap } from "../../../../../modules/google-map/GoogleMap";
import { DataPolygon } from "../../../../../modules/data-polygon/DataPolygon";

export const pageName = "Events Example";

const enhancer = wrapWithHandlers();

DataPolygonHandlers.contextTypes = {
  maps: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
};

DataPolygonHandlers.propTypes = {
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onRightClick: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
};

function DataPolygonHandlers(props, context) {
  return (
    <GoogleMap
      zoom={5}
      maps={context.maps}
      style={context.styles.map}
      center={{ lat: -33, lng: 151 }}
    >
      <DataPolygon
        {...props}
        clickable
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
  );
}

export default enhancer(DataPolygonHandlers);
