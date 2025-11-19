import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { ShoppingCart, User, Search, Leaf, ChevronDown } from 'lucide-react'
import { ProductsAPI } from './lib/api'

function Header({ onSearch }) {
  const [term, setTerm] = useState('')
  useEffect(() => {
    const id = setTimeout(() => onSearch(term), 300)
    return () => clearTimeout(id)
  }, [term])

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-200 via-amber-300 to-amber-100 flex items-center justify-center ring-1 ring-amber-300/50">
            <Leaf className="w-5 h-5 text-emerald-700" />
          </div>
          <span className="font-semibold tracking-tight text-emerald-900">Prakriti</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-emerald-900/80">
          <a href="#" className="hover:text-emerald-900">Home</a>
          <a href="#products" className="hover:text-emerald-900">Shop</a>
          <a href="#about" className="hover:text-emerald-900">About</a>
          <a href="#contact" className="hover:text-emerald-900">Contact</a>
        </nav>
        <div className="ml-auto flex items-center gap-3 w-full md:w-auto">
          <div className="flex-1 md:flex-none relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-800/60" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search Ayurvedic skincare"
              className="w-full pl-9 pr-3 py-2 rounded-full ring-1 ring-emerald-700/20 focus:ring-2 focus:ring-emerald-600/40 outline-none bg-white/70"
            />
          </div>
          <a href="#cart" className="p-2 rounded-full hover:bg-emerald-50">
            <ShoppingCart className="w-5 h-5 text-emerald-900" />
          </a>
          <a href="#login" className="p-2 rounded-full hover:bg-emerald-50">
            <User className="w-5 h-5 text-emerald-900" />
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="h-[420px] md:h-[520px] lg:h-[640px]">
        <Spline scene="https://prod.spline.design/c1w2QYixcPkptHWE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-50 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-10 ring-1 ring-emerald-700/10 w-full md:w-[560px]">
            <p className="text-emerald-700 font-medium">Discover Pure Ayurvedic Skincare</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-emerald-950 mt-2">Nurture your skin with nature</h1>
            <p className="text-emerald-900/80 mt-3">Handcrafted blends with saffron, neem, and sandalwood. Clean, conscious, and cruelty-free.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#products" className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 text-white hover:bg-emerald-800 transition">Shop now</a>
              <a href="#about" className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full ring-1 ring-emerald-700/20 hover:bg-white transition">
                Our philosophy <ChevronDown className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Filters({ state, setState, categories, ingredients }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <select
        value={state.category}
        onChange={(e) => setState((s) => ({ ...s, category: e.target.value }))}
        className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={state.ingredient}
        onChange={(e) => setState((s) => ({ ...s, ingredient: e.target.value }))}
        className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white"
      >
        <option value="">Any Ingredient</option>
        {ingredients.map((i) => (
          <option key={i} value={i}>{i}</option>
        ))}
      </select>
      <select
        value={state.sort}
        onChange={(e) => setState((s) => ({ ...s, sort: e.target.value }))}
        className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white"
      >
        <option value="popularity_desc">Popularity</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A-Z</option>
        <option value="name_desc">Name: Z-A</option>
      </select>
      <div className="flex items-center gap-2">
        <input type="number" min="0" placeholder="Min" value={state.min_price ?? ''} onChange={(e) => setState((s) => ({ ...s, min_price: e.target.value ? Number(e.target.value) : undefined }))} className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white" />
        <span className="text-emerald-900/70">-</span>
        <input type="number" min="0" placeholder="Max" value={state.max_price ?? ''} onChange={(e) => setState((s) => ({ ...s, max_price: e.target.value ? Number(e.target.value) : undefined }))} className="w-full px-4 py-2 rounded-xl ring-1 ring-emerald-700/20 bg-white" />
      </div>
    </div>
  )
}

function ProductCard({ p }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white ring-1 ring-emerald-700/10 hover:shadow-xl transition">
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
  )
}

function ProductsSection() {
  const [filters, setFilters] = useState({ category: '', ingredient: '', sort: 'popularity_desc', min_price: undefined, max_price: undefined })
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.category))
    return Array.from(set)
  }, [items])

  const ingredients = useMemo(() => {
    const all = items.flatMap(i => i.ingredients || [])
    return Array.from(new Set(all))
  }, [items])

  useEffect(() => {
    setLoading(true)
    ProductsAPI.list({ ...filters, q: query })
      .then(setItems)
      .finally(() => setLoading(false))
  }, [filters, query])

  return (
    <section id="products" className="py-12 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-950">Featured Ayurveda</h2>
            <p className="text-emerald-900/70">Bestsellers and new arrivals crafted with natural ingredients</p>
          </div>
        </div>

        <Filters state={filters} setState={setFilters} categories={categories} ingredients={ingredients} />

        <div className="mt-6">
          {loading ? (
            <div className="text-center text-emerald-900/70 py-10">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((p) => (<ProductCard key={p.id || p.title} p={p} />))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Header onSearch={setSearch} />
      <Hero />
      <ProductsSection key={search} />
      <footer className="py-10 text-center text-emerald-900/60">© {new Date().getFullYear()} Prakriti Ayurveda. All rights reserved.</footer>
    </div>
  )
}
