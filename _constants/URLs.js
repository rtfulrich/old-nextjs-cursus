// Environment (to be modified in deployement)
export const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL || "http://localhost:3000";
export const FRONT_ADMIN_URL = process.env.NEXT_PUBLIC_FRONT_ADMIN_URL || `${FRONT_URL}/admin`;
export const BACK_URL = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:8000";

// No modifications
export const API_URL = process.env.NEXT_PUBLIC_API_URL || `${BACK_URL}/api`;
export const ADMIN_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL || `${API_URL}/admin`;
export const FILEMANAGER_IMAGES = process.env.NEXT_PUBLIC_FILEMANAGER_IMAGES || `${BACK_URL}/filemanager?type=images`;
export const FILEMANAGER_FILES = process.env.NEXT_PUBLIC_FILEMANAGER_FILES || `${BACK_URL}/filemanager?type=files`;

export const DEFAULT_IMAGE_COVER = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_COVER || `${BACK_URL}/images/post-cover.png`;