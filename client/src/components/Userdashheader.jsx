import React from "react";
import "../assets/componentscss/Userdashheader.css"

const Userdashheader = () => {

    const buttonOnclick = () => {}

  return (
    <header id="menuuserdash">
      <div class="logouserdash">
        
      </div>

      <div class="joinUsuserdash">
        <button onClick={buttonOnclick}>Log out</button>
      </div>
    </header>
  );
};

export default Userdashheader;
