import reactLogo from "./assets/react.svg";
import "./App.css";

import { useState } from "react";
import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "./components/PeerVideoAudioElem";
import MeVideoElem from "./components/MeVideoElem";

function App() {
  const huddleClient = getHuddleClient("e33c61c06fb7605fefb9e73edd16159e6e2e38b28d15971b175cfc8554f8f958");
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const [VideoOrAudio, setToggle] = useState(false);

  const handleJoin = async (VidAud_param) => {
    try {
      await huddleClient.join("roomid", {
        address: "address",
        wallet: "metamask",
        ens: "axit.eth",
      });

      setToggle(Boolean(VidAud_param));
      console.log(`LOg data ${VideoOrAudio} ${VidAud_param}`);
      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  const handleLeave = async (roomid, address) => {
    try {
      await huddleClient.close()
      
      console.log("left");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <HuddleClientProvider value={huddleClient}>
      <div>
        <div>
          <h2>Client</h2>
          <div className="card">
            <button onClick={handleJoin.bind(0)}>Join Audio</button>
            <button onClick={handleJoin.bind(1)}>Join Video</button>
            <button onClick={handleLeave}>Leave Room</button>
          </div>
          
          <MeVideoElem turnVideoOn={VideoOrAudio}/>

          {lobbyPeers[0] && <h2>Lobby Peers</h2>}
          <div>
            {lobbyPeers.map((peer) => (
              <div>{peer.peerId}</div>
            ))}
          </div>

          {peersKeys[0] && <h2>Peers</h2>}

          <div className="peers-grid">
            {peersKeys.map((key) => (
              <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} turnVideoOn={VideoOrAudio}/>
            ))}
          </div>
        </div>
      </div>
    </HuddleClientProvider>
  );
}

export default App;
