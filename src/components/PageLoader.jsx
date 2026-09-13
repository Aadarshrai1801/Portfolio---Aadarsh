import React from 'react';

export default function PageLoader() {
  return (
    <div className="loading-container">
      <div className="loading-screen">
        <div className="rounded-div-wrap top">
          <div className="rounded-div"></div>
        </div>
        <div className="loading-words">
          <h2 className="home-active home-active-first">Hello<div className="dot"></div></h2>
          <h2 className="home-active">Bonjour<div className="dot"></div></h2>
          <h2 className="home-active">नमस्ते<div className="dot"></div></h2>
          <h2 className="home-active">Ciao<div className="dot"></div></h2>
          <h2 className="home-active">Olá<div className="dot"></div></h2>
          <h2 className="home-active jap">こんにちは<div className="dot"></div></h2>
          <h2 className="home-active">Hallå<div className="dot"></div></h2>
          <h2 className="home-active">Guten tag<div className="dot"></div></h2>
          <h2 className="home-active home-active-last">Namaste<div className="dot"></div></h2>
          <h2>Home<div className="dot"></div></h2>
          <h2>Work<div className="dot"></div></h2>
          <h2>About<div className="dot"></div></h2>
          <h2>Contact<div className="dot"></div></h2>
        </div>
        <div className="rounded-div-wrap bottom">
          <div className="rounded-div"></div>
        </div>
      </div>
    </div>
  );
}
