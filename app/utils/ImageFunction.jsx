import { IMAGE_API_URL } from "@/service/api";

export function getImageUrl(raw) {
    if (!raw) return null;
    // Normalize backslashes → forward slashes
    const normalized = raw.replace(/\\/g, "/");
    return `${IMAGE_API_URL}${normalized}`;
}