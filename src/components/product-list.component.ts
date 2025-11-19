import { useEffect, useMemo, useState } from 'react'
import { ProductsAPI } from '../lib/api'

export interface Product {
  id?: string
  title: string
  description?: string
  price: number
  category: string
  ingredients: string[]
  image_url?: string
  popularity?: number
}

export default function ProductList() {
  const [filters, setFilters] = useState({ category: '', ingredient: '', sort: 'popularity_desc', min_price: undefined as number | undefined, max_price: undefined as number | undefined })
  const [q, setQ] = useState('')
  const [items, setItems] = useState<Product[]>([])

  const categories = useMemo(() => Array.from(new Set(items.map(i => i.category))), [items])
  const ingredients = useMemo(() => Array.from(new Set(items.flatMap(i => i.ingredients || []))), [items])

  useEffect(() => {
    ProductsAPI.list({ ...filters, q }).then(setItems)
  }, [filters, q])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <select value={filters.category} onChange={(e) => setFilters(s => ({ ...s, category: e.target.value }))} className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white">
          <option value="">All Categories</option>
          {categories.map(c => (<option key={c} value={c}>{c}</option>))}
        </select>
        <select value={filters.ingredient} onChange={(e) => setFilters(s => ({ ...s, ingredient: e.target.value }))} className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white">
          <option value="">Any Ingredient</option>
          {ingredients.map(i => (<option key={i} value={i}>{i}</option>))}
        </select>
        <select value={filters.sort} onChange={(e) => setFilters(s => ({ ...s, sort: e.target.value }))} className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white">
          <option value="popularity_desc">Popularity</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A-Z</option>
          <option value="name_desc">Name: Z-A</option>
        </select>
        <div className="flex items-center gap-2">
          <input type="number" min={0} placeholder="Min" value={filters.min_price ?? ''} onChange={(e) => setFilters(s => ({ ...s, min_price: e.target.value ? Number(e.target.value) : undefined }))} className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white" />
          <span className="text-emerald-900/70">-</span>
          <input type="number" min={0} placeholder="Max" value={filters.max_price ?? ''} onChange={(e) => setFilters(s => ({ ...s, max_price: e.target.value ? Number(e.target.value) : undefined }))} className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(p => (
          <div key={p.id || p.title} className="group rounded-2xl overflow-hidden bg-white ring-1 ring-emerald-700/10 hover:shadow-xl transition">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-emerald-950">{p.title}</h3>
              <p className="text-sm text-emerald-900/70 line-clamp-2 mt-1">{p.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-emerald-900 font-semibold">${p.price.toFixed(2)}</span>
                <button className="px-3 py-1.5 rounded-full bg-emerald-700 text-white text-sm hover:bg-emerald-800">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
