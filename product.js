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
        tempProduct:{},
      }
    },
    methods: {
      checkAdmin() {
        axios.post(`${this.api.url}/api/user/check`)
          .then(() => {
              this.getData();
          })
          .catch((err) => {
            alert(err.data.message)
            window.location = 'login.html';
          })
      },
      getData() {
        axios.get(`${this.api.url}/api/${this.api.path}/admin/products`)
          .then((response) => {
              this.products = response.data.products;
          })
          .catch((err) => {
            alert(err.data.message);
          })
      },
      showModal(target,product={}){
        this.tempId = product.id;
        this.tempProduct= product;
        this.modal = new bootstrap.Modal(this.$refs[target]);
        this.modal.show()
      },

      // 刪除產品
      deleteProduct(){
        axios.delete(`${this.api.url}/api/${this.api.path}/admin/product/${this.tempId}`)
        .then(() => {
            this.tempId='';
            this.modal.hide();
            this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
        })
      },

      // 修改/新增產品
      addProduct(){
          const data = {
              data:{...this.tempProduct}
          }
          if(this.tempId){ // 新增產品
            axios.put(`${this.api.url}/api/${this.api.path}/admin/product/${this.tempId}`,data)
            .then(() => {
                this.tempId = '';
                this.tempProduct = {};
                this.modal.hide();
                this.getData();
            })
            .catch((err) => {
              alert(err.data.message);
            })
          }else{ // 編輯產品
            axios.post(`${this.api.url}/api/${this.api.path}/admin/product/`,data)
            .then(() => {
                this.tempId = '';
                this.tempProduct={};
                this.modal.hide();
                this.getData();
            })
            .catch((err) => {
              alert(err.data.message);
            })
          }
      },
      // 新增圖片
      addImages() {
        this.tempProduct.imagesUrl = [''];
      }
    },
    created() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
      this.checkAdmin()
    }
  }
createApp(app).mount('#app');