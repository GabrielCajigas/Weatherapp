import React from 'react';
import Titles from './components/titles';
import Weather from './components/weather';
import Form from './components/form';


const API_KEY = "619aed08f7e5ff170349d1b5f5701d8c";

class App extends React.Component {
  state = {
      temperature : undefined,
      city: undefined,
      country : undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}
    `);
    const data = await api_call.json();
   if (city && country){
    this.setState({
      temperature :1.8 * (data.main.temp - 273) + 32 ,
      city :data.name,
      country:data.sys.country,
      humidity:data.main.humidity,
      description:data.weather[0].description,
      error : ""
    });
   }
    else {
      this.setState({
        temperature : undefined,
        city: undefined,
        country : undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value"
      })
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
         
            <div className="container-fluid">
            
              <div className="row">
              <div className="  col-sm-12 title-container">
                  <Titles />
                </div>
                <div className="col-sm-12 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
