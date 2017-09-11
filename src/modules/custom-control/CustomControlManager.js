import React from "react";
import ReactDOM from "react-dom";
import { MapManager } from "../internal/MapManager";

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
  constructor(manager: MapManager, render) {
    this.manager = manager;
    this.maps = manager.maps;

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
    const manager = this.manager;

    return {
      children: props.children,
      position: manager.getEnum("ControlPosition", props.position),
    };
  }

  attach(props) {
    const options = this.getOptions(props);

    this.renderDiv(options.children);

    this.manager.onAttach(map => {
      addControl(map, options.position, this.div);
    });
  }

  update(prev, next) {
    const prevOptions = this.getOptions(prev);
    const nextOptions = this.getOptions(next);

    if (prevOptions.position !== nextOptions.position) {
      this.manager.onAttach(map => {
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

    this.manager.onAttach(map => {
      removeControl(map, options.position, div);
    });
  }
}
