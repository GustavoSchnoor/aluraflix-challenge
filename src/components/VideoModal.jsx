import React from 'react';
import Modal from 'react-modal';

const VideoModal = ({ isOpen, onRequestClose, formData, setFormData, handleSubmit, isEditMode }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{isEditMode ? 'Editar Vídeo' : 'Adicionar Vídeo'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="image">URL da Imagem</label>
        <input
          id="image"
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <label htmlFor="link">URL do Vídeo</label>
        <input
          id="link"
          name="link"
          type="text"
          value={formData.link}
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Selecione uma categoria</option>
          <option value="Animes">Animes</option>
          <option value="Jogos">Jogos</option>
          <option value="Séries">Séries</option>
        </select>
        <button type="submit">{isEditMode ? 'Salvar' : 'Adicionar'}</button>
      </form>
    </Modal>
  );
};

export default VideoModal;
