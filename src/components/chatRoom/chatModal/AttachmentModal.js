import React, {useState, useContext, Fragment, useRef, useEffect} from 'react';
import {StateContext} from '../../../context';
import {ImageUploader} from '../uploader';
import {Icon, Modal} from '../../ui';

import {modalTypes} from '../../../constants';

export const AttachmentModal = (props) => {
    const {storageRef, state} = useContext(StateContext);
    const [modalFlag, setModalFlag] = useState(false);
    const [modalType, setModalType] = useState('');
    const [randomFiles, setRandomFiles] = useState([]);

    const {user} = state;
    const {id: userId} = user;

    const {
        closeAttachment,
        setSelectedMessages,
        handleAttachment
    } = props;

    const showModal = (modalType) => {
        setSelectedMessages([]);
        setModalType(modalType);
        setModalFlag(true);
    };

    const hideModal = () => {
        closeAttachment();
        setModalFlag(false);
        if (randomFiles.length) {
            randomFiles.forEach((file) => {
                storageRef
                    .child(`${modalType.name}/${userId}/${file.name}`)
                    .delete();
            });
        }
    };

    // const removeAllUnsentBeforeClose = () => {
    //     if (randomFiles.length) {
    //         randomFiles.forEach((file) => {
    //             storageRef
    //                 .child(`${modalType.name}/${userId}/${file.name}`)
    //                 .delete();
    //         });
    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener('beforeunload', () => removeAllUnsentBeforeClose);
    // }, []);

    const confirmAndHideModal = () => {
        closeAttachment();
        setModalFlag(false);
        handleAttachment(randomFiles, modalType.name);
    };

    const renderShareOptions = (modalName) => {
        switch (modalName) {
            default:
                return (
                    <ImageUploader
                        setRandomFiles={setRandomFiles}
                        confirmAndHideModal={confirmAndHideModal}
                        randomFiles={randomFiles}
                        userId={userId}
                    />
                );
        }
    };

    const useOutsideClick = (ref) => {
        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                closeAttachment();
            }
        };
        useEffect(() => {
            if (!modalFlag) document.addEventListener('mousedown', handleOutsideClick);
            else document.removeEventListener('mousedown', handleOutsideClick);
            return (() => document.removeEventListener('mousedown', handleOutsideClick));
        }, [modalFlag]);
    };

    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);
    return (
        <Fragment>
            <div className="attachment-modal wc-icons-wrapper" ref={wrapperRef}>
                {modalTypes.map((modalType) => {
                    const {icon} = modalType;
                    return (
                        <div className="wc-attachment-icon wc-icon" onClick={() => showModal(modalType)} key={modalType.name}>
                            <Icon name={icon} className={icon}/>
                        </div>
                    );
                })}
            </div>
            <Modal
                title={modalType.header}
                closeModal={hideModal}
                modalFlag={modalFlag}
            >
                {renderShareOptions(modalType.name)}
            </Modal>
        </Fragment>
    );
};
