import React from "react";
import { mount } from "enzyme";
import { Portal } from "../Portal";

describe("Portal", () => {
  it("should render in node on mount", () => {
    const node = document.createElement("div");
    let div = null;

    const wrapper = mount(
      <Portal node={node}>
        <div ref={x => (div = x)}>Foo</div>
      </Portal>,
    );

    expect(div).toBeTruthy();
    expect(div.innerHTML).toBe("Foo");
    expect(div.parentNode).toBe(node);

    expect(wrapper.children().length).toBe(0);
  });

  it("should rerender node on update", () => {
    const node = document.createElement("div");
    let div1 = null;

    const wrapper = mount(
      <Portal node={node}>
        <div ref={x => (div1 = x)}>Foo</div>
      </Portal>,
    );

    expect(div1).toBeTruthy();
    expect(div1.innerHTML).toBe("Foo");
    expect(div1.parentNode).toBe(node);

    expect(wrapper.children().length).toBe(0);

    let div2 = null;

    wrapper.setProps({ children: <div ref={x => (div2 = x)}>Bar</div> });

    expect(div2).toBeTruthy();
    expect(div2.innerHTML).toBe("Bar");
    expect(div2.parentNode).toBe(node);

    expect(wrapper.children().length).toBe(0);
  });

  it("should cleanup node on umount", () => {
    const node = document.createElement("div");
    let div1 = null;

    const wrapper = mount(
      <Portal node={node}>
        <div ref={x => (div1 = x)}>Foo</div>
      </Portal>,
    );

    expect(div1).toBeTruthy();
    expect(div1.innerHTML).toBe("Foo");
    expect(div1.parentNode).toBe(node);

    expect(wrapper.children().length).toBe(0);

    wrapper.unmount();

    expect(div1).toBeNull();
    expect(node.outerHTML).toBe("<div></div>");
  });
});
