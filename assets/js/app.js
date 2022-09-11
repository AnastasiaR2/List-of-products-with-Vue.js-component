
  import { createApp } from "../../node_modules/vue/dist/vue.esm-browser.prod.js";

  import { OneProduct } from "./components/OneProduct.js";

  const productsURL = 'https://fakestoreapi.com/products';

  const appConfig = {
    data(){
      return {
        products: [],
        sort: null,
        search: ''
      }
    },

    methods: {
      updateQt(product, qt){
        product.qt = qt;
      }
    },

    computed: {
      totalQt(){
        return this.products.reduce((acc, item) => acc + item.qt, 0);
      },
      totalCost(){
        return this.products.reduce((acc, item) => acc + item.price * item.qt, 0);
      },
      showProducts(){

          let s = this.search.trim().toLowerCase();

          let list = this.products.filter(item => {
              
              let range = [item.title, item.description, item.price];

              for (let elem of range){
                elem = elem.toString().toLowerCase().includes(s);
                if(elem){
                  return true;
                }
              }
          });

          if(this.sort == "up"){
              list.sort((a, b) => a.price - b.price);
          }

          if(this.sort == "down"){
              list.sort((a, b) => b.price - a.price);
          }

          return list;
      }
    },

    async mounted(){
      let data = await fetch(productsURL);
          data = await data.json();

          data = data.map(item => ({
                ...item,
                qt: 0
          }))
      
      this.products = data;

      console.log(data);
    },

    components: {
      OneProduct
    }

  }

  const app = createApp(appConfig);

  app.mount('#app');