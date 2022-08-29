import { createSlice } from "@reduxjs/toolkit";

type PizzaTypes = {
    id: number;
    imageUrl: string;
    name: string;
    types: string[];
    sizes: number[];
    price: number;
    category: string;
    rating: number;  
}

type PizzaState = {
  pizza: PizzaTypes[];
  isLoading: boolean;
  response: Response;
  filterMenu: string;
};

type Response = {
  status: number;
  message: string;
};

//popular new

const initialState: PizzaState = {
  pizza: [
    {
      id: 0,
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Products/a02280d5dd9342f7925538752be9b521_292x292.jpeg",
      name: "Четыре сезона",
      types: ['тонкое', 'традиционное'],
      sizes: [26, 40],
      price: 225,
      category: `Мясные`,
      rating: 8,
    },
    {
      id: 1,
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Products/bf3377af7cfe4962915668d14bb8d0f4_292x292.jpeg",
      name: "Пеперони",
      types: ['тонкое', 'традиционное'],
      sizes: [26, 30],
      price: 285,
      category: `Вегетарианская`,
      rating: 7,
    },
    {
      id: 2,
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Products/103d94956de3424586764b1adeca5e68_292x292.jpeg",
      name: "Песто",
      types: ['тонкое', 'традиционное'],
      sizes: [30, 40],
      price: 325,
      category: `Вегетарианская`,
      rating: 5,
    },
    {
      id: 3,
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Products/f440c85c436a4284afad6ecfc43c1fab_292x292.jpeg",
      name: "Чоризо Фреш",
      types: ['тонкое', 'традиционное'],
      sizes: [26, 30, 40],
      price: 215,
      category: `Острые`,
      rating: 9,
    },
    {
      id: 4,
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Products/b473722281944c78ae1d6532576f92fa_292x292.jpeg",
      name: "Домашняя",
      types: ['тонкое', 'традиционное'],
      sizes: [26, ],
      price: 285,
      category: `Мясные`,
      rating: 7,
    },
    {
      id: 5,
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Products/f773f5016e154a7f963377494e14d6d4_292x292.jpeg",
      name: "Додо",
      types: ['тонкое', 'традиционное'],
      sizes: [26, 30, 40],
      price: 299,
      category: `Острые`,
      rating: 8,
    },
    {
      id: 6,
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Products/aa845b6e841241fbbff1a770b3ad3103_292x292.jpeg",
      name: "Ветчина и грибы",
      types: ['тонкое', 'традиционное'],
      sizes: [26, 30, 40],
      price: 205,
      category: `Гриль`,
      rating: 5,
    },
    {
      id: 7,
      imageUrl:
        "https://cdn.dodostatic.net/static/Img/Products/57157f013c164840a24c1d49c7adb3b6_292x292.jpeg",
      name: "Маргарита",
      types: ['тонкое', 'традиционное', 'толстое'],
      sizes: [26, 30, 40],
      price: 245,
      category: `Острые`,
      rating: 6,
    },
  ],
  filterMenu: 'Все',
  isLoading: false,
  response: {
    status: 0,
    message: "",
  },
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    changeIsLoading(state) {
      state.isLoading = true;
    },
    getALlPizza(state, action: any) {
        // console.log(`state.pizza`)   
    },
    filterMenu(state, action) { 
      console.log(action)   
      state.filterMenu = action.payload.menu
    },
    pizzaSort(state, action) {
      console.log(action.payload.sort)
      // state.pizza = state.pizza.filter((item) => item.price >= item.price)
    }
  },
});

export default pizzaSlice.reducer;