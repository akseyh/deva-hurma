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
    makeOrder({ state }, { name }) {
        let text = ''
        let totalPrice = 0
        state.basket.map(el => {
            const price = el.discount || el.price
            text += '\n' + el.piece + ' adet: ' + el.name + '(' + price + 'TL)'
            totalPrice += el.piece * price
        })
        text += '\nToplam: ' + totalPrice + 'TL'
        text = name + '\n' + text
        text = text.replace('Ğ', 'g')
            .replace('Ü', 'u')
            .replace('Ş', 's')
            .replace('I', 'i')
            .replace('İ', 'i')
            .replace('Ö', 'o')
            .replace('Ç', 'c')
            .replace('ğ', 'g')
            .replace('ü', 'u')
            .replace('ş', 's')
            .replace('ı', 'i')
            .replace('ö', 'o')
            .replace('ç', 'c');
        axios.post('http://localhost:8080/siparis', {
            message: text
        }).then(res => {
            // console.log(res)
        }).catch(err => {
            // console.log(err)
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