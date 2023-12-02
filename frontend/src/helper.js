export const BASE_URL = process.env.NODE_ENV !== "production"?"http://localhost:3001/api/":"/api/"
export const BASE_URL_WEBSOCKET = process.env.NODE_ENV !== "production"?"ws://localhost:3001/":"ws://https://thewhitediary.onrender.com/"
export const postTextLength = 300;