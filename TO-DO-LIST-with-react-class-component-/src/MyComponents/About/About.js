import React, { Component } from "react";

export class About extends Component {
  myStyle = {
    minHeight: "80.5vh",
  };
  render() {
    return (
      <div style={this.myStyle}>
        This is An about component
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio asperiores nulla non distinctio unde architecto, voluptatum eius maxime deserunt id perspiciatis voluptate dolore nisi commodi neque tempora facilis quibusdam consectetur.</p>
      </div>
    );
  }
}

export default About;
