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
  withMapInstance,
  ZoomControl,
} from "../index";

test("Public Api", () => {
  expect(GoogleMap).toBeInstanceOf(Function);
  expect(FullscreenControl).toBeInstanceOf(Function);
  expect(MapTypeControl).toBeInstanceOf(Function);
  expect(RotateControl).toBeInstanceOf(Function);
  expect(ScaleControl).toBeInstanceOf(Function);
  expect(StreetViewControl).toBeInstanceOf(Function);
  expect(ZoomControl).toBeInstanceOf(Function);
  expect(Marker).toBeInstanceOf(Function);
  expect(MarkerIcon).toBeInstanceOf(Function);
  expect(InfoWindow).toBeInstanceOf(Function);
  expect(DataPolygon).toBeInstanceOf(Function);
  expect(withMapInstance).toBeInstanceOf(Function);
});
