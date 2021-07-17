import React, { useEffect } from 'react';
import s from '../modal/modal.module.css';

export default function Modal({ closeModal, children }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log(e.code);
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className={s.Overlay}
      onClick={e => {
        if (e.currentTarget === e.target) {
          closeModal();
        }
      }}
    >
      <div className={s.Modal}>{children}</div>
    </div>
  );
}
