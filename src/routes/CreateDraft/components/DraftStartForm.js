import React from "react";
import { Form, Control, Errors } from "react-redux-form";
import validator from "validator";
import "./DraftStartForm.scss";

export const DraftStartForm = props => {
  const required = val => val && val.length;
  return (
    <Form
      className="form-horizontal col-sm-6 offset-sm-3"
      model="test"
      onSubmit={val => props.startDraft(val)}
      validators={{
        "": {
          playersIsNumericIfDraftTypeIsBooster: vals =>
            vals &&
            ((vals.draftType && vals.draftType === props.GRID_TYPE) ||
              (vals.draftType &&
                vals.draftType === props.BOOSTER_TYPE &&
                vals.playerCount &&
                validator.isNumeric(vals.playerCount)))
        }
      }}
    >

      <div>
        <div className="form-group">
          <label>Draft Name</label>
          <Control
            className="form-control"
            model=".draftName"
            validators={{
              required: required,
              alpha: val => {
                return val && validator.isAlphanumeric(val);
              }
            }}
          />
        </div>
        <div className="form-group">
          <label>Cube</label>
          {props.draftStartForm &&
            props.draftStartForm.cubeList &&
            <Control.select className="form-control" model=".cubeName" validators={{ required: required }}>
              <option />
              {props.draftStartForm.cubeList.map(function(cube) {
                return <option value={cube.name + ""} key={cube.name + ""}>{cube.name}</option>;
              })}
            </Control.select>}
        </div>
        <div className="form-group">
          <label>Draft Type</label>
          {
            (
              <Control.select className="form-control" model=".draftType">
                <option />

                {props.draftStartForm &&
                  props.draftStartForm.draftTypes &&
                  props.draftStartForm.draftTypes.map(function(type) {
                    return <option value={type + ""} key={type + ""}>{type}</option>;
                  })}
              </Control.select>
            )
          }
        </div>
        {props.draftType === props.BOOSTER_TYPE &&
          <div className="form-group">
            <label>Number of Players</label>
            <Control.text className="form-control" model=".playerCount" />

          </div>}
      </div>
      <Control.button model="test" disabled={{ valid: false }} className="btn btn-primary">
        Create Draft
      </Control.button>
    </Form>
  );
};
DraftStartForm.propTypes = {
  cubeList: React.PropTypes.array
};

export default DraftStartForm;
