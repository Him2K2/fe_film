import React from 'react';
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import { Link } from 'react-router-dom';

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
            {
            film.status === "on" ? (
              <a href={film.urlFilm} target="_blank" rel="noopener noreferrer">
                <button className={cx("watch-btn")}>Watch Now</button>
              </a>
            ) : film.status === "off" ? (
              <Link to={`/buy/${film.id}`}  target="_blank" rel="noopener noreferrer">
                <button className={cx("buy-btn")}>Buy</button>
              </Link>
            ) : null
          }
          
          </div>
        </div>
    </div>
    );
  };

export default Modal;
