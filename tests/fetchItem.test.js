require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('testa se "fetchItem" é uma função', () => {
    expect(typeof (fetchItem)).toEqual('function');
  });

  it('testa se a função "fetchItem" é chamada com o argumento "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('testa se ao chamar a função "fetchItem" com o argumento "MLB1615760527" a função "fetch" utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('testa se o retorno da função "fetchItem" com o argumento "MLB1615760527" é uma estruta de dados igual ao objeto "item"', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('testa se, ao chamar a função "fetchItem" sem argumento, retorna um erro com a mensagem "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
