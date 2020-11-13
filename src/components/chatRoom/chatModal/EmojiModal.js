import React, {useEffect, useRef} from 'react';
import EmojiPicker from 'emoji-picker-react';

export const EmojiModal = (props) => {
    const {
        message,
        setMessage,
        closeEmojiModal,
        handleTyping
    } = props;

    const useOutsideClick = (ref) => {
        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleTyping(false);
                closeEmojiModal();
            }
        };
        useEffect(() => {
            document.addEventListener('mousedown', handleOutsideClick);
            return (() => document.removeEventListener('mousedown', handleOutsideClick));
        }, []);
    };
    const formatEmoji = (emoji) => {
        handleTyping(true);
        const symbols = emoji.split('-');
        const codesArray = symbols.map((eachSym) => '0x' + eachSym);
        return String.fromCodePoint(...codesArray);
    };
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef);
    return (
        <div className="emoji-modal" ref={wrapperRef}>
            <EmojiPicker onEmojiClick={(emoji) => setMessage(`${message}${formatEmoji(emoji)}`)} />
        </div>
    );
};