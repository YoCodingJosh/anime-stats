export interface JikanErrorResponse {
  status: number;
  type: string;
  message: string;
  error: string;
}

export interface JikanUserResponse {
  data: {
    mal_id: number;
    username: string;
    url: string;
    images: {
      jpg: {
        image_url: string;
      },
      webp: {
        image_url: string;
      }
    },
    last_online: string;
    gender?: string;
    birthday?: string;
    location?: string;
    joined: string;
  }
}
