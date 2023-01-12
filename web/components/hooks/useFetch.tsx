import useSWR from 'swr'
import http from '../services/http';

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate, isLoading } = useSWR<Data, Error>(url, async url => {
    const response = await http.get(url, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`
      }
    });

    return response.data;
  })

  return { data, error, isLoading, mutate }
}