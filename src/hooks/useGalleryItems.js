import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'

export const useGalleryItems = (type, fallbackItems) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('type', type)
        .eq('published', true)
        .order('sort_order', { ascending: true })

      if (!cancelled) {
        if (!error && data?.length > 0) {
          setItems(data)
        } else {
          setItems(fallbackItems)
        }
        setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [type, fallbackItems])

  return { items, loading }
}
