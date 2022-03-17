const axios = require('axios')

import { lowerCase } from '../utils/validations'

export const state = {
  products: [],
  basket: [],
  others: [],
  banners: [],
  lastOrder: {
    name: '',
    totalPrice: 0
  }
}

export const mutations = {
  setProducts(state, val) {
    state.products = val
  },
  setOthers(state, val) {
    state.others = val
  },
  addToBasket(state, product) {
    const hasProductInBasket = state.basket.find(el => el.name === product.name)
    if (hasProductInBasket) {
      state.basket = state.basket.map(el => {
        if (el.name === product.name) {
          return {
            ...el,
            piece: el.piece + 1
          }
        } else return el
      })
    } else {
      state.basket = [
        ...state.basket,
        {
          ...product,
          piece: 1
        }
      ]
    }
  },
  subtractFromBasket(state, productName) {
    const productInBasketIndex = state.basket.findIndex(el => el.name === productName)
    if (productInBasketIndex === -1 || state.basket[productInBasketIndex].piece === 0) return

    state.basket = state.basket.map((el, index) => {
      if (index === productInBasketIndex) {
        return {
          ...el,
          piece: el.piece - 1
        }
      } else return el
    }).filter(el => el.piece > 0)
  },
  resetBasket(state) {
    state.basket = []
  },
  removeFromBasket(state, productName) {
    const payload = state.basket.filter(product => product.name !== productName)

    state.basket = payload
  },
  setBanners(state, val) {
    state.banners = val
  },
  setLastOrder(state, val) {
    state.lastOrder = val
  }
}

export const actions = {
  async fetchProducts({ commit }) {
    try {
      const response = await axios.get('/.netlify/functions/items')
      const products = response.data.items.map(el => el.fields).filter(el => !!el.price && !!el.name && !!el.weight)
      commit('setProducts', products)
    } catch (err) {
      console.error(err)
      commit('setProducts', [])
    }
  },
  async makeOrder({ state, commit, dispatch }, { name, address, phone }) {
    let totalPrice = 0

    name = lowerCase(name)
    address = lowerCase(address)
    phone = lowerCase(phone)

    await dispatch('orderNotification', { message: '----------' })
    await dispatch('orderNotification', { message: name })
    await dispatch('orderNotification', { message: phone })
    await dispatch('orderNotification', { message: address })

    Promise.all(
      state.basket.map(async el => {
        const price = el.discountPrice || el.price
        let text = el.piece + ' adet: ' + el.name + '(' + price + 'TL)'
        totalPrice += el.piece * price
        text = lowerCase(text)

        await dispatch('orderNotification', { message: text })
      })
    ).then(async () => {
      const totalPriceText = 'Toplam: ' + totalPrice + 'TL'
      await dispatch('orderNotification', { message: totalPriceText })
      commit('setLastOrder', {
        name,
        totalPrice
      })
      commit('resetBasket')
    })
  },
  orderNotification({ }, { message }) {
    const path = ('https://api.telegram.org/' + process.env.TELEGRAM_API_TOKEN + '/sendMessage?chat_id=' + process.env.TELEGRAM_CHAT_ID + '&parse_mode=Markdown&text=' + message).trim()
    return axios.post(path)
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
      })
  },
  async fetchOthers({ commit }) {
    try {
      const response = await axios.get('/.netlify/functions/others')
      const products = response.data.items.map(el => el.fields)
      commit('setOthers', products)
    } catch (error) {
      console.error(error)
      commit('setOthers', [])
    }
  },
  async fetchBanners({ commit }) {
    try {
      const response = await axios.get('.netlify/functions/banners')
      const banners = response.data.items.map(el => el.fields)
      commit('setBanners', banners)
    } catch (error) {
      console.error(error)
      commit('setBanners', [])
    }
  }
}

export const getters = {
  basketTotal(state) {
    return state.basket
      .reduce((total, el) => {
        const price = el.discountPrice || el.price
        return total + (price * el.piece)
      }, 0)
  },
  basketWeight(state) {
    return state.basket
      .reduce((total, el) => total + (el.weight * el.piece), 0)
  }
}
