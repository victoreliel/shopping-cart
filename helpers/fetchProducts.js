const fetchProducts = async (search) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  if (url.endsWith('undefined')) return new Error('You must provide an url');
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
