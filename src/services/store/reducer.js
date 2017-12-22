import * as types from "./constants";

import fixtures from "./fixtures";

const initialState = {
	nom: "",
	items: fixtures,
	//	store object to
	edits: [],
	cart: [],
	finalPrice:0,
};


export default function reducer(state = initialState, action)
{
	switch (action.type) {

		case types.NOM_STORE:
			return {
				...state,
				nom: action.payload.nom
			};
			break;


		case types.STORE_ADD_PRODUCT:
			var {items} = state;

			items.push(
				{
					id: Date.now(),
					name: action.payload.name,
					image: action.payload.image,
					desc: action.payload.desc,
					price: action.payload.price,
					quantity: 0,
					available: false,
					edit:false,
				}
			);

			return {
				...state,
				items
			}
			break;

		case types.STORE_VALID_CART:
			var {cart, items} = state;

			cart = [];

			return {
				...state,
				cart,
				items
			}
			break;




		case types.STORE_DELETE_PRODUCT:
			var {items, cart} = state;

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);
			var indexCart = cart.findIndex((obj) => obj.id == action.payload.id);



			if (indexItems > -1) {
				items.splice(indexItems, 1);
			}

			if (indexCart > -1) {
				cart.splice(indexCart, 1);
			}

			return {
				...state,
				items, cart
			}
			break;

		case types.STORE_INCREMENT_PRODUCT_QUANITY:
			var {items} = state;

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);

			items[indexItems].quantity++;

			return {
				...state,
				items
			};
			break;

		case types.STORE_DECREMENT_PRODUCT_QUANITY:
			var {items} = state;

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);

			items[indexItems].quantity--;

			if (items[indexItems].quantity <= 0) {
				items[indexItems].quantity = 0;
			}

			return {
				...state,
				items
			};
			break;


		case types.STORE_EDIT_VRAI:
			var {items} = state;

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);

			items[indexItems].edit= true;

			return {
				...state,
				items
			}
			break;

			case types.STORE_EDIT_FAUX:
			var {items} = state;

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);

			items[indexItems].edit= false;

			return {
				...state,
				items
			}
			break;

		case types.STORE_CONFIRM_EDIT:
			var {items,cart} = state;

			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);
			var indexCart = cart.findIndex((obj) => obj.id == action.payload.id);
			

			items[indexItems].name = action.payload.edit.name;
			items[indexItems].image = action.payload.edit.image;
			items[indexItems].desc = action.payload.edit.desc;
			items[indexItems].price = action.payload.edit.price;
			items[indexItems].edit = false;

			if(indexCart > -1){
				cart[indexCart].name = action.payload.edit.name;
				cart[indexCart].image = action.payload.edit.image;
				cart[indexCart].desc = action.payload.edit.desc;
				cart[indexCart].price = action.payload.edit.price;
				cart[indexCart].edit = false;
			}

			return {
				...state,
				items
			};
			break;
		case types.STORE_DECREMENT_CART_QUANTITY:
			var {cart,items} = state;

			var indexCart = cart.findIndex((obj) => obj.id == action.payload.id);
			var indexItems = items.findIndex((obj) => obj.id == action.payload.id);
			cart[indexCart].quantity--;
			items[indexItems].quantity++;
			if (cart[indexCart].quantity <= 0) {
				cart.splice(indexCart, 1);
			}

			return {
				...state,
				cart
			};
			break;

		case types.TOTAL_PRICE:
			var {cart,finalPrice} = state;
			finalPrice = 0;
			for(var i = 0; i < cart.length ; i++){
				finalPrice = parseInt(cart[i].price)* cart[i].quantity + finalPrice
			}

			return {
					...state,
					finalPrice: finalPrice
				};
				break;

		case types.STORE_ADD_ITEMS_CART:
					var{cart} = state;
					var indexItems = cart.findIndex((obj) => obj.id == action.payload.id);
						if(indexItems > -1){
						cart[indexItems].quantity++;
						}else{
							cart.push(
							{
							id: action.payload.id,
							name: action.payload.name,
							price: action.payload.price,
							quantity: 1,
							})
						}

					return {
						...state,
						cart
					};
					break;
		default:
			return state;
	}

		
};




