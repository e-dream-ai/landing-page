import { uuidMapping } from "./mappings";

function extractThumbnailId(thumbnailPath: string): string {
	const filename = thumbnailPath.split("/").pop();
	if (!filename) throw new Error("Invalid thumbnail path");
	return filename.replace(/\.[^/.]+$/, "");
}

function getVideoIdFromThumbnail(thumbnailPath: string): string {
	const thumbnailId = extractThumbnailId(thumbnailPath);
	return uuidMapping[thumbnailId as keyof typeof uuidMapping] || thumbnailId;
}

export function getVideoPathFromThumbnail(thumbnailPath: string): string {
	return `/processed-videos/processed_${getVideoIdFromThumbnail(thumbnailPath)}.mp4`;
}

export function getSmallVideoPathFromThumbnail(thumbnailPath: string): string {
	return `/small-videos/processed_${getVideoIdFromThumbnail(thumbnailPath)}.mp4`;
}

export function shuffled<T>(items: T[]): T[] {
	const result = [...items];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}
