import './App.css';
import io from "socket.io-client";
import { useState } from 'react';
import Chat from './component/Chat';

const socket = io.connect("http://localhost:3001/");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setshowChat] = useState(false);
  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit('join_room', room);
      setshowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
      <div className='joinChatContainer'>
        <h3>Join A Chat</h3>
        <input type="text" placeholder='Ram...' onChange={e => setName(e.target.value)} />
        <input type="text" placeholder='Room id...' onChange={e => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Join A Room</button>
      </div> ):(
      <Chat socket={socket} name={name} room={room} />)}
    </div>
  );
}

export default App;
