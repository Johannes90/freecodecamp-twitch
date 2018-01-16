import React from "react";
import "./header.css";

const header = props => (
  <header className="header">
    <h1 className="header-title">Twitch Streamer Client</h1>
    <ul className="filter">
      <li
        onClick={() => props.clicked("all")}
        className={
          props.status === "all" ? "filter-item active-filter" : "filter-item"
        }
      >
        All
      </li>
      <li
        onClick={() => props.clicked("online")}
        className={
          props.status === "online"
            ? "filter-item active-filter"
            : "filter-item"
        }
      >
        Online
      </li>
      <li
        onClick={() => props.clicked("offline")}
        className={
          props.status === "offline"
            ? "filter-item active-filter"
            : "filter-item"
        }
      >
        Offline
      </li>
    </ul>
  </header>
);

export default header;
