import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('posts').select('*')
      if (error) throw error
      return data
    },
  })
}
