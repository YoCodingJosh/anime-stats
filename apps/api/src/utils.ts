import { Context } from "hono";
import { ZodSchema } from "zod";

export interface MALResponse<T> {
  data?: T;
  response: {
    status: number;
  };
}

export const malFetch = async <T>(
  url: string,
  c: Context,
  schema: ZodSchema<T>
): Promise<MALResponse<T>> => {
  const response = await fetch(url, {
    headers: { "X-MAL-CLIENT-ID": c.env.MAL_CLIENT_ID },
  });

  let malResponse: MALResponse<T> = {
    data: undefined,
    response: {
      status: response.status,
    },
  };

  if (response.ok) {
    const jsonData = await response.json();
    
    // bubble up the error
    const parseResult = schema.parse(jsonData);

    malResponse.data = parseResult;
  }

  return malResponse;
};
