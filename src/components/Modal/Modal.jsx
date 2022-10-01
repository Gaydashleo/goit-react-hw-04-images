import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { AiFillCloseCircle} from 'react-icons/ai';
import { ModalOverlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal ({onClose,children}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return createPortal(
      <ModalOverlay onClick={handleBackdropClick}>
        <ModalStyled>{children}</ModalStyled>
          <button type="button" onClick={onClose}>
          <AiFillCloseCircle style={{ width: 20, height: 20 }} />
        </button>
      </ModalOverlay>,
      modalRoot,
    );
  }

  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };