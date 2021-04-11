import { lowerCase } from '../utils/validations'
const axios = require('axios')

export const state = {
    products: [],
    basket: []
}

export const mutations = {
    setProducts(state, val) {
        state.products = val
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
    removeToBasket(state, productName) {
        const productInBasketIndex = state.basket.findIndex(el => el.name === productName)
        if (productInBasketIndex === -1 || state.basket[productInBasketIndex].piece === 0) return
        state.basket = state.basket.map((el, index) => {
            if (index === productInBasketIndex) {
                return {
                    ...el,
                    piece: el.piece - 1
                }
            } else return el
        })
    },
    resetBasket(state) {
        state.basket = []
    }
}

export const actions = {
    fetchProducts({ commit }) {
        const contentful = require('contentful')

        const client = contentful.createClient({
            space: 'pi7eophtp1az',
            accessToken: 'wy8xSGbivS16zUoBGzVO3psOZho8SwgdL5hQ9Uts4OQ',
            host: 'preview.contentful.com'
        })

        return client.getEntries({
            order: 'sys.createdAt'
        })
            .then((response) => {
                const products = response.items.map(el => el.fields)
                commit('setProducts', products)
            })
            .catch(console.error)
    },
    async makeOrder({ state, commit }, { name, address, phone }) {
        let totalPrice = 0

        name = lowerCase(name)
        address = lowerCase(address)
        phone = lowerCase(phone)

        await axios.post('https://hurma-api.herokuapp.com/siparis', {
            message: '----------'
        })

        await axios.post('https://hurma-api.herokuapp.com/siparis', {
            message: name
        })

        await axios.post('https://hurma-api.herokuapp.com/siparis', {
            message: phone
        })

        await axios.post('https://hurma-api.herokuapp.com/siparis', {
            message: address
        })

        Promise.all(
            state.basket.map(async el => {
                const price = el.discount || el.price
                let text = el.piece + ' adet: ' + el.name + '(' + price + 'TL)'
                totalPrice += el.piece * price
                text = lowerCase(text)

                await axios.post('https://hurma-api.herokuapp.com/siparis', {
                    message: text
                })

            })
        ).then(async () => {
            const totalPriceText = 'Toplam: ' + totalPrice + 'TL'
            axios.post('https://hurma-api.herokuapp.com/siparis', {
                message: totalPriceText
            })
            commit('resetBasket')
        })

    }
}

export const getters = {
    basketTotal(state) {
        return state.basket
            .reduce((total, el) => {
                const price = el.discount || el.price
                return total + (price * el.piece)
            }, 0)
    }
}