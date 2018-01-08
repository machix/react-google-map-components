import _ from "lodash";

export const composeUrl = (source, ...chunks) =>
  [source, chunks.map(_.kebabCase).join("/")].join("/");
