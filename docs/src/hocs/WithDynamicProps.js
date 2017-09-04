import toFinite from "lodash/toFinite";

import React from "react";
import PropTypes from "prop-types";
import Page from "../components/page/Page";

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function TextField(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.name}</label>
      <input
        type="text"
        id={props.id}
        name={props.name}
        value={props.value}
        className="form-control"
        onChange={event => props.onChange(event.target.value)}
      />
    </div>
  );
}

TextAreaField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function TextAreaField(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.name}</label>

      <textarea
        id={props.id}
        name={props.name}
        value={props.value}
        className="form-control"
        onChange={event => props.onChange(event.target.value)}
      />
    </div>
  );
}

NumberField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

function NumberField(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.name}</label>
      <input
        type="number"
        id={props.id}
        name={props.name}
        value={props.value}
        className="form-control"
        onChange={event => props.onChange(toFinite(event.target.value))}
      />
    </div>
  );
}

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
};

function SelectField(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.name}</label>
      <select
        type="number"
        id={props.id}
        name={props.name}
        value={props.value}
        className="form-control"
        onChange={event => props.onChange(event.target.value)}
      >
        {props.options.map(x => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
    </div>
  );
}

BooleanField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

function BooleanField(props) {
  return (
    <div className="form-check">
      <label className="form-check-label" htmlFor={props.id}>
        <input
          id={props.id}
          type="checkbox"
          className="form-check-input"
          checked={props.value}
          onChange={event => props.onChange(event.target.checked)}
        />{" "}
        {props.name}
      </label>
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

function Field(props) {
  switch (props.type) {
    case "text":
      return <TextField {...props} />;

    case "textArea":
      return <TextAreaField {...props} />;

    case "number":
      return <NumberField {...props} />;

    case "select":
      return <SelectField {...props} />;

    case "boolean":
      return <BooleanField {...props} />;

    default:
      return null;
  }
}

export const text = (key, name, defaultValue) => ({
  key,
  name,
  defaultValue,
  type: "text",
});

export const textArea = (key, name, defaultValue) => ({
  key,
  name,
  defaultValue,
  type: "textArea",
});

export const number = (key, name, defaultValue) => ({
  key,
  name,
  defaultValue,
  type: "number",
});

export const boolean = (key, name, defaultValue) => ({
  key,
  name,
  defaultValue,
  type: "boolean",
});

export const select = (key, name, options, defaultValue) => ({
  key,
  name,
  options,
  defaultValue,
  type: "select",
});

export function withDynamicProps(fields, render) {
  class WithDynamicProps extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = this.getInitialState();
    }

    getInitialState() {
      return fields.reduce((acc, x) => {
        acc[x.key] = x.defaultValue;

        return acc;
      }, {});
    }

    render() {
      return (
        <Page>
          <div className="row">
            <div className="col-sm-6">{render(this.state)}</div>

            <div className="col-sm-6">
              {fields.map(field => (
                <Field
                  id={field.key}
                  key={field.key}
                  {...field}
                  value={this.state[field.key]}
                  onChange={x => this.setState({ [field.key]: x })}
                />
              ))}

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => this.setState(this.getInitialState)}
              >
                Reset
              </button>
            </div>
          </div>
        </Page>
      );
    }
  }

  return () => <WithDynamicProps />;
}
