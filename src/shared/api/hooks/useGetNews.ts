import { Api } from "../api.ts";
import { NewResponseType } from "../types.ts";
import { useState } from "react";

export const useGetNews = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getNews = async () => {
    try {
      setIsLoading(true);
      const response: NewResponseType = await Api.getNews();

      return response;
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { getNews, isLoading };
};
