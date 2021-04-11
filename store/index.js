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
    async makeOrder({ state }, { name, address, phone }) {
        let totalPrice = 0

        name = name.toLowerCase()
            .replace('ğ', 'g')
            .replace('ü', 'u')
            .replace('ş', 's')
            .replace('ı', 'i')
            .replace('ö', 'o')
            .replace('ç', 'c');
        address = address.toLowerCase()
            .replace('ğ', 'g')
            .replace('ü', 'u')
            .replace('ş', 's')
            .replace('ı', 'i')
            .replace('ö', 'o')
            .replace('ç', 'c');
        phone = phone.toLowerCase()
            .replace('ğ', 'g')
            .replace('ü', 'u')
            .replace('ş', 's')
            .replace('ı', 'i')
            .replace('ö', 'o')
            .replace('ç', 'c');

        await axios.post('http://localhost:8080/siparis', {
            message: '----------'
        })

        await axios.post('http://localhost:8080/siparis', {
            message: name
        })

        await axios.post('http://localhost:8080/siparis', {
            message: phone
        })

        await axios.post('http://localhost:8080/siparis', {
            message: address
        })

        Promise.all(
            state.basket.map(async el => {
                const price = el.discount || el.price
                let text = el.piece + ' adet: ' + el.name + '(' + price + 'TL)'
                totalPrice += el.piece * price
                text = text
                    .replace('Ğ', 'G')
                    .replace('Ü', 'I')
                    .replace('Ş', 's')
                    .replace('İ', 'i')
                    .replace('Ö', 'o')
                    .replace('Ç', 'c')
                    .replace('ğ', 'g')
                    .replace('ü', 'u')
                    .replace('ş', 's')
                    .replace('ı', 'i')
                    .replace('ö', 'o')
                    .replace('ç', 'c')
                    .toLowerCase();
                await axios.post('http://localhost:8080/siparis', {
                    message: text
                })
                console.log(text)

            })
        ).then(() => {
            const totalPriceText = 'Toplam: ' + totalPrice + 'TL'
            axios.post('http://localhost:8080/siparis', {
                message: totalPriceText
            })
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