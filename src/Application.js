import React, { Component } from 'react';
import logo from './photo/shoe.png';
import logo_fixe from './photo/Asos_logo.png';
import logo_espace from './logo.svg';
import './css/Application.css';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { Switch, Link, Route } from "react-router-dom";

import { nom_store} from "./services/store/actions";
import Countdown from 'react-countdown-now';


import Store from "./components/Store";

class App extends Component {

  state = {
    text:"",
    valide: false,
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo_espace} className="App-logo-fixe" alt="logo_espace" />
          <img src={logo_fixe} className="App-logo-fixe" alt="logo_fixe" />
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-title">{this.props.store.nom}</span>
        </header>
        <div className="body">
          {

            this.state.valide ?
              <Store/>
            :
                <div className="App-intro">
                <div>
                  <input placeholder="Nom du Shop" type="text" value={this.props.store.nom} onChange={(e) => this.props.nom_store({ nom: e.target.value })} />
                </div>
                <span className="transparent"> | </span>
                <div>
                  <button className="bouton"
                     onClick={() => this.setState(
                                                  {valide: this.state.valide = true})
                              }
                   >
                   ENTRER
                   </button>
                </div>
 
              </div>
          }
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state) => ({
  store: state.store,
});


const mapActionsToProps = (dispatch) => ({
  nom_store: bindActionCreators(nom_store, dispatch),
});


export default connect(mapStateToProps, mapActionsToProps)( App );
