import React, {
  Component
} from 'react';
import logo from './logo.svg';
import './App.css';

var request = require('request');
var token = "5048f02cae0ff2a686c48322d1e4f364e43e3f7a";
var ourl;
var arr = ["@6237", "@6229", "@6239", "@6231", "@6240", "@6235", "@6230"];

class App extends Component {

  state = {
    temperature: undefined,
    aqistate: undefined
  }

  getAir = async (e) => {
    var location = e.target.elements.selectLocation.value;
    e.preventDefault();
    var aqi;  
    var temperatura;
    console.log(location);
    ourl = "https://api.waqi.info/feed/" + location + "/?token=" + token;
    var apiCall = await fetch(ourl);
    var apiData = await apiCall.json();
    if (apiData.data!=null) {
      aqi = apiData.data.aqi;
      temperatura = apiData.data.iaqi.t.v;
      console.log(apiData);
      console.log("AQI: " + aqi + " Temperatura: " + temperatura);
      this.setState({
        temperature: temperatura,
        aqistate: aqi
      });
    } else {
      console.log(apiData);
      console.log("Error obteniendo los datos");
    }
  }

  render() {
    return (
      <div className="wrapper">
      <div className="main">
      <div className="container">
      <div className="row">
      <div className="col-xs-5 title-container">
      <Titles />
     </div>
      <div className="col-xs-7 form-container">
      <Formu getAir = {this.getAir}
        />
       <AqiComponent temperature = {this.state.temperature}
                      aqistate = {this.state.aqistate}
       />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Titles = props =>(
  <div>
    <h1 className="title-container__title">
    Conoce el estado de la calidad el aire
    </h1>
    <h2 className="title-container__subtitle">
    Explora diferentes localidades
    </h2>
  </div>
  );


class Formu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '@6239'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }


  render() {
    return (
      <form onSubmit = {this.props.getAir}>
      <select name = "selectLocation" value = {this.state.value} onChange = {this.handleChange} >
      <option value = "@6239" > Suba < /option>
      <option value = "@6237" > Usaquén < /option>
      <option value = "@6229" > Guaymaral < /option>
      <option value = "@6231" > Las Ferias < /option>
      <option value = "@6240" > Puente Aranda < /option>
      <option value = "@6235" > Tunal < /option>
      <option value = "@6230" > Kennedy < /option> </select>
      <input type = "text"name = "aqinput"placeholder = "AQI" / >
      <button > Ver status < /button> </form>
    );
  }

}

const AqiComponent = props => (
    <div className="weather__info">
    {props.temperature && <p className="weather__key"> Temperatura promedio: <span className="weather__value"> {props.temperature} </span> </p>}
    {props.aqistate && <p className="weather__key"> Indice de calidad del aire AQI: <span className="weather__value"> { props.aqistate } </span> </p>}
    </div>

      );


      export default App;
