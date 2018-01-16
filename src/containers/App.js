import React, { Component } from "react";
import fetchJsonp from "fetch-jsonp";
import "./App.css";

import Header from "../components/header/header";
import Stream from "../components/stream/stream";

class App extends Component {
  state = {
    streams: [],
    status: "all"
  };

  componentDidMount() {
    const streams = ["freecodecamp", "test_channel", "ESL_SC2"];
    Promise.all(
      streams.map(name => {
        let streamObj = {};
        return fetchJsonp(
          `https://wind-bow.gomix.me/twitch-api/streams/${name}`
        )
          .then(response => {
            return response.json();
          })
          .then(json => {
            if (json.stream) {
              streamObj.game = json.stream.game;
              streamObj.viewers = json.stream.viewers;
              streamObj.online = true;
            } else {
              streamObj.game = "";
              streamObj.viewers = "";
              streamObj.online = false;
            }
          })
          .then(() => {
            return fetchJsonp(
              `https://wind-bow.gomix.me/twitch-api/channels/${name}`
            )
              .then(response => {
                return response.json();
              })
              .then(json => {
                streamObj.name = json.display_name;
                streamObj.logo = json.logo;
                streamObj.url = json.url;
                streamObj.id = json._id;

                return streamObj;
              });
          });
      })
    ).then(streamArr => {
      this.setState({ streams: streamArr });
    });
  }

  statusChangeHandler(status) {
    const prevState = this.state;
    this.setState({
      ...prevState,
      status: status
    });
  }
  render() {
    let streams = [];
    switch (this.state.status) {
      case "all":
        streams = this.state.streams;
        break;
      case "online":
        streams = this.state.streams.filter(stream => {
          return stream.online === true;
        });
        break;
      case "offline":
        streams = this.state.streams.filter(stream => {
          return stream.online === false;
        });
        break;
      default:
        streams = this.state.streams;
    }

    const streamArr = streams.map(stream => {
      return (
        <Stream
          game={stream.game}
          viewers={stream.viewers}
          link={stream.url}
          name={stream.name}
          logo={stream.logo}
          key={stream.id}
          online={stream.online}
        />
      );
    });
    return (
      <div className="App">
        <Header
          status={this.state.status}
          clicked={status => this.statusChangeHandler(status)}
        />
        {streamArr}
      </div>
    );
  }
}

export default App;
