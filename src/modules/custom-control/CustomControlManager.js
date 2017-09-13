import React from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../internal/MapContext";

function addControl(map, position, div) {
  const controls = map.controls[position];

  if (controls) {
    const index = controls.indexOf(div);

    if (index === -1) {
      controls.push(div);
    }
  }
}

function removeControl(map, position, div) {
  const controls = map.controls[position];

  if (controls) {
    const index = controls.indexOf(div);

    if (index !== -1) {
      controls.removeAt(index);
    }
  }
}

export class CustomControlManager {
  constructor(context: MapContext, render) {
    this.context = context;
    this.maps = context.maps;

    this.render = render;
    this.div = document.createElement("div");
  }

  renderDiv(children) {
    if (React.isValidElement(children)) {
      this.render(children, this.div);
    } else {
      ReactDOM.unmountComponentAtNode(this.div);
    }
  }

  getOptions(props) {
    return {
      children: props.children,
      position: this.context.getEnum("ControlPosition", props.position),
    };
  }

  attach(props) {
    const options = this.getOptions(props);

    this.renderDiv(options.children);

    this.context.onAttach(map => {
      addControl(map, options.position, this.div);
    });
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);

    if (prevOptions.position !== nextOptions.position) {
      this.context.onAttach(map => {
        removeControl(map, prevOptions.position, this.div);
        addControl(map, nextOptions.position, this.div);
      });
    }

    if (prevOptions.children !== nextOptions.children) {
      this.renderDiv(nextOptions.children);
    }
  }

  detach(props) {
    const options = this.getOptions(props);
    const div = this.div;

    this.div = null;
    ReactDOM.unmountComponentAtNode(div);

    this.context.onAttach(map => {
      removeControl(map, options.position, div);
    });
  }
}
