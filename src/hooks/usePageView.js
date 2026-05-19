import { useEffect } from 'react'
import { supabase } from '../config/supabase'

export const usePageView = (page) => {
  useEffect(() => {
    supabase.from('page_views').insert({ page }).then()
  }, [page])
}
