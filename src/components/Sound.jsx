import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { useSound } from "../SoundCotext";
const Sound = () => {
  const { isSoundEnabled, toggleSound } = useSound();

  return (
    
    <button className="text-red-700 cursor-pointer" onClick={toggleSound}>
      {isSoundEnabled ? (
        <FontAwesomeIcon icon={faVolumeHigh} />
      ) : (
        <FontAwesomeIcon icon={faVolumeXmark} />
      )}
    </button>
  );
};

export default Sound;
