import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import AppHeader from './AppHeader';

export default class WeatherScreen extends Component {
  constructor() {
    super();
    this.state = {
      weather: '',
    };
  }

  getWeather = async () => {
    var url = 'https://fcc-weather-api.glitch.me/api/current?lat=28.6139&lon=77.2090';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          weather: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
    };

  componentDidMount = () => {
    this.getWeather();
  };

  render() {
    if (this.state.weather === '') {
      return (
        <View style={styles.container}>
          <ImageBackground style={styles.Image} source={require('./bg.jpg')}>
          <AppHeader/>
          <Text style={styles.text}>Loading...</Text>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
           <ImageBackground style={styles.Image} source={require('./bg.jpg')}>
            <AppHeader/>
            <Image
              style={styles.cloudImage}
              source={require('./clouds.png')}
            />
             </ImageBackground>
            <View style={styles.textContainer}>
            <Text style={{ marginLeft: 40, fontSize: 30, fontWeight:'bold', margin: 10 }}>
              {this.state.weather.main.temp}&deg;C
            </Text>
            <Text style={{ marginLeft: 5, fontSize: 30, fontWeight:'bold', margin: 10 }}>
              humidity : {this.state.weather.main.humidity}
            </Text>
            <Text style={{ marginLeft: 60, fontSize: 30, fontWeight:'bold', margin: 10 }}>
              {this.state.weather.weather[0].description}
            </Text>
          </View>
          <View style={styles.textContainer1}>
            <Text style={styles.Text}>
            If The Temp. Is Greater Than 25°C And You Want To Go Out From The House No Need To Take Umbrella...
            </Text>
            <Text style={styles.Text}>
            If The Temp. Is Smaller Than 25°C And You Want To Go Out From The House You Have To Take Umbrella...
            </Text>
          </View>
          </View> 
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
   flex:1,
  },
  text: {
    alignSelf: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 250,
    marginLeft: 10
  },
  Text: {
    alignSelf: 'center',
    fontSize: 15.2,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 12,
  },
  subContainer : { 
    flex: 1, 
    borderWidth: 1, 
    alignItems: 'center' 
  },
  cloudImage :{ 
    width: 300, 
    height: 300,
    marginLeft: 10,
    marginTop: -40
  },
  Image: {
    width: 333, 
    height: 668
  },
  textContainer : { 
    marginTop:-380,
    borderWidth: 5,
    borderRadius: 20,
  },
   textContainer1 : { 
    marginTop: 11,
    borderWidth: 5,
    borderRadius: 20,
  },
});