import React, {useState, useContext, useEffect} from 'react';
import findOrientation from 'exif-orientation';
import {ProgressRing, Icon} from '../../ui';
import {StateContext} from '../../../context';

export const ImageUploader = (props) => {
    const {storageRef} = useContext(StateContext);

    const [imageDetails, setImageDetails] = useState({});
    const [progressPerc, setProgressPerc] = useState({});
    const [totalProgress, setTotalProgress] = useState({});
    const [noOfFiles, setNoOfFiles] = useState(0);
    const [newFilesLength, setNewFilesLength] = useState(0);
    const [warning, setWarning] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const {confirmAndHideModal, setRandomFiles, userId, randomFiles} = props;

    const sendPhoto = () => {
        setRandomFiles([]);
        confirmAndHideModal();
    };

    const removePhoto = (image) => {
        setWarning('');
        const randomFilesNew = randomFiles.filter((file) => file !== image);
        setRandomFiles(randomFilesNew);
        setNoOfFiles(randomFilesNew.length);
        if (!selectedIndex && !randomFilesNew.length) setSelectedIndex(0);
        else if (selectedIndex === randomFilesNew.length) setSelectedIndex(selectedIndex - 1);

        storageRef
            .child(`camera/${userId}/${image.name}`)
            .delete();
    };

    useEffect(() => {
        if (imageDetails.photoURL) {
            setRandomFiles([...randomFiles, imageDetails]);
        }
    }, [imageDetails]);

    useEffect(() => {
        setTotalProgress({...totalProgress, ...progressPerc});
    }, [progressPerc]);

    useEffect(() => {
        setTotalProgress({});
        setNewFilesLength(noOfFiles - randomFiles.length);
    }, [noOfFiles]);

    const getProgress = () => {
        if (!newFilesLength) return 0;
        return Math.floor(Object.values(totalProgress).reduce((acc, inc) => acc + inc, 0) / newFilesLength);
    };

    const handlePhotoUpload = (files) => {
        const numberOfFiles = files.length;
        if ((randomFiles.length + numberOfFiles) > 5) setWarning('A maximum of 5 images can be uploaded at a time');
        else {
            setWarning('');
            setNoOfFiles(randomFiles.length + numberOfFiles);

            for (let index = 0; index < numberOfFiles; index++) {
                const randomName = Math.random()
                    .toString()
                    .slice(2);
                const reader = new FileReader();
                const imgFile = files[index];

                if (imgFile && imgFile.name) {
                    reader.readAsDataURL(imgFile);
                    reader.onload = (event) => {
                        findOrientation(imgFile, (err, orientation) => {
                            const degree = err ? 0 : orientation.rotate;
                            const img = new Image();
                            img.src = event.target.result;
                            img.onload = () => {
                                const canvas = document.createElement('canvas');
                                const ctx = canvas.getContext('2d');

                                const width = 400;
                                const scaleFactor = width / img.width;
                                const height = scaleFactor * img.height;

                                canvas.width = width;
                                canvas.height = height;

                                let aspectRatio = 0;
                                if (degree === 90) {
                                    canvas.width = height;
                                    canvas.height = width;
                                    ctx.rotate(Math.PI / 2);
                                    ctx.translate(0, -height);
                                    aspectRatio = height / width;
                                    ctx.drawImage(img, 0, 0, width, height);
                                } else if (degree === 180 || degree === -180) {
                                    ctx.rotate((degree * Math.PI) / 180);
                                    ctx.translate(-width, -height);
                                    ctx.drawImage(img, 0, 0, width, height);
                                    aspectRatio = width / height;
                                } else if (degree === -90) {
                                    canvas.width = height;
                                    canvas.height = width;
                                    ctx.rotate(-Math.PI / 2);
                                    ctx.translate(-width, 0);
                                    aspectRatio = height / width;
                                    ctx.drawImage(img, 0, 0, width, height);
                                } else {
                                    ctx.drawImage(img, 0, 0, width, height);
                                    aspectRatio = width / height;
                                }

                                ctx.canvas.toBlob(
                                    (blob) => {
                                        const file = new File([blob], randomName, {
                                            type: 'image/png',
                                            lastModified: Date.now()
                                        });
                                        const uploadPath = storageRef.child(
                                            `camera/${userId}/${randomName}`
                                        );
                                        const uploadTask = uploadPath.put(file);
                                        uploadTask.then(() => {
                                            uploadPath.getDownloadURL().then((downloadURL) => {
                                                const buffer = new Image();
                                                buffer.onload = () => {
                                                    setImageDetails({
                                                        name: randomName,
                                                        imgHeight: height,
                                                        photoURL: downloadURL,
                                                        aspectRatio,
                                                        ready: true
                                                    });
                                                };
                                                buffer.src = downloadURL;
                                            });
                                        });

                                        uploadTask.on('state_changed', (snapshot) => {
                                            const progressPerc = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                            setProgressPerc({
                                                [randomName]: progressPerc
                                            });
                                        });
                                    },
                                    'image/png',
                                    1
                                );
                            };
                        });
                    };
                }
            }
        }
    };

    const getWrapperWidth = () => {
        if (document.getElementById('modal')) {
            return document.getElementById('modal').offsetWidth;
        }
    };

    const progress = getProgress();

    const getImageStats = (image) => {
        if (image) {
            const {aspectRatio, imgHeight: height} = image;
            const width = aspectRatio * height;
            const maxWidth = getWrapperWidth() - 80;
            const exceedsWidth = width > maxWidth;
            const exceedsHeight = height > 270;

            let imgWidth = width;
            let imgHeight = height;

            if (!exceedsHeight && !exceedsWidth) {
                imgWidth = width;
                imgHeight = height;
            } else if (exceedsHeight && !exceedsWidth) {
                imgHeight = 270;
                imgWidth = aspectRatio * 270;
            } else if (exceedsWidth && !exceedsHeight) {
                imgWidth = maxWidth;
                imgHeight = imgWidth / aspectRatio;
            } else {
                const widthRatio = maxWidth / width;
                const heightRatio = 270 / height;
                if (widthRatio < heightRatio) {
                    imgWidth = maxWidth;
                    imgHeight = maxWidth / aspectRatio;
                } else {
                    imgHeight = 270;
                    imgWidth = 270 * aspectRatio;
                }
            }
            return ({
                imgHeight,
                imgWidth
            });
        }
        return ({
            imgHeight: 0,
            imgWidth: 0
        });
    };

    const image = randomFiles[selectedIndex];
    const {imgWidth, imgHeight} = getImageStats(image);

    return (
        <div className="modal-body-container">
            <span className="modal-img-wrapper">
                <div
                    className={
                        randomFiles.length
                            ? 'no-background preview-img-wrapper'
                            : 'preview-img-wrapper'
                    }
                    id="preview-img-wrapper"
                >
                    {image ?
                        <div
                            key={image.photoURL}
                            className="share-img-wrapper"
                            style={{minWidth: getWrapperWidth()}}
                        >
                            <div
                                className={'share-img'}
                                style={{
                                    borderWidth: image.ready ? 0 : 1,
                                    width: imgWidth,
                                    height: imgHeight
                                }}
                            >
                                <img
                                    id={`profile-image-${image.name}`}
                                    src={image.photoURL}
                                    alt={''}
                                    style={{
                                        width: imgWidth,
                                        height: imgHeight
                                    }}
                                />
                                <button className="wc-icon remove-button" onClick={() => removePhoto(image)}><Icon name="times-close-light" /></button>
                            </div>
                        </div> :
                        null}
                </div>
                <div className="img-navigator">
                    {randomFiles.map((file, index) => {
                        const activeThumbnail = selectedIndex === index ? 'active' : '';
                        return (
                            <div
                                className={`${activeThumbnail} wc-image`}
                                key={'icon' + index}
                                onClick={() => setSelectedIndex(index)}
                            >
                                <img
                                    src={file.photoURL}
                                    alt={''}
                                    className="wc-thumbnail"
                                />
                            </div>
                        );
                    })}
                </div>

                <input
                    type="file"
                    name="image-file"
                    id="image-file"
                    className="display-hidden"
                    multiple
                    onChange={(e) => handlePhotoUpload(e.target.files)}
                    accept=".jpeg,.jpg,.png"
                />
                <label htmlFor="image-file" className="wc-label">
                    {'Choose from your gallery'}
                </label>
            </span>
            <div className="modal-footer">
                <div className="modal-warning">{warning}</div>
                <div className="modal-button-wrapper">
                    {randomFiles.length !== noOfFiles || (randomFiles.some((file) => file.photoURL) && !randomFiles.length) ? (
                        <button className="modal-progress-spinner">
                            <ProgressRing
                                percentage = {progress}
                                size={40}
                                textSize={10}
                            />
                        </button>
                    ) : (
                        <button
                            disabled={!randomFiles.some((file) => file.photoURL)}
                            className="wc-button size-lg forward-button"
                            onClick={sendPhoto}
                        >
                            <Icon name="paper-plane-pro" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
