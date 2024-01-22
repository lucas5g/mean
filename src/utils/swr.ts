import useSWR from 'swr'
import { api } from './axios'

export function swr(url: string) {
  const { data, error, isLoading } = useSWR(url, async () => {
    const { data } = await api.get(url)
    return data
  })

  return {data, error, isLoading}
}