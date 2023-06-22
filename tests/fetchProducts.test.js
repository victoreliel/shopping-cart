require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('testa se "fetchProducts" é uma função', () => {
    expect(typeof (fetchProducts)).toEqual('function');
  });

  it('testa se "fetch" é chamada com o argumento "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('testa se ao chamar a função "fetchProducts" com o argumento "computador" a função "fetch" utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('testa se o retorno da função "fetchProducts" com o argumento "computador" é uma estruta de dados igual ao objeto "computadorSearch"', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('testa se, ao chamar a função "fetchProducts" sem argumento, retorna um erro com a mensagem "You must provide an url"', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
