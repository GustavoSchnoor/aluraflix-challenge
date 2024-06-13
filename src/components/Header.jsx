import React from 'react';

const Header = ({ openModal }) => (
  <header className="header">
    <h1 className="aluraflix">Aluraflix</h1>
    <button onClick={openModal}>Novo Vídeo</button>
  </header>
);

export default Header;
