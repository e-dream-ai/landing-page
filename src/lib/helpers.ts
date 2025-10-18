import { uuidMapping } from "./mappings";

/**
 * Extracts the thumbnail ID from a file path
 * @param thumbnailPath - Path to the thumbnail
 * @returns The thumbnail ID without prefix and extension
 */
function extractThumbnailId(thumbnailPath: string): string {
  const filename = thumbnailPath.split("/").pop();
  if (!filename) {
    throw new Error("Invalid thumbnail path");
  }

  const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
  return nameWithoutExtension.substring(6);
}

/**
 * Extracts the video path from a thumbnail path using UUID mapping
 * @param thumbnailPath - Path to the thumbnail (e.g., "/thumbnails-ranked/00002-5d41d3c5-da1f-4040-884a-4f1c5bf3c0a1.jpg")
 * @returns The corresponding video path (e.g., "/processed-videos/processed_5d41d3c5-da1f-4040-884a-4f1c5bf3c0a1.mp4")
 */
export function getVideoPathFromThumbnail(thumbnailPath: string): string {
  const thumbnailId = extractThumbnailId(thumbnailPath);

  // Use UUID mapping if available, otherwise fallback to direct mapping
  const videoId =
    uuidMapping[thumbnailId as keyof typeof uuidMapping] || thumbnailId;

  return `/processed-videos/processed_${videoId}.mp4`;
}

/**
 * Extracts just the video ID from a thumbnail path using UUID mapping
 * @param thumbnailPath - Path to the thumbnail
 * @returns The video ID (e.g., "5d41d3c5-da1f-4040-884a-4f1c5bf3c0a1")
 */
export function getVideoIdFromThumbnail(thumbnailPath: string): string {
  const thumbnailId = extractThumbnailId(thumbnailPath);

  // Use UUID mapping if available, otherwise fallback to direct mapping
  return uuidMapping[thumbnailId as keyof typeof uuidMapping] || thumbnailId;
}

/**
 * Builds the small preview video path from a thumbnail path using UUID mapping
 * @param thumbnailPath - Path to the thumbnail
 * @returns The corresponding small video path (e.g., "/small-videos/processed_<id>.mp4")
 */
export function getSmallVideoPathFromThumbnail(thumbnailPath: string): string {
  const videoId = getVideoIdFromThumbnail(thumbnailPath);
  return `/small-videos/processed_${videoId}.mp4`;
}
