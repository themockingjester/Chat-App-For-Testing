import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { io, connect } from 'socket.io-client';
import axios from 'axios';
import { Component } from 'react'
const URL = 'http://127.0.0.1:4002'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.socket = io(URL, {
      transports: ["websocket"],
      // upgrade: false,
      // secure: true,
      // withCredentials: true,
      // rejectUnauthorized: false
    })
  }
  setCookie() {
    axios.get("http://127.0.0.1:4002/tai", { withCredentials: true }).then((response) => {
      alert(response.data)
    })
  }
  sendMessage = () => {
    try {
      this.socket.emit('chatMessage', { receiverId: 'Ghrx345', message: "Heelo world" })

    } catch (err) {
      console.log(err)
    }
  }
  componentDidUpdate() {

  }
  componentDidMount = () => {

    this.socket.on('errorWhileChat', ({ error, code }) => {
      console.log(error, code)
      alert(error, code)
    })
    this.socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  render() {
    return (
      <div className="App">
        Hi app
        <button onClick={this.setCookie}>Set Cookie</button>
        <button onClick={this.sendMessage}>Send Message</button>
      </div>
    )
  }

}
export default App
