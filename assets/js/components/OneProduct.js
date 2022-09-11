
  const OneProduct = {
    data(){
      return {
        counter: this.$props.qt
      }
    },
    created(){
      this.counter = this.$props.productData.qt;
    },

    props: ["product-data"],

    methods: {
      changeCounterInc(){
        this.counter++;
        this.$emit('update-qt', this.productData, this.counter);
      },
      changeCounterDec(){
        if(this.counter == 0){
          return;
        }
        this.counter--;
        this.$emit('update-qt', this.productData, this.counter);
      },
      changeCounter(){
        this.$emit('update-qt', this.productData, this.counter);
      }
    },
    
    template: `
      <div class="card shadow">
        <div class="mt-4 align-self-center">
          <img :src="productData.image" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title">{{productData.title}}</h5>
          <p class="card-text">{{productData.description}}</p>
        </div>
        <p class="text-end fs-5 fw-bold">$ {{productData.price}}</p>

        <div class="d-flex gap-1 mb-4 align-self-center">
          <button @click="changeCounterDec">-1</button>
          <input @input="changeCounter" v-model="counter" type="number" min="0">
          <button @click="changeCounterInc">+1</button>
        </div>
    `
  }

  export {OneProduct};