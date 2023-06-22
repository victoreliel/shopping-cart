const cartList = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const { target } = event;
  target.remove();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${id} | NAME: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItemToCart = async (event) => {
  const { target } = event;
  const productId = target.parentElement.firstChild.innerText;
  const addItem = await fetchItem(productId);
  cartList.appendChild(createCartItemElement(addItem));
  saveCartItems(cartList.innerHTML);
};

const createBtnAddCart = () => {
  const btns = document.querySelectorAll('.item__add');
  btns.forEach((btn) => btn.addEventListener('click', addItemToCart));
};

const getSavedItemsFromLocalStorage = () => {
  cartList.innerHTML = getSavedCartItems();
  const items = document.querySelectorAll('.cart__item');
  items.forEach((item) => item.addEventListener('click', cartItemClickListener));
};

const createProductsList = async () => {
  const products = await fetchProducts('computador');
  const sectionItems = document.querySelector('.items');
  products.results.forEach((item) => {
    const product = createProductItemElement(item);
    sectionItems.appendChild(product);
  });
};

const clearCart = () => {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', () => {
    cartList.innerHTML = '';
  });
};

window.onload = async () => {
  await createProductsList();
  createBtnAddCart();
  getSavedItemsFromLocalStorage();
  clearCart();
};
