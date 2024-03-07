import useSWR from "swr";
import { api } from "./axios";

export function useFetch(uri: string) {
  const { data, error, isLoading } = useSWR(uri, async () => {
    const { data } = await api.get(uri)
    return data
  })

  return { data, error, isLoading }
}