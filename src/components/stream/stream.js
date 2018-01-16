import React from "react";

import "./stream.css";

const stream = props => (
  <a className="stream-link" href={props.link} target="_blank">
    <div className="stream-item">
      <div className="stream-start">
        <img className="stream-logo" src={props.logo} alt={props.name} />
        <h3 className="stream-name">{props.name}</h3>
      </div>
      {props.online ? (
        <span className="stream-status">{props.game}</span>
      ) : (
        <span className="stream-status">Offline</span>
      )}
    </div>
  </a>
);

export default stream;
