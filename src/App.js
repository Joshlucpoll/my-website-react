import React from 'react';
import './styles/App.scss';
import Logo from './img/JP-Logo-v1.png';


class LongShadow extends React.Component {
  
  static getDerivedStateFromProps(props, state) {
    if (props.angle !== state.angle) {
      return { angle: props.angle };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      text: props.text,
      angle: props.angle
    };
  }
  
  longShadowCalculator(direction, length, color) {
    let shadows = "";
    let i;
    for(i=1; i<length; i++) {
      let xLength = Math.sin(direction);
      let yLength = Math.cos(direction);
  
      shadows = (shadows + xLength*i + "px " + yLength*i + "px " + color + ", ");
    }
    shadows = shadows.slice(0,-2);
    return shadows;
  }
  
  render() {
    return (
      <div style={{textShadow: this.longShadowCalculator(this.state.angle, 1000, "#202020")}} id={this.state.id} className="long-shadow">{this.state.text}</div>
      );
    }
  }

  
  class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      xMouse: 0,
      yMouse: 0,
      xTitle: 0,
      yTitle: 0,
      angle: 45
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // For calculating window dimensions
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ xTitle: (window.innerWidth/2), yTitle: (window.innerHeight/2) });
  }

  shadowShapeCalculator() {
    const xVector = this.state.xTitle - this.state.xMouse;
    const yVector = this.state.yTitle - this.state.yMouse;
    let angle = Math.atan(yVector/xVector) - Math.PI / 2;

    if (xVector < 0 && yVector > 0) {
      angle += Math.PI
    }
    if (xVector < 0 && yVector < 0) {
      angle += Math.PI
    }

    this.setState({angle: -angle});
  }

  handleMouseMove(e) {
    let xPosition = e.clientX;
    let yPosition = e.clientY;
    
    if (e.type === 'touchmove') {
      xPosition = e.touches[0].pageX;
      yPosition = e.touches[0].pageY;
    };

    this.setState( {
      xMouse: xPosition, 
      yMouse: yPosition
    });
    this.shadowShapeCalculator()
  }

  render() {
    return (
      <div className="app" onMouseMove={this.handleMouseMove.bind(this)} onTouchMove={this.handleMouseMove.bind(this)}>
          <header className="app-header">
            {/* <i class="fas fa-ellipsis-h fa-3x menu-icon"></i>
            <img scr={Logo} alt="Logo"/> */}
          </header>
          <div className="app-body">
            <div id="title-container">
              <LongShadow id={"headline-title"} text={"Josh Pollard"} angle={this.state.angle}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
