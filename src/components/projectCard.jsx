import React from "react";
import { motion } from "framer-motion";
import moment from "moment";
// import clone from "clone";
import "../styles/projectCard.scss";
import GithubIcon from "../assets/social_icons/github.svg";

class projectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {},
      stylesBrightness: {},
    };
    this.image = React.createRef();
    this.link = "/projects/" + props.repo.name;
  }

  getDate() {
    const now = moment();
    let repoTime;
    
    if (this.props.sortMethod === "pushed") {
      repoTime = moment(this.props.repo.pushed_at);
    }
    else if (this.props.sortMethod === "created") {
      repoTime = moment(this.props.repo.created_at);
    }
    else {
      return("");
    }

    if (now.date() === repoTime.date() && now.month() === repoTime.month() && now.year() === repoTime.year()) {
      return("Today");
    }
    else if (now.date() - repoTime.date() === 1 && now.month() === repoTime.month() && now.year() === repoTime.year()) {
      return("Yesterday");
    }
    else if (now.diff(repoTime, "days") < 7) {
      return(repoTime.format("dddd"))
    }
    else {
      return(repoTime.format("ddd[,] Q[-]MMM[-]YY" ))
    }
  }

  mapAngle(x, in_min, in_max, out_min, out_max) {
    return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
  }

  updatePerspective(e) {
    const maxAngle = 10;

    const card = document.getElementById(this.props.repo.name + "-card")
    const x = Math.round(e.clientX - card.getBoundingClientRect().left);
    const y = Math.round(e.clientY - card.getBoundingClientRect().top);

    const rY = this.mapAngle(x, 0, Math.round(card.getBoundingClientRect().width), -maxAngle, maxAngle);
    const rX = this.mapAngle(y, 0, Math.round(card.getBoundingClientRect().height), -maxAngle, maxAngle);

    const styles = {
      transform: `rotateY(${rY}deg) rotateX(${-rX}deg)`,
    };
    const stylesBrightness = {
      filter: `brightness(${-rX/40 + 1})`,
    };

    this.setState({ styles: styles, stylesBrightness: stylesBrightness });
  }
  
  resetPerspective(e) {
    const styles = {
      transform: "rotateY(0deg) rotateX(0deg)",
    };
    const stylesBrightness = {
      filter: `brightness(1)`,
    };

    this.setState({ styles: styles, stylesBrightness: stylesBrightness });
  }

  onClick(event) {
    // const deepClone = JSON.parse(JSON.stringify(this.image));
    // const imageClone = clone(this.image);
    // console.log(imageClone);
    // this.props.onClick(this.link, this.image);
  }

  componentDidMount() {
    const card = document.getElementById(this.props.repo.name + "-card");
    const container = document.getElementById(this.props.repo.name + "-container");
    card.addEventListener("mousemove", (e) => this.updatePerspective(e));
    container.addEventListener("mouseleave", (e) => this.resetPerspective(e));
  }

  componentWillUnmount() {
    const card = document.getElementById(this.props.repo.name + "-card");
    const container = document.getElementById(this.props.repo.name + "-container");
    card.removeEventListener("mousemove", (e) => this.updatePerspective(e));
    container.removeEventListener("mouseleave", (e) => this.resetPerspective(e));
  }

  render() {
    return(
      <div className="card-container" id={this.props.repo.name + "-container"}>
        <motion.div className="card" id={this.props.repo.name + "-card"} animate={this.state.styles} transition={{ duration: 0.3, ease: "circOut" }}>
          <div className="title-container" onClick={(event) => this.onClick(event)}>
            <motion.img style={this.state.stylesBrightness} id={this.props.repo.name + "-img"} className="title-img" alt="Project" src={`https://res.cloudinary.com/dy1xy7vkf/image/upload/${this.props.repo.name}.png`} ref={this.image}/>
            <div className="card-title">{this.props.repo.name}</div>
          </div>
          <div className="bottom-bar">
            <img src={GithubIcon} alt="Github" className="github-icon" onClick={() => window.location.href = this.props.repo.html_url}/>
            <div className="date" title="Date">{this.getDate()}</div>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default projectCard;