export const API_BASE = import.meta.env.VITE_BACKEND_URL || `${window.location.origin.replace(/:\d+$/, '')}:8000`;

async function request(path, params = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...params });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const ProductsAPI = {
  list: (opts = {}) => {
    const qs = new URLSearchParams();
    if (opts.q) qs.set('q', opts.q);
    if (opts.category) qs.set('category', opts.category);
    if (opts.ingredient) qs.set('ingredient', opts.ingredient);
    if (opts.min_price != null) qs.set('min_price', opts.min_price);
    if (opts.max_price != null) qs.set('max_price', opts.max_price);
    if (opts.sort) qs.set('sort', opts.sort);
    return request(`/api/products?${qs.toString()}`);
  },
  get: (id) => request(`/api/products/${id}`),
};
