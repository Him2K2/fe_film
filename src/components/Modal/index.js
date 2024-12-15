import React from 'react';
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

const Modal = ({ showModal, closeModal, film }) => {
  if (!showModal) return null;

  return (
   <div className={cx("modal-overlay")}>
      <div className={cx("modal-overlay")}>
        <div className={cx("modal-content")}>
          <button className={cx("close-btn")} onClick={closeModal}>X</button>
          <h2>{film.filmName}</h2>
          <img src={film.imgBannerFilm} alt={film.filmName} className={cx("modal-img")} />
          <p>{film.description}</p>
          
          <a href={film.urlFilm} target="_blank" rel="noopener noreferrer">
            <button className={cx("watch-btn")}>Watch Now</button>
          </a>
        </div>
      </div>
   </div>
  );
};

export default Modal;
