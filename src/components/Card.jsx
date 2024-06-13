import React from 'react';

const Card = ({ video, onDelete, onEdit }) => (
  <div className={`card ${video.category.toLowerCase()}`}>
    <img src={video.image} alt={video.title} />
    <h3>{video.title}</h3>
    <a href={video.link} className={`assistir ${video.category.toLowerCase()}`} target="_blank" rel="noopener noreferrer">Assistir</a>
    <div className="actions">
      <button className={video.category.toLowerCase()} onClick={() => onDelete(video.id)}>Deletar</button>
      <button className={video.category.toLowerCase()} onClick={() => onEdit(video)}>Editar</button>
    </div>
  </div>
);

export default Card;
