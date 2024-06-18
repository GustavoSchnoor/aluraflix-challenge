import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Modal from 'react-modal';
import './index.css';

const App = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'One Piece',
      image: 'https://i.pinimg.com/736x/fb/0f/99/fb0f996251e2a15f52403df655c0f813.jpg',
      link: 'https://www.youtube.com/embed/qkj2VeDw5cY?si=thMFeItAm7EktbSk',
      category: 'Animes'
    },
    { 
      id: 2, 
      title: 'Elden Ring',
      image: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png', 
      link: 'https://www.youtube.com/embed/gUPUI4NqQHc?si=zXEG71XusdkA1fy5', 
      category: 'Jogos' 
    },
    { 
      id: 3, 
      title: 'Eu, a patroa e as crianças', 
      image: 'https://images.justwatch.com/poster/244597295/s332/temporada-2', 
      link: 'https://www.youtube.com/embed/3B_qXITddHU?si=f0CT4cKjaplX75fA', 
      category: 'Séries' 
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerModalIsOpen, setPlayerModalIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const openModal = (video) => {
    setCurrentVideo(video);
    setModalIsOpen(true);
  };

  const openPlayerModal = (video) => {
    setCurrentVideo(video);
    setPlayerModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentVideo(null);
    setModalIsOpen(false);
    setPlayerModalIsOpen(false);
  };

  const handleDelete = (id) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const handleSave = (newVideo) => {
    if (currentVideo) {
      setVideos(videos.map(video => (video.id === currentVideo.id ? newVideo : video)));
    } else {
      newVideo.id = videos.length + 1;
      setVideos([...videos, newVideo]);
    }
    closeModal();
  };

  return (
    <div>
      <Header openModal={() => openModal(null)} />
      <main>
        <h2 className="category-title animes-title">Animes</h2>
        <div className="category">
          {videos.filter(video => video.category === 'Animes').map(video => (
            <Card key={video.id} video={video} onDelete={handleDelete} onEdit={openModal} onWatch={openPlayerModal} />
          ))}
        </div>
        <h2 className="category-title jogos-title">Jogos</h2>
        <div className="category">
          {videos.filter(video => video.category === 'Jogos').map(video => (
            <Card key={video.id} video={video} onDelete={handleDelete} onEdit={openModal} onWatch={openPlayerModal} />
          ))}
        </div>
        <h2 className="category-title séries-title">Séries</h2>
        <div className="category">
          {videos.filter(video => video.category === 'Séries').map(video => (
            <Card key={video.id} video={video} onDelete={handleDelete} onEdit={openModal} onWatch={openPlayerModal} />
          ))}
        </div>
      </main>
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>{currentVideo ? 'Editar Vídeo' : 'Novo Vídeo'}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newVideo = {
            title: formData.get('title'),
            image: formData.get('image'),
            link: formData.get('link'),
            category: formData.get('category'),
          };
          handleSave(newVideo);
        }}>
          <label htmlFor="title">Título</label>
          <input type="text" name="title" id="title" defaultValue={currentVideo?.title} required />
          <label htmlFor="image">URL da Imagem</label>
          <input type="text" name="image" id="image" defaultValue={currentVideo?.image} required />
          <label htmlFor="link">URL do Vídeo</label>
          <input type="text" name="link" id="link" defaultValue={currentVideo?.link} required />
          <label htmlFor="category">Categoria</label>
          <select name="category" id="category" defaultValue={currentVideo?.category || ''} required>
            <option value="" disabled>Selecione uma categoria</option>
            <option value="Animes">Animes</option>
            <option value="Jogos">Jogos</option>
            <option value="Séries">Séries</option>
          </select>
          <button type="submit">Adicionar</button>
        </form>
      </Modal>
      
      <Modal
        isOpen={playerModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Player Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="player-container">
          <iframe
            width="100%"
            height="100%"
            src={currentVideo?.link}
            title={currentVideo?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default App;
