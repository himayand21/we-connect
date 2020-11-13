import React from 'react';
import {Icon} from '../ui';

import '../../styles/modal.scss';

export const Modal = (props) => {
    const {title, closeModal, children, modalFlag} = props;

    const outsideClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };
    if (!modalFlag) return null;
    return (
        <div className="modal-wrapper" onClick={outsideClick}>
            <div className="modal" id="modal">
                <div className="modal-header">
                    <div>{title}</div>
                    <div>
                        <button onClick={() => closeModal()} className="modal-close-button">
                            <Icon name={'times-close-light'}/>
                        </button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};