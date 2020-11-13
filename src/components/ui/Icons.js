import React, {Fragment} from 'react';

export const Icon = ({size = '1em', name, className, action}) => {
    const width = size;
    const renderIcon = (name) => {
        switch (name) {
            // icons for signin page

            case 'linkedin': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            style={{width}}
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="linkedin-in"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill={'currentColor'}
                                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'github': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fab"
                            data-icon="github"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 496 512"
                        >
                            <path
                                fill="currentColor"
                                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'facebook': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            style={{width}}
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="facebook-square"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill={'currentColor'}
                                d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'facebook-f': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fab"
                            data-icon="facebook-f"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path
                                fill={'currentColor'}
                                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'github-alt': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fab"
                            data-icon="github-alt"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 480 512"
                        >
                            <path
                                fill={'currentColor'}
                                d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'arrow-right': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fas"
                            data-icon="arrow-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill={'currentColor'}
                                d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'angle-double-right': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fas"
                            data-icon="angle-double-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill={'currentColor'}
                                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                            />
                        </svg>
                    </i>
                );
            }

            // icons for verify page

            case 'angle-double-left': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            style={{width}}
                            data-prefix="fas"
                            data-icon="angle-double-left"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill={'currentColor'}
                                d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"
                            />
                        </svg>
                    </i>
                );
            }

            // icons for contacts widget

            case 'search': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fas"
                            data-icon="search"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'search-lite': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="far"
                            data-icon="search"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                            />
                        </svg>
                    </i>
                );
            }

            // chevron icons
            case 'chevron-down': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-down"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                            />
                        </svg>
                    </i>
                );
            }

            case 'chevron-up': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-up"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'chevron-right-pro': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="chevron-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'share-send': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-up"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'reply': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-up"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'link-pro': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="link"
                            role="img"
                            style={{width}}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <g>
                                <path
                                    fill="currentColor"
                                    opacity="0.8"
                                    d="M44.45 252.59l37.11-37.1c9.84-9.84 26.78-3.3 27.29 10.6a184.45 184.45 0 0 0 9.69 52.72 16.08 16.08 0 0 1-3.78 16.61l-13.09 13.09c-28 28-28.9 73.66-1.15 102a72.07 72.07 0 0 0 102.32.51L270 343.79A72 72 0 0 0 270 242a75.64 75.64 0 0 0-10.34-8.57 16 16 0 0 1-6.95-12.6A39.86 39.86 0 0 1 264.45 191l21.06-21a16.06 16.06 0 0 1 20.58-1.74A152.05 152.05 0 0 1 327 400l-.36.37-67.2 67.2c-59.27 59.27-155.7 59.26-215 0s-59.26-155.72.01-214.98z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M410.33 203.49c28-28 28.9-73.66 1.15-102a72.07 72.07 0 0 0-102.32-.49L242 168.21A72 72 0 0 0 242 270a75.64 75.64 0 0 0 10.34 8.57 16 16 0 0 1 6.94 12.6A39.81 39.81 0 0 1 247.55 321l-21.06 21.05a16.07 16.07 0 0 1-20.58 1.74A152.05 152.05 0 0 1 185 112l.36-.37 67.2-67.2c59.27-59.27 155.7-59.26 215 0s59.27 155.7 0 215l-37.11 37.1c-9.84 9.84-26.78 3.3-27.29-10.6a184.45 184.45 0 0 0-9.69-52.72 16.08 16.08 0 0 1 3.78-16.61z"
                                />
                            </g>
                        </svg>
                    </i>
                );
            }
            case 'trash-pro': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="trash"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            style={{width}}
                        >
                            <g>
                                <path
                                    fill="currentColor"
                                    opacity="0.7"
                                    d="M53.2 467L32 96h384l-21.2 371a48 48 0 0 1-47.9 45H101.1a48 48 0 0 1-47.9-45z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M0 80V48a16 16 0 0 1 16-16h120l9.4-18.7A23.72 23.72 0 0 1 166.8 0h114.3a24 24 0 0 1 21.5 13.3L312 32h120a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H16A16 16 0 0 1 0 80z"
                                />
                            </g>
                        </svg>
                    </i>
                );
            }
            case 'times-close-light': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="true"
                            data-prefix="far"
                            data-icon="times"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'angle-down': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            style={{width}}
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="angle-down"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                        >
                            <path
                                fill="currentColor"
                                d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'angle-left-pro': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="angle-left"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'share-three-dot': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="share-alt"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            style={{width}}
                        >
                            <g>
                                <path
                                    fill="currentColor"
                                    d="M155.79 180.9l102.49-64.06a95.93 95.93 0 0 0 33.93 54.26l-102.49 64.06a95.93 95.93 0 0 0-33.93-54.26zm136.42 160l-102.49-64.06a95.93 95.93 0 0 1-33.93 54.26l102.49 64.06a95.93 95.93 0 0 1 33.93-54.26z"
                                />
                                <path
                                    fill="currentColor"
                                    // opacity={'0.6'}
                                    d="M96 160a96 96 0 1 0 96 96 96 96 0 0 0-96-96zm256 32a96 96 0 1 0-96-96 96 96 0 0 0 96 96zm0 128a96 96 0 1 0 96 96 96 96 0 0 0-96-96z"
                                />
                            </g>
                        </svg>
                    </i>
                );
            }
            case 'map-marker': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="map-marker-alt"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'image-camera': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="image"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{width}}
                        >
                            <g>
                                <path
                                    fill="currentColor"
                                    opacity={'0'}
                                    d="M448 384H64v-48l71.51-71.52a12 12 0 0 1 17 0L208 320l135.51-135.52a12 12 0 0 1 17 0L448 272z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M464 64H48a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h416a48 48 0 0 0 48-48V112a48 48 0 0 0-48-48zm-352 56a56 56 0 1 1-56 56 56 56 0 0 1 56-56zm336 264H64v-48l71.51-71.52a12 12 0 0 1 17 0L208 320l135.51-135.52a12 12 0 0 1 17 0L448 272z"
                                />
                            </g>
                        </svg>
                    </i>
                );
            }
            case 'doc-file': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="file-alt"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'circle': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="circle"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'check-regular': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="check"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'check': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="check"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                            />
                        </svg>
                    </i>
                );
            }

            case 'paper-plane-pro': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            style={{width}}
                            focusable="false"
                            data-prefix="fad"
                            data-icon="paper-plane"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <g>
                                <path
                                    fill="currentColor"
                                    d="M245.53 410.5l-75 92.83c-14 17.1-42.5 7.8-42.5-15.8V358l280.26-252.77c5.5-4.9 13.3 2.6 8.6 8.3L191.72 387.87z"
                                    opacity={'0.6'}
                                />
                                <path
                                    fill="currentColor"
                                    d="M511.59 28l-72 432a24.07 24.07 0 0 1-33 18.2l-214.87-90.33 225.17-274.34c4.7-5.7-3.1-13.2-8.6-8.3L128 358 14.69 313.83a24 24 0 0 1-2.2-43.2L476 3.23c17.29-10 39 4.6 35.59 24.77z"
                                />
                            </g>
                        </svg>
                    </i>
                );
            }
            case 'paperclip-pro': {
                return (
                    <i
                        className={className || ''}
                        style={{lineHeight: '0.6em'}}
                        onClick={action}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="paperclip"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M149.106 512c-33.076 0-66.153-12.59-91.333-37.771-50.364-50.361-50.364-132.305-.002-182.665L319.842 29.498c39.331-39.331 103.328-39.331 142.66 0 39.331 39.332 39.331 103.327 0 142.657l-222.63 222.626c-28.297 28.301-74.347 28.303-102.65 0-28.3-28.301-28.3-74.349 0-102.649l170.301-170.298c4.686-4.686 12.284-4.686 16.97 0l5.661 5.661c4.686 4.686 4.686 12.284 0 16.971l-170.3 170.297c-15.821 15.821-15.821 41.563.001 57.385 15.821 15.82 41.564 15.82 57.385 0l222.63-222.626c26.851-26.851 26.851-70.541 0-97.394-26.855-26.851-70.544-26.849-97.395 0L80.404 314.196c-37.882 37.882-37.882 99.519 0 137.401 37.884 37.881 99.523 37.882 137.404.001l217.743-217.739c4.686-4.686 12.284-4.686 16.97 0l5.661 5.661c4.686 4.686 4.686 12.284 0 16.971L240.44 474.229C215.26 499.41 182.183 512 149.106 512z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'smile-beam-duotone': {
                return (
                    <i
                        className={className || ''}
                        style={{lineHeight: '0.6em'}}
                        onClick={action}
                    >
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fad"
                            data-icon="grin-beam"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 496 512"
                            style={{width}}
                        >
                            <g>
                                <path
                                    fill="currentColor"
                                    d="M248,8C111,8,0,119,0,256S111,504,248,504,496,393,496,256,385,8,248,8Zm24.2,215.4c3.1-42.1,32-71.4,55.8-71.4s52.7,29.3,56,71.4c.7,8.6-10.8,11.9-14.9,4.5l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8,7.9-31.5,21.6l-9.5,17C283,235.2,271.5,231.9,272.2,223.4Zm-160,0c3.1-42.1,32-71.4,55.8-71.4s52.7,29.3,56,71.4c.7,8.6-10.8,11.9-14.9,4.5l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8,7.9-31.5,21.6l-9.5,17C122.9,235.3,111.5,231.9,112.2,223.4ZM391.8,338.7c-9.3,55-83.2,93.3-143.8,93.3s-134.5-38.3-143.8-93.3a16,16,0,0,1,20.7-17.9C155.1,330.5,200,336,248,336s92.9-5.5,123.1-15.2a16,16,0,0,1,20.7,17.9Z"
                                />
                                <path d="M168,152c-23.8,0-52.7,29.3-55.8,71.4-.7,8.5,10.7,11.9,14.9,4.5l9.5-17c7.7-13.7,19.2-21.6,31.5-21.6s23.8,7.9,31.5,21.6l9.5,17c4.1,7.4,15.6,4.1,14.9-4.5-3.3-42.1-32.2-71.4-56-71.4Zm216,71.4c-3.3-42.1-32.2-71.4-56-71.4s-52.7,29.3-55.8,71.4c-.7,8.5,10.8,11.8,14.9,4.5l9.5-17c7.7-13.7,19.2-21.6,31.5-21.6s23.8,7.9,31.5,21.6l9.5,17C373.2,235.3,384.7,232,384,223.4Z" />
                            </g>
                        </svg>
                    </i>
                );
            }
            case 'plus-pro': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="plus"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'info': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="info"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'ellipsis-regular': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="ellipsis-v"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 128 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'ellipsis-solid': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="ellipsis-v"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 192 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
                            />
                        </svg>
                    </i>
                );
            }
            case 'heart-solid': {
                return (
                    <i className={className || ''} style={{lineHeight: '0.6em'}}>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="heart"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{width}}
                        >
                            <path
                                fill="currentColor"
                                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                            />
                        </svg>
                    </i>
                );
            }
            default:
                return null;
        }
    };
    return <Fragment>{renderIcon(name)}</Fragment>;
};
