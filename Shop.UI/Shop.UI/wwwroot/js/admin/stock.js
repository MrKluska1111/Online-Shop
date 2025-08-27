const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            loading: false,
            products: [],
            selectedProduct: null,
            newStock: {
                productId: 0,
                description: 'Size',
                qty: 10
            }
        }
    },
    mounted() {
        this.getStock();
    },
    methods: {
        getStock() {
            this.loading = true;
            axios.get('/Admin/stocks')
                .then(res => {
                    this.products = res.data;
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        updateStock() {
            this.loading = true;
            axios.put('/Admin/stocks', {
                stock: this.selectedProduct.stock.map(x => {
                    return {
                        id: x.id,
                        description: x.description,
                        qty: x.qty,
                        productId: this.selectedProduct.id
                    };
                })
            })
                .then(res => {
                    console.log('Stock zaktualizowany', res.data);
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        deleteStock(id, index) {
            this.loading = true;
            axios.delete(`/Admin/stocks/${id}`)
                .then(res => {
                    this.selectedProduct.stock.splice(index, 1);
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        addStock() {
            this.loading = true;
            axios.post('/Admin/stocks', this.newStock)
                .then(res => {
                    this.selectedProduct.stock.push(res.data);
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        selectProduct(product) {
            this.selectedProduct = product;
            this.newStock.productId = product.id;

            console.log(this.selectedProduct);
        }
    }
}).mount('#app');