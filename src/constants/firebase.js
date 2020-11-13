export const firebaseAuth = {
    type: process.env.REACT_APP_FIREBASE_AUTH_TYPE,
    project_id: process.env.REACT_APP_FIREBASE_AUTH_PROJECT_ID,
    private_key_id: process.env.REACT_APP_FIREBASE_AUTH_PRIVATE_KEY_ID,
    private_key: process.env.REACT_APP_FIREBASE_AUTH_PRIVATE_KEY,
    client_email: process.env.REACT_APP_FIREBASE_AUTH_CLIENT_EMAIL,
    client_id: process.env.REACT_APP_FIREBASE_AUTH_CLIENT_ID,
    auth_uri: process.env.REACT_APP_FIREBASE_AUTH_URI,
    token_uri: process.env.REACT_APP_FIREBASE_AUTH_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.REACT_APP_FIREBASE_AUTH_CERT_URI,
    client_x509_cert_url: process.env.REACT_APP_FIREBASE_AUTH_CERT_URL
};

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_AUTH_PROJECT_ID,
    storageBucket: '',
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID
};

export const databaseConfig = {
    serviceAccount: firebaseAuth,
    databaseURL: process.env.REACT_APP_FIREBASE_CONFIG_DATABASE_URL
};

export const storageConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
};

export const serverKey = process.env.REACT_APP_SERVER_KEY;
export const publicVapidKey = process.env.REACT_APP_PUBLIC_VAPID_KEY;
export const fcmURL = process.env.REACT_APP_FCMURL;
export const adminId = process.env.REACT_APP_ADMIN_ID;
