import {
  PanBy,
  PanTo,
  Marker,
  Polyline,
  FitBounds,
  GoogleMap,
  InfoWindow,
  MarkerIcon,
  DataPolygon,
  PanToBounds,
  ZoomControl,
  MarkerSymbol,
  ScaleControl,
  CustomControl,
  RotateControl,
  DrawingControl,
  MapTypeControl,
  withMapInstance,
  FullscreenControl,
  StreetViewControl,
} from "../index";

test("Public Api", () => {
  expect(GoogleMap).toBeInstanceOf(Function);
  expect(FullscreenControl).toBeInstanceOf(Function);
  expect(MapTypeControl).toBeInstanceOf(Function);
  expect(RotateControl).toBeInstanceOf(Function);
  expect(ScaleControl).toBeInstanceOf(Function);
  expect(StreetViewControl).toBeInstanceOf(Function);
  expect(ZoomControl).toBeInstanceOf(Function);
  expect(CustomControl).toBeInstanceOf(Function);
  expect(DrawingControl).toBeInstanceOf(Function);
  expect(FitBounds).toBeInstanceOf(Function);
  expect(PanBy).toBeInstanceOf(Function);
  expect(PanTo).toBeInstanceOf(Function);
  expect(PanToBounds).toBeInstanceOf(Function);
  expect(Marker).toBeInstanceOf(Function);
  expect(Polyline).toBeInstanceOf(Function);
  expect(MarkerIcon).toBeInstanceOf(Function);
  expect(MarkerSymbol).toBeInstanceOf(Function);
  expect(InfoWindow).toBeInstanceOf(Function);
  expect(DataPolygon).toBeInstanceOf(Function);
  expect(withMapInstance).toBeInstanceOf(Function);
});
