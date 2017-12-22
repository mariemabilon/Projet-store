import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { Switch, Link, Route } from "react-router-dom";



import {
	store_add_product,
	store_confirm_edit,
	store_increment_product,
	store_decrement_product,
	store_delete_product,
	store_valid_cart,
	store_edit_bool_vrai,
	store_edit_bool_faux,
	store_decrement_cart_quantity,
	total_price,
	store_add_items_cart

} from "../services/store/actions";


function formatPrice(cents) {
  return `${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} €`;
}

class Store extends Component {

	state = {
		text:"",
		product: {
			name: "",
			image: "",
			price: "",
			desc: ""
		},
		edit: {
			name: "",
			image: "",
			price: "",
			desc: ""
		},
		
	}
	

	product_edit(theme, value) {
		var products = this.state.product;

		switch(theme){
			case 'name':
				products.name = value.target.value;
			break;

			case 'image':
				products.image = value.target.value;
			break;

			case 'price':
				products.price = value.target.value;
			break;

			case 'desc':
				products.desc = value.target.value;
			break;
		}
		
		this.setState({
			product: products
		});
	}
	edit_edit(theme, value) {
		var edit = this.state.edit;

		switch(theme){
			case 'name':
				edit.name = value.target.value;
			break;

			case 'image':
				edit.image = value.target.value;
			break;

			case 'price':
				edit.price = value.target.value;
			break;

			case 'desc':
				edit.desc = value.target.value;
			break;
		}
		
		this.setState({
			edit: edit
		});
		
	}

	change_edit(theme, value){
		var {edit} = this.state;
																							
		switch(theme){
			case 'name':
				edit.name = value;
			break;

			case 'image':
				edit.image = value;
			break;

			case 'price':
				edit.price = value;
			break;

			case 'desc':
				edit.desc = value;
			break;
		}
		
		this.setState({
			edit
		});
	}
	
	render() {


		return (
			<div
				className="content"
			>
				<div className="store">
					<div className="body"><h1>LES INDISPENSABLES</h1></div>
					{
						this.props.store.items.map((item) => {
							if(!(item.quantity==0)){
								return (
									<li className="menu-game">
										<img src={item.image} alt={item.name} />
										<h3 className="game-name">
										{
											item.name
										}
										</h3>
										<span className="price">{formatPrice(item.price)}</span>
										<span className="price">{item.quantity}</span>
										<p>{item.desc}</p>

										<button className="bouton"
											onClick={() =>{this.props.store_add_items_cart(item); this.props.store_decrement_product(item); this.props.total_price(); this.setState({})}}
									
										>
											AJOUTER
										</button>
									</li>
								)
							}
							else{
								return (
									<li className="menu-game">
										<img src={item.image} alt={item.name} />
										<h3 className="game-name">
										{
											item.name
										}
										</h3>
										<span className="price">{formatPrice(item.price)}</span>
										<span className="price">{item.quantity}</span>
										<p>{item.desc}</p>
									</li>
								)
							}

								
							
						})
					}
				</div>
				<div className="cart">
					<div><h1>PANIER</h1></div>
						<ul>
							{
								this.props.store.cart.map((item, index) => {

									return (
										<li key={index} style={{
										display: "flex",
										flex: 1,
										justifyContent: "center",
										width: "100%",
										paddingTop: 35,
										paddingLeft: 15,
										paddingRight: 15,
									}}
										>
										<div >
											{item.name}<br/>
											{item.price}<br/>
											{item.quantity}<br/>
										</div>
										<div >
											<button onClick={() => {this.props.store_decrement_cart_quantity(item);this.props.total_price(); this.setState({})}}>
												-
											</button>
										</div>
										</li>
									);
								})
							}
							<div>
							
							Total : {formatPrice(this.props.store.finalPrice)}
								<button onClick={() => {this.props.store_valid_cart();this.props.total_price(); this.setState({})}}>
												Valider
											</button>

							</div>
						</ul>

				</div>
				<div className="inventory">
					<div><h1>INVENTAIRE</h1></div>
						<div
							className="menu-game"
							style={tout_le_cadre}
						>
							<input placeholder="Nom du produit" style={tout_le_cadre} type="text" value={this.state.product.name} onChange={(e) => this.product_edit('name',e)}/><br/>
							
							<input placeholder="Prix" style={tout_le_cadre} type="text" value={this.state.product.price} onChange={(e) => this.product_edit("price",e)}/><br/>
							<input placeholder="Description" style={tout_le_cadre} type="text" value={this.state.product.desc} onChange={(e) => this.product_edit("desc",e)}/><br/>
							<input placeholder="URL de l'image" style={tout_le_cadre} type="text" value={this.state.product.image} onChange={(e) => this.product_edit("image",e)}/><br/>
						
							<button className="bouton" onClick={() => {
																function isNumber(n) {
																	return !isNaN(parseFloat(n)) && isFinite(n);
																}

																if (!isNumber(this.state.product.price)) {
																	alert("Votre prix n'est pas correcte");
																} else {
																	this.props.store_add_product(this.state.product);
																	var {product} = this.state;
																	product = {
																		name: "",
																		image: "",
																		price: "",
																		desc: ""
																	};
																	this.setState({
																		product
																	});
																}
																
															}
																}>
													Ajouter
												</button>
						</div>
						<ul>
							{
								this.props.store.items.map((item) => {

									if (!item.edit){
										return(
											<li className="menu-game" key = {item.id}>
												<img src={item.image} alt={item.name} />
													<h3 className="game-name">
														{
															item.name
														}
													</h3>
													<span className="price">{formatPrice(item.price)}</span>
													<span className="price">{item.quantity}</span>
												<p>{item.desc}</p>

											{
												
													<button className="bouton" onClick={() => {

																this.props.store_edit_bool_vrai(item);
																this.change_edit('name', item.name);
																this.change_edit('price', item.price);
																this.change_edit('desc', item.desc);
																this.change_edit('image', item.image);
																
																
															}
																}>MODIFIER</button>
												
											}
											{
												
													<div>
														<button className="bouton"
															onClick={() =>this.props.store_decrement_product(item)}
														>
															RETIRER
														</button>
														<button className="bouton"
															onClick={() =>this.props.store_increment_product(item)}
														>
															RAJOUTER
														</button>
													</div>
											
											}
											{
												
													<button className="bouton" 
														onClick={() =>this.props.store_delete_product(item)}
													>SUPPRIMER</button>
											
											}
											
											</li>

										)
									}
									else{
										return(
										
											<div key= {item.id}>
											
												<input style={tout_le_cadre} type="text" value={this.state.edit.name} onChange={(e) => this.edit_edit('name',e)}/>

								
												<input  style={tout_le_cadre} type="text" value={this.state.edit.price} onChange={(e) => this.edit_edit("price",e)}/>
												<input style={tout_le_cadre} type="text" value={this.state.edit.desc} onChange={(e) => this.edit_edit("desc",e)}/>
												<input  style={tout_le_cadre} type="text" value={this.state.edit.image} onChange={(e) => this.edit_edit("image",e)}/>
												
												<button className="bouton" onClick={() =>{
													this.props.store_edit_bool_faux(item);
												}
												}
															
														>
														ANNULER
														</button>
												<button className="bouton"onClick={() => {
																						function isNumber(n) {
																							return !isNaN(parseFloat(n)) && isFinite(n);
																						}

																						if (!isNumber(this.state.edit.price)) {
																							alert("Votre prix n'est pas correcte");
																						} else {
																							this.props.store_confirm_edit({edit: this.state.edit, id: item.id});
																							var {edit} = this.state;
																							
																								edit = {
																									name: "",
																									image: "",
																									price: "",
																									desc: ""
																								};
																	
																							this.setState({
																								edit
																							});
																						}
																						
																					}
																						}>
															CONFIRMER
														</button>
											</div>

											)

									}
								})
							}
						</ul>
					
				</div>
			</div>
		);
	}

}
const tout_le_cadre = {
		width: "100%",
		backgroundColor: "transparent"
	}

const mapStateToProps = (state) => ({
	store: state.store,
});


const mapActionsToProps = (dispatch) => ({

	store_add_product: bindActionCreators(store_add_product, dispatch),
	store_confirm_edit: bindActionCreators(store_confirm_edit, dispatch),
	store_increment_product: bindActionCreators(store_increment_product, dispatch),
	store_decrement_product: bindActionCreators(store_decrement_product, dispatch),
	store_delete_product: bindActionCreators(store_delete_product, dispatch),
	store_valid_cart: bindActionCreators(store_valid_cart, dispatch),
	store_edit_bool_vrai: bindActionCreators(store_edit_bool_vrai, dispatch),
	store_edit_bool_faux: bindActionCreators(store_edit_bool_faux, dispatch),
	store_add_items_cart: bindActionCreators(store_add_items_cart, dispatch),
	store_decrement_cart_quantity: bindActionCreators(store_decrement_cart_quantity, dispatch),
	total_price: bindActionCreators(total_price, dispatch),
	
});


export default connect(mapStateToProps, mapActionsToProps)( Store );