export const state = {
    products: [],
    basket: {}
}

export const mutations = {
    setProducts(state, val) {
        state.products = val
    },
    addToBasket(state, product) {
        if (!!state.basket[product.name]) {
            state.basket = {
                ...state.basket,
                [product.name]: state.basket[product.name] + 1
            }
        } else {
            state.basket = {
                ...state.basket,
                [product.name]: 1
            }
        }
        // state.basket = [
        //     ...state.basket,
        //     product
        // ]
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
    }
}

export const getters = {
    basketProducts(state) {
        const products = state.products
        const basket = state.basket
        return products.filter(el => Object.keys(basket).includes(el.name))
    },
    basketTotal(state) {
        const products = state.products
        const basket = state.basket
        return Object.keys(basket)
            .reduce((total, el) => {
                const product = products.find(product => product.name === el)
                const price = product.discount || product.price
                return total + (price * basket[el])
            }, 0)
    }
}