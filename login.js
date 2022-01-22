import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = {
    data() {
        return {
          user: {
            username: '',
            password: '',
          },
        }
      },
      methods: {
        login() {
          const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
          axios.post(api, this.user).then((response) => {
              const { token, expired } = response.data;
              document.cookie = `userToken=${token};expires=${new Date(expired)}; path=/`;
              window.location = 'product.html';
          }).catch((error) => {
            alert(error.data.message);
          });
        },
    },
}

createApp(app).mount('#app');