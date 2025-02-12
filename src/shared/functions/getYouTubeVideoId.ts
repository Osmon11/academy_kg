export function getYouTubeVideoId(
  url: string | null,
) {
  if (!url) return undefined;
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([^&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : undefined;
}
