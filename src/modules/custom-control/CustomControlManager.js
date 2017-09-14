import React from "react";
import ReactDOM from "react-dom";
import { MapContext } from "../internal/MapContext";

export class CustomControlManager {
  constructor(context: MapContext, render) {
    this.div = null;
    this.render = render;
    this.context = context;

    this.div = document.createElement("div");
  }

  attach(props) {
    const options = this.getOptions(props);

    this.mountControl(options.position);
    this.renderContent(options.children);
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);

    if (prevOptions.position !== nextOptions.position) {
      // We need to remove control from old position first.
      this.unmountControl(prevOptions.position);

      // And only after that we can add control to new position.
      this.mountControl(nextOptions.position);
    }

    if (prevOptions.children !== nextOptions.children) {
      this.renderContent(nextOptions.children);
    }
  }

  detach(props) {
    const options = this.getOptions(props);

    this.unmountControl(options.position);
    ReactDOM.unmountComponentAtNode(this.div);
  }

  mountControl(position) {
    const controls = this.context.map.controls[position];

    if (controls) {
      const index = controls.indexOf(this.div);

      if (index === -1) {
        controls.push(this.div);
      }
    }
  }

  unmountControl(position) {
    const controls = this.context.map.controls[position];

    if (controls) {
      const index = controls.indexOf(this.div);

      if (index !== -1) {
        controls.removeAt(index);
      }
    }
  }

  renderContent(children) {
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
}
