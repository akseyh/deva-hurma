const fetch = require("node-fetch");

import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
export default Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
}, fetch);
