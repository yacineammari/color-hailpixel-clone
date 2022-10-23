import React, { Component,createRef } from 'react'

export default class MyCanvas extends Component {
    constructor(props) {
        super(props);
        this.canvasReff = createRef();
        this.handelOnMove = this.handelOnMove.bind(this);
        this.handelOnclick = this.handelOnclick.bind(this);
        this.state = {color:'#FFFFFF'}

    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    handelOnclick(e) {
        const context = this.canvasReff.current.getContext('2d', { willReadFrequently: true });
        let imageData = context.getImageData(parseInt(e.clientX),parseInt(e.clientY), 1, 1);
        const color = this.rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]).toUpperCase();
        this.setState({color:color});
        this.props.lock(color);
    }
    
    handelOnMove(e) {
        if (e.type == 'touchmove') {
            const context = this.canvasReff.current.getContext('2d', { willReadFrequently: true });
            let imageData = context.getImageData(parseInt(e.touches[0].clientX),parseInt(e.touches[0].clientY), 1, 1);
            const color = this.rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]).toUpperCase();
            this.setState({color:color});
        } else {
            const context = this.canvasReff.current.getContext('2d', { willReadFrequently: true });
            let imageData = context.getImageData(parseInt(e.clientX),parseInt(e.clientY), 1, 1);
            const color = this.rgbToHex(imageData.data[0], imageData.data[1], imageData.data[2]).toUpperCase();
            this.setState({color:color});
        }
    }

    draw() {
        this.canvasReff.current.width = this.props.style.width;
        this.canvasReff.current.height = this.props.style.height;
        
        const width = this.props.style.width;
        const height = this.props.style.height;
            
        const context = this.canvasReff.current.getContext('2d', { willReadFrequently: true });
        //Create a Gradient Color (colors change on the width)
        let gradient = context.createLinearGradient(0, 0, width, 0);
        //Add color picker colors (red, green, blue, yellow...)
        //Add Color Stops to the Gradient (from 0 to 1)
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");
        
        //Render the Color Gradient from the 0's position to the full width and height
        context.fillStyle = gradient; ///, set it's style to be the color gradient
        context.fillRect(0, 0, width, height); ///< render it
    
        //Apply black and white (on the height dimension instead of the width)
        gradient = context.createLinearGradient(0, 0, 0, height);
        //We have two colors so 0, 0.5 and 1 needs to be used.
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    
        //set style and render it.
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    render() {
        const style = { 
            width : this.props.style.width,
            height : this.props.style.height
          }
        return (
        <div id='color-picker-container' style={style}> 
          <div id='output-container' style={{backgroundColor: this.state.color}}></div>
            <div className='box'>
                <h2 id='color_code'>{this.state.color}</h2>
                <h6>Click to Lock</h6>
            </div>
          <canvas style={style} ref={this.canvasReff} id="canvas" onClick={this.handelOnclick} onMouseMove={this.handelOnMove} onTouchMove={this.handelOnMove}></canvas>
        </div>
        );
    }
}
