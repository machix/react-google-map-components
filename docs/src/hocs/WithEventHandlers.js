import React from "react";
import Page from "../components/page/Page";

export function withEventHandlers(handlers, render) {
  class WithEventHandlers extends React.Component {
    constructor(props, context) {
      super(props, context);

      const fns = {};
      const state = {};

      handlers.forEach(handler => {
        state[handler] = 0;

        fns[handler] = () =>
          this.setState(x => ({
            [handler]: x[handler] + 1,
          }));
      });

      this.state = state;
      this.handlers = fns;
    }

    render() {
      return (
        <Page>
          <div className="row">
            <div className="col-sm-6">{render(this.handlers)}</div>

            <div className="col-sm-6">
              {handlers.map(handler => (
                <h6 key={handler}>
                  {handler}{" "}
                  <span className="badge badge-secondary">
                    {this.state[handler]}
                  </span>
                </h6>
              ))}
            </div>
          </div>
        </Page>
      );
    }
  }

  return () => <WithEventHandlers />;
}
