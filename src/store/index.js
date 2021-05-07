import Vue from "vue";
import Vuex from "vuex";

import Axios from "axios";

Vue.use(Vuex);

const baseUrl = "http://localhost:3500";
const productsUrl = `${baseUrl}/products`;
const categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
	strict: true,
  state: {
    products: [],
		categoriesData: [],
		productsTotal: 0,
		currentPage: 1,
		pageSize: 4,
		currentCategory: "All"
  },
	getters: {
		productsFilteredByCategory: state => state.products
			.filter(
				// without sorting if currentCategoru == "All"
				p => state.currentCategory == "All"
				// else sort by category 
				|| p.category == state.currentCategory
			),

		processedProducts: (state, getters) => {
			let index = (state.currentPage -1) * state.pageSize;
      return getters.productsFilteredByCategory.slice(
				index, index + state.pageSize);
    },

		pageCount: (state, getters) =>
			Math.ceil(getters.productsFilteredByCategory.length / state.pageSize),

		categories: state => ["All", ...state.categoriesData],
	},
	mutations: {
		setCurrentPage(state, page) {
			state.currentPage = page;
		},

		setPageSize(state, size) {
			state.pageSize = size;
			state.currentPage = 1;
		},

		setData(state, data) {
			state.products = data.pdata;
			state.productsTotal = data.pdata.length;
			state.categoriesData = data.cdata.sort();
		},

		setCurrentCategory(state, category) {
			state.currentCategory = category;
			state.currentPage = 1;
		},
	},
	actions: {
		async getData(context) {
				let pdata = (await Axios.get(productsUrl)).data;
				let cdata = (await Axios.get(categoriesUrl)).data;
				context.commit("setData", {pdata,cdata});
		} 
	},
})