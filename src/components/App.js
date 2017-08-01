import React, { Component } from 'react';

//Material-UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton'; 
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

//FlexBox
import { Grid, Row, Col } from 'react-flexbox-grid';

import '../assets/css/App.css';


class App extends Component {  

    componentDidMount(){
      this.updateCanvas();
      var quoteText = document.getElementById('quotetext')
      ,   saidBy = document.getElementById('saidby');

      quoteText.onkeyup = (() => this.updateCanvas());
      quoteText.onchange = (() => this.updateCanvas());
      saidBy.onkeyup = (() => this.updateCanvas());
      saidBy.onchange = (() => this.updateCanvas());
    }

    updateCanvas(){
      var canvas = document.getElementById('canvas')
      ,   context = canvas.getContext('2d')
      ,   quoteText = document.getElementById('quotetext')
      ,   saidBy = document.getElementById('saidby');

      var image = new Image();

      //Not Work When State Change => Need to be Component if want to delete Below line
      let imageURL = this.state.image;
      image.src = require('../assets/templates/'+imageURL+'');

      image.onload = (() => {
        //This line can be delete if this is saperate component => for CANVAS RENDER
        image.src = require('../assets/templates/'+this.state.image+'');
        context.drawImage(image, 0, 0);


        //Quote
        context.font = this.state.size + 'px Roboto';
        context.fillStyle = this.state.color;

        let quote;
        quoteText.value ? (quote = '“' + quoteText.value + '”') : (quote = '');
        context.fillText(quote,this.state.xOffset,this.state.yOffset);


        //Said
        context.font = this.state.size/2.5 + 'px TH Sarabun New';
        context.fillStyle = this.state.color;

        let said;
        saidBy.value ? (said = '' + saidBy.value + '') : (said = '');
        const saidxOffset = (context.measureText(quote).width*3.3)-(context.measureText(said).width);
        const saidyOffset = this.state.size/3.5;
        context.fillText(said,this.state.xOffset+saidxOffset,this.state.yOffset+saidyOffset);
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

    handleImageRadio = (event, value) => {
      this.setState({image: value});
      this.updateCanvas();
    };

  constructor(){
    super();
    this.state = {
      size: 75,
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
              <Row start="xs">
                <Col xs> 
                <TextField
                    id="quotetext"
                    floatingLabelText="Quote"
                    defaultValue="Bossily Cover"
                  />
                </Col>
                <Col xs/>
                <Col xs>
                <TextField
                    id="saidby"
                    floatingLabelText="By"
                    defaultValue="-ประถมพบ-"
                  />
                </Col>                  
              </Row>
              <br/>
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
            <Row start="xs">
              <Col xs={6} xsOffset={3}>
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
              </Col>
              <Col xs={2}/>
            </Row>
            <hr/><br/>
            <Row center="xs">
              <Col xs/>
              <Col xs>
                <RadioButtonGroup name="image" defaultSelected={this.state.image} onChange={this.handleImageRadio}>
                    <RadioButton
                      value="Pattern_1.jpg"
                      label={<img src={require('../assets/templates/Pattern_1.jpg')} alt='Pattern_1' width={170} height={62}/>}
                      style={styles.radioButton}
                    />
                    <RadioButton
                      value="Pattern_2.jpg"
                      label={<img src={require('../assets/templates/Pattern_2.jpg')} alt='Pattern_2' width={170} height={62}/>}
                      style={styles.radioButton}
                    />
                </RadioButtonGroup>
              </Col>
              <Col xs/>
            </Row> 
          </Grid>           
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
