import React from "react";
import {isBrowser} from "react-device-detect";
import styled, {keyframes} from "styled-components";
import {fadeInDownBig} from "react-animations";

import { 
  Link
} from "react-router-dom";

// Components
import LongShadow from "../components/longShadow";

import BackgroundVideo from "../assets/Retro_Stripes_Monitor_Overlay.mp4"
import "../styles/home.scss";

const FadeIn = styled.div`animation: 2s ${keyframes`${fadeInDownBig}`}`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subTitle: "",
      cursor: "",
      xMouse: -50,
      yMouse: -50,
      xMiddle: 0,
      yMiddle: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.string = "<software-developer/>";
    this.i = 0
    this.howManyTimes = 21;
  }
  
  typeSubTitle() {
    this.setState({
      subTitle: this.state.subTitle + this.string.split("")[this.i] 
    })
    this.i++;
    if( this.i < this.howManyTimes ){
      setTimeout(() => {
        this.typeSubTitle();
      }, 100);

    }
  }

  subTitleCursor() {
    if (this.state.cursor === "") {
      this.setState({
        cursor: "|",
      });
    } else {
      this.setState({
        cursor: "",
      });
    }
    setTimeout(() => {
      this.subTitleCursor();
    }, 530);
  }

  updateWindowDimensions() {
    this.setState({
      xMiddle: window.innerWidth / 2,
      yMiddle: window.innerHeight / 2
    });
  }

  // For mouse move/touch events
  handleMouseMove(e) {
    let xPosition = e.clientX;
    let yPosition = e.clientY;

    if (e.type === "touchmove") {
      xPosition = e.touches[0].pageX;
      yPosition = e.touches[0].pageY;
    }

    this.setState({
      xMouse: xPosition,
      yMouse: yPosition
    });
  }

  componentDidMount() {
    document.title = "Josh Pollard | Home";
    
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    setTimeout(() => {
      this.subTitleCursor();
    }, 2000);

    setTimeout(() => {
      this.typeSubTitle();
    }, 4000);
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    let xVector = this.state.xMiddle - this.state.xMouse;
    let yVector = this.state.yMiddle - this.state.yMouse;
    let styles

    if (isBrowser) {
      styles = {
        top: yVector / 50,
        left: xVector / 50
      }
    }
    else {
      styles = {}
    }

    return (
      <div 
        className="home-body"
        onMouseMove={e => this.handleMouseMove(e)}
        onTouchMove={e => this.handleMouseMove(e)}
        >
        <video autoPlay muted loop className="background-video">
          <source src={BackgroundVideo} type="video/mp4"/>
        </video>

        <FadeIn><div
          id="title-container"
          style={styles}
        >
          <Link to="/sdfg">
            <LongShadow
              id={"headline-title"}
              textOne={"JOSH"}
              textTwo={"POLLARD"}
              xVector={xVector}
              yVector={yVector}
          />
          </Link>
          <div className="sub-title">{this.state.subTitle}{this.state.cursor}</div>
        </div></FadeIn>
      </div>
    );
  }
}

export default Home;
