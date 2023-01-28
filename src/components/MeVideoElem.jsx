import { useHuddleStore } from "@huddle01/huddle01-client/store";
import React, { useEffect, useRef } from "react";

const MeVideoElem = ({turnVideoOn}) => {
  const stream = useHuddleStore((state) => state.stream);
  const isCamPaused = useHuddleStore((state) => state.isCamPaused);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    console.log({ stream });
  }, [stream]);

  return (
    <div>
      {turnVideoOn ? <video
      style={{ width: "50%" }}
      ref={videoRef}
      autoPlay
      muted
      playsInline
      ></video> : null}
    </div>
  );
  
};

export default MeVideoElem;
