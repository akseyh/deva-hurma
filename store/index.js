import { lowerCase } from '../utils/validations'
const axios = require('axios')

const contentful = require('contentful')

const client = contentful.createClient({
  space: process.env.contentSpace,
  accessToken: process.env.contentAccessToken,
  host: 'preview.contentful.com'
})

export const state = {
  products: [],
  basket: [],
  others: []
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
            piece: el.piece + 0.5
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
          piece: el.piece - 0.5
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
  }
}

export const actions = {
  fetchProducts({ commit }) {
    return client.getEntries({
      content_type: 'item',
      'fields.itemType.sys.id': '2rz89q2OKAbk8Nzege9TYd'
    })
      .then((response) => {
        const products = response.items.map(el => el.fields)
        commit('setProducts', products)
      })
      .catch(console.error)
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
      commit('resetBasket')
    })
  },
  orderNotification({ }, { message }) {
    const path = ('https://api.telegram.org/' + process.env.telegramAPIToken + '/sendMessage?chat_id=' + process.env.telegramChatId + '&parse_mode=Markdown&text=' + message).trim()
    return axios.post(path)
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
      })
  },
  fetchOthers({ commit }) {
    return client.getEntries({
      content_type: 'item',
      'fields.itemType.sys.id': '1Ldo7WaDJEAXWEzOERokyN'
    })
      .then((response) => {
        const products = response.items.map(el => el.fields)
        commit('setOthers', products)
      })
      .catch(console.error)
  }
}

export const getters = {
  basketTotal(state) {
    return state.basket
      .reduce((total, el) => {
        const price = el.discountPrice || el.price
        return total + (price * el.piece)
      }, 0)
  }
}
