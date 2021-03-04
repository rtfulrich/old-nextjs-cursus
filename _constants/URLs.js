// Environment (to be modified in deployement)
export const FRONT_URL = "http://localhost:3000";
export const BACK_URL = "http://localhost:8000";

// No modifications
export const API_URL = BACK_URL + "/api";
export const ADMIN_API_URL = API_URL + "/admin";
export const FILEMANAGER_IMAGES = BACK_URL + "/filemanager?type=images";
export const FILEMANAGER_FILES = BACK_URL + "/filemanager?type=files";

export const DEFAULT_IMAGE_COVER = BACK_URL + "/images/post-cover.png";