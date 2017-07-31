import React, { Component } from 'react';

//Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

//FlexBox
import { Grid, Row, Col } from 'react-flexbox-grid';

import '../assets/css/App.css';


class App extends Component {  

    componentDidMount(){
      this.updateCanvas();
      var text = document.getElementById('text');

      text.onkeyup = (() => this.updateCanvas());
      text.onchange = (() => this.updateCanvas());
    }

    updateCanvas(){
      // console.log('Hello');
      var canvas = document.getElementById('canvas')
      ,   context = canvas.getContext('2d')
      ,   text = document.getElementById('text');

      var image = new Image();
      let imageURL = this.state.image;
      image.src = require('../assets/templates/'+imageURL+'');
      image.onload = (() => {
        // console.log("loading");
        context.drawImage(image, 0, 0);
        context.font = this.state.size + 'px TH Sarabun New';
        context.fillStyle = this.state.color;
        let textValue;
        text.value ? (textValue = '“' + text.value + '”') : (textValue = '');
        context.fillText(textValue,this.state.xOffset,this.state.yOffset);
      })
    }


    handleSizeSlider = (event, value) => {
      this.setState({size: value});
      this.updateCanvas();
    };

    handlexOffsetSlider = (event, value) => {
      this.setState({xOffset: value});
      this.updateCanvas();
    };

    handleyOffsetSlider = (event, value) => {
      this.setState({yOffset: value});
      this.updateCanvas();
    };

    handleColorRadio = (event, value) => {
      this.setState({color: value});
      this.updateCanvas();
    };

  constructor(){
    super();
    this.state = {
      size: 100,
      xOffset: 30,
      yOffset: 140,
      color : '#000',
      image : 'Pattern_1.jpg'
    };
  }
  render() {

    const styles = {
      canvasStyle : {
        width:'100%',
        height:'100%'
      },
      block: {
        maxWidth: 10,
      },
      radioButton: {
        marginBottom: 16,
      },
    };

    return (
      <MuiThemeProvider>
        <div className="App">
          <Grid>
            <Row center="xs">
              <Col>
                <canvas id="canvas" width={851} height={315} style={styles.canvasStyle}></canvas>
              </Col>
            </Row>
            <Row center="xs">
              <Col xs={8}>
              <TextField
                id="text"
                floatingLabelText="Quote"
                defaultValue="Bossily Cover"
              /><br/>
              <br/>Size
              <Slider
                id="size"
                min={10}
                max={100}
                step={1}
                value={this.state.size}
                onChange={this.handleSizeSlider}
              />
              </Col>
            </Row>
            <Row center="xs">
              <Col xs={6}>
              X
                <Slider
                  id="xOffset"
                  min={0}
                  max={800}
                  step={1}
                  value={this.state.xOffset}
                  onChange={this.handlexOffsetSlider}
                />
              </Col>
              <Col xs={2}>
              Y
                <Row center="xs">
                  <Slider
                  id="yOffset"
                  axis="y-reverse"
                  min={0}
                  max={300}
                  step={1}
                  style={{height: 100}}
                  value={this.state.yOffset}
                  onChange={this.handleyOffsetSlider}
                />
                </Row>
              </Col>
            </Row>
            <Row center="xs">
              <RadioButtonGroup name="color" defaultSelected={this.state.color} onChange={this.handleColorRadio}>
                <RadioButton
                  value="#fff"
                  label="White"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="#000"
                  label="Black"
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
            </Row>
          </Grid>          
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
