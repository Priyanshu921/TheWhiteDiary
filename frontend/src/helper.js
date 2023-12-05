export const BASE_URL = process.env.NODE_ENV !== "production"?"http://localhost:3001/api/":"/api/"
export const BASE_URL_WEBSOCKET = process.env.NODE_ENV !== "production"?"ws://localhost:3001/":"wss://thewhitediary.onrender.com/"
export const IMAGE_URL = "https://drive.google.com/uc?export=view&id=";
export const postTextLength = 300;