const numeral = require('numeral');

/**
 * @function formatProductDetail
 * @param {string} product product return from api meli
 * @param {string} description description of the product return from api meli
 * @returns {Objetc} response with requested format
 */
exports.formatProductDetail = (product, description) => {
  const format = {};
  format.author = author();
  format.items = getDetails(product, description);
  return format; 
}

/**
 * @function formatProduct
 * @param {string} product product return from api meli
 * @returns {Objetc} response with requested format
 */
exports.formatProduct = (response) => {
  const format = {};
  format.author = author();
  format.items = getProduct(response.results);
  format.categories = getCategories(response.filters);
  return format;
}

/**
 * @function getDetails
 * @param {string} product an a product
 * @param {string} description a product description
 * @returns {Objetc} detail of product
 */
const getDetails = (product, description) => {
  const format = {};

  format.id = (product.id);
  format.title = (product.title);
  format.price = {
    amount: formatPrice(product.price),
    currency: product.currency_id };

  if (product.pictures.length) {
    format.picture = product.pictures[0].secure_url;
  }

  format.condition = product.condition === 'new' ? 'Nuevo' : 'Usado';
  format.free_shipping = product.shipping.free_shipping;
  format.sold_quantity = product.sold_quantity;
  format.description = description.plain_text;

  return format;
}

/**
 * @function author
 * @returns {Objetc} return data handling signature
 */
const author = () => ({ name: 'Nerio', lastname: 'Ramirez'});

/**
 * @function getProduct
 * @param {string} item an a product
 * @returns {Objetc} dreturn format product
 */
const getProduct = (items) => {
  return items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: formatPrice(item.price),
        //TODO decimals
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      address: item.address.state_name
    }
  })
}

/**
 * @function getProduct
 * @param {String} filters filters of a product
 * @returns {Objetc} return categories
 */
const getCategories = (filters) => {
  var categories = [];

  filters.forEach(function(filter) {
    if (filter.id === "category") {
      filter.values[0].path_from_root.forEach(function(category) {
        categories.push(category.name);
      });
    }
  });

  return categories;
}

/**
 * @function formatPrice
 * @param {String} price price of product
 * @returns {String} return format of price
 */
const formatPrice = (price) => numeral(price).format('$ 0.[00]');