export const state = {
    products: [],
    basket: []
}

export const mutations = {
    setProducts(state, val) {
        state.products = val
    },
    addToBasket(state, product) {
        state.basket = [
            ...state.basket,
            product
        ]
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

export const getters = {}