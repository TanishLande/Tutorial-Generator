import axios from 'axios';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

interface YouTubeSearchParams {
  part: string;
  q: string;
  maxResults: number;
  type: string;
  key: string;
}

interface YouTubeVideoItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
    };
  };
}

export const getVideo = async (query: string): Promise<YouTubeVideoItem[]> => {
  const params: YouTubeSearchParams = {
    part: 'snippet',
    q: query,
    maxResults: 1,
    type: 'video',
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ''
  };

  try {
    const response = await axios.get(YOUTUBE_BASE_URL, { params });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
};

export default {
  getVideo
};