import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const app ={
    data() {
      return {
        api:{
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'record-product',
        },
        products: [],
        tempId:'',
        tempProduct:{
            imageUrl:'',
            imagesUrl:[],
            title:'',
            category:'',
            unit:'',
            origin_price:0,
            price:0,
            description:'',
            content:'',
        },
        modal:''
      }
    },
    methods: {
      checkAdmin() {
        axios.post(`${this.api.url}/api/user/check`)
          .then((response) => {
            if (response.data.success) {
              this.getData();
            } else {
              window.location = 'login.html';
            }
          })
          .catch((err) => {
            alert(err.data.message)
            window.location = 'login.html';
          })
      },
      getData() {
        axios.get(`${this.api.url}/api/${this.api.path}/admin/products`)
          .then((response) => {
            if (response.data.success) {
              this.products = response.data.products;
            }
          })
          .catch((err) => {
            alert(err.data.message);
          })
      },
      showModal(target,product){
          if(product){
            this.tempId = product.id;
            this.tempProduct= product;
          }
        
        this.modal = new bootstrap.Modal(document.querySelector(target));
        this.modal.show()
      },
      deleteProduct(){
        axios.delete(`${this.api.url}/api/${this.api.path}/admin/product/${this.tempId}`)
        .then((response) => {
          if (response.data.success) {
            this.tempId='';
            this.modal.hide();
            this.getData();
          }
        })
        .catch((err) => {
          alert(err.data.message);
        })
      },
      addProduct(product){
          const data = {
              data:{...this.tempProduct}
          }
          if(this.tempId){
            axios.put(`${this.api.url}/api/${this.api.path}/admin/product/${this.tempId}`,data)
            .then((response) => {
              if (response.data.success) {
                this.tempId='';
                this.tempProduct={};
                this.modal.hide();
                this.getData();
              }
            })
            .catch((err) => {
              alert(err.data.message);
            })
          }else{
            axios.post(`${this.api.url}/api/${this.api.path}/admin/product/`,data)
            .then((response) => {
              if (response.data.success) {
                this.tempId='';
                this.tempProduct={};
                this.modal.hide();
                this.getData();
              }
            })
            .catch((err) => {
              alert(err.data.message);
            })
          }
        
      }
    },
    created() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      this.checkAdmin()
    }
  }
createApp(app).mount('#app');