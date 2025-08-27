const { createApp } = Vue;

const app = createApp({
    el: '#app',
    data() {
        return {
            editing: false,
            loading: false,
            objectIndex: null,
            products: [],
            productModel: {
                id: null,
                name: "",
                description: "",
                value: 0
            }
        };
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        getProducts() {
            this.loading = true;
            axios.get('/Admin/products')
                .then(res => {
                    this.products = res.data;
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        getProduct(id) {
            this.loading = true;
            axios.get(`/Admin/products/${id}`)
                .then(res => {
                    this.productModel = { ...res.data };
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        createProduct() {
            this.loading = true;
            axios.post('/Admin/products', this.productModel)
                .then(res => {
                    this.products.push(res.data);
                    this.editing = false;
                    this.resetProductModel();
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        editProduct(id, index) {
            this.editing = true;
            this.objectIndex = index;
            this.getProduct(id);
        },
        updateProduct() {
            this.loading = true;
            axios.put('/Admin/products', this.productModel)
                .then(res => {
                    this.products.splice(this.objectIndex, 1, res.data);
                    this.editing = false;
                    this.resetProductModel();
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        deleteProduct(id, index) {
            this.loading = true;
            axios.delete(`/Admin/products/${id}`)
                .then(() => {
                    this.products.splice(index, 1);
                })
                .catch(err => console.error(err))
                .finally(() => { this.loading = false; });
        },
        newProduct() {
            this.editing = true;
            this.resetProductModel();
        },
        cancel() {
            this.editing = false;
            this.resetProductModel();
        },
        resetProductModel() {
            this.productModel = {
                id: null,
                name: "",
                description: "",
                value: 0
            };
        }
    }
});

//app.component('product-manager', ProductManager);

app.mount('#app');
