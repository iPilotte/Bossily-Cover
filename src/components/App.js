import React, { Component } from 'react';

//Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';

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
        context.fillText(textValue,this.state.xOffset,140);
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

  constructor(){
    super();
    this.state = {
      size: 100,
      xOffset: 30,
      color : '#000',
      image : 'Pattern_1.jpg'
    };
  }
  render() {

    const canvasStyle = {
      width:'100%',
      height:'100%'
    };

    return (
      <MuiThemeProvider>
        <div className="App">
          <Grid>
            <Row center="xs">
              <Col>
                <canvas id="canvas" width={851} height={315} style={canvasStyle}></canvas>
              </Col>
            </Row>
            <Row center="xs">
              <Col xs={8}>
              <TextField
                id="text"
                floatingLabelText="Quote"
                defaultValue="Bossily Cover"
              /><br/>
              <Slider
                id="size"
                min={0}
                max={100}
                step={1}
                value={this.state.size}
                onChange={this.handleSizeSlider}
              />
              <Slider
                id="xOffset"
                min={0}
                max={800}
                step={1}
                value={this.state.xOffset}
                onChange={this.handlexOffsetSlider}
              /><br/>
              <RaisedButton label="Secondary" secondary={true} />
              </Col>
            </Row>
          </Grid>          
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
