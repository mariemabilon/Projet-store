
import * as types from "./constants";


export function nom_store(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.NOM_STORE,
			payload: payload
		})
	}
}






export function store_add_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_ADD_PRODUCT,
			payload: payload
		})
	}
}



export function store_confirm_edit(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_CONFIRM_EDIT,
			payload
		})
	}
}




export function store_increment_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_INCREMENT_PRODUCT_QUANITY,
			payload
		})
	}
}




export function store_decrement_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_DECREMENT_PRODUCT_QUANITY,
			payload
		})
	}
}







export function store_delete_product(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_DELETE_PRODUCT,
			payload
		})
	}
}


export function store_valid_cart() {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_VALID_CART
		})
	}
}

export function store_edit_bool_vrai(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_EDIT_VRAI,
			payload: payload
		})
	}
}

export function store_edit_bool_faux(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_EDIT_FAUX,
			payload: payload
		})
	}
}


export function store_decrement_cart_quantity(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_DECREMENT_CART_QUANTITY,
			payload
		})
	}
}

export function total_price() {
	return (dispatch, state) => {
		dispatch({
			type: types.TOTAL_PRICE,
		
		})
	}
}

export function store_add_items_cart(payload) {
	return (dispatch, state) => {
		dispatch({
			type: types.STORE_ADD_ITEMS_CART,
			payload
		})
	}
}

