/* eslint-disable max-statements */
import React, {useEffect, useState, useContext} from 'react';
import findOrientation from 'exif-orientation';
import {USER_DATA} from '../../../constants';
import {StateContext} from '../../../context';
import {SmallSpinner, Icon} from '../../ui';

export const Edit = (props) => {
    const {ref, storageRef} = useContext(StateContext);
    const {user, closeModal} = props;
    const {email, id, photoURL} = user;
    const [formDisplayName, setFormDisplayName] = useState('');
    const [formBio, setFormBio] = useState('');
    const [formPhotoURL, setFormPhotoURL] = useState();
    const [photoUploading, setPhotoUploading] = useState(false);
    const [randomFileName, setRandomFileName] = useState('');

    useEffect(() => {
        const {displayName, bio} = user;
        setFormDisplayName(displayName);
        setFormBio(bio);
    }, [user]);

    const handlePhotoUpload = (files) => {
        const time = Date.now();
        const imgFile = files[0];
        const metadata = {
            contentType: 'jpeg'
        };

        const reader = new FileReader();
        if (imgFile) {
            setRandomFileName(time);
            setPhotoUploading(true);
            const fileName = imgFile.name;
            reader.readAsDataURL(imgFile);
            reader.onload = (event) => {
                findOrientation(imgFile, (err, orientation) => {
                    const degree = err ? 0 : orientation.rotate;
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        const width = 450;
                        const scaleFactor = width / img.width;
                        const height = scaleFactor * img.height;

                        canvas.width = width;
                        canvas.height = height;

                        if (degree === 90) {
                            canvas.width = height;
                            canvas.height = width;
                            ctx.rotate(Math.PI / 2);
                            ctx.translate(0, -height);
                            ctx.drawImage(img, 0, 0, width, height);
                        } else if (degree === 180 || degree === -180) {
                            ctx.rotate(degree * Math.PI / 180);
                            ctx.translate(-width, -height);
                            ctx.drawImage(img, 0, 0, width, height);
                        } else if (degree === -90) {
                            canvas.width = height;
                            canvas.height = width;
                            ctx.rotate(-Math.PI / 2);
                            ctx.translate(-width, 0);
                            ctx.drawImage(img, 0, 0, width, height);
                        } else {
                            ctx.drawImage(img, 0, 0, width, height);
                        }
                        ctx.canvas.toBlob((blob) => {
                            const file = new File([blob], fileName, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            const uploadPath = storageRef.child(`photoURL/${id}/profile/${time}`);
                            uploadPath.put(file, metadata).then(function() {
                                uploadPath.getDownloadURL().then(function(downloadURL) {
                                    setFormPhotoURL(downloadURL);
                                    setPhotoUploading(false);
                                });
                            });
                        }, 'image/jpeg', 0.8);
                    };
                });
            };
        }
    };

    const updateProfile = () => {
        if (formDisplayName) {
            ref
                .child(USER_DATA)
                .child(id)
                .child('displayName')
                .set(formDisplayName);
        }
        if (formBio) {
            ref
                .child(USER_DATA)
                .child(id)
                .child('bio')
                .set(formBio);
        }
        if (formPhotoURL) {
            storageRef
                .child('photoURL')
                .child(id)
                .child('profile')
                .listAll()
                .then((res) => {
                    // eslint-disable-next-line no-underscore-dangle
                    const itemsPath = res.items.map((item) => item.location.path_);
                    const otherImagesPath = itemsPath.filter((item) => !item.includes(randomFileName));
                    if (otherImagesPath.length) {
                        otherImagesPath.forEach((otherImagePath) => {
                            storageRef
                                .child(otherImagePath)
                                .delete();
                        });
                    }
                });
            ref
                .child(USER_DATA)
                .child(id)
                .child('photoURL')
                .set(formPhotoURL);
        }
        closeModal();
    };

    return (
        <div className="modal-body-container">
            <span className="modal-img-wrapper">
                <div className="profile-image wc-image">
                    {formPhotoURL || photoURL ? (
                        <img
                            id="profile-image"
                            src={formPhotoURL || photoURL} alt={''} className="wc-thumbnail" />
                    ) : null}
                </div>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="display-hidden"
                    onChange={(e) => handlePhotoUpload(e.target.files)}
                    accept=".jpeg,.jpg"
                />
                <label
                    htmlFor="file"
                    className="wc-label"
                >
                    {photoURL ?
                        'Change Profile Picture' :
                        'Upload a picture'
                    }
                </label>
            </span>
            <div className="modal-form-item">
                <label className="modal-form-label">EMAIL</label>
                <input
                    className="modal-form-input"
                    value={email}
                    readOnly
                />
            </div>
            <div className="modal-form-item">
                <label className="modal-form-label">NAME</label>
                <input
                    className="modal-form-input"
                    value={formDisplayName}
                    onChange={(e) => setFormDisplayName(e.target.value)}
                    placeholder={'- tell us what they call you'}
                />
            </div>
            <div className="modal-form-item">
                <label className="modal-form-label">BIO</label>
                <textarea
                    className="modal-form-input profile-form-textarea"
                    value={formBio}
                    rows={3}
                    onChange={(e) => setFormBio(e.target.value)}
                    maxLength={140}
                    placeholder={'- let the world know who you are'}
                />
            </div>
            <div className="modal-textarea-footer">{`[${formBio ? formBio.length : 0}/140]`}</div>
            <div className="modal-footer">
                <div className="modal-button-wrapper">
                    {photoUploading ?
                        <button className="modal-progress-spinner">
                            <SmallSpinner
                                size={5}
                                color={'blue'}
                            />
                        </button> :
                        <button className="wc-button size-lg" onClick={() => updateProfile()} disabled={!formDisplayName}>
                            <Icon name="check" />
                        </button>}
                </div>
            </div>
        </div>
    );
};