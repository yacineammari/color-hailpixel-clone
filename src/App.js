import MyCanvas from "./MyCanvas";
import ColorCard from "./ColorCard";
import React, { Component, createRef } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.boxReff = createRef();
    this.state = { 
      width: window.innerWidth, 
      height: window.innerHeight,
      lockedColorList: [] };
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  setLock(color) {
    this.setState((prev)=> {
    return {...prev, lockedColorList: [...prev.lockedColorList,color]}
  });
  }

  onDelete(color) {
    const index = this.state.lockedColorList.indexOf(color);
    if (index > -1) {
      this.setState((prev)=> {
        return {...prev, lockedColorList: [...this.state.lockedColorList.filter(e => e !== color)]}
      });
    }
  }

  onUpdate(color,index) {
    this.setState((prev) => {
      const copy = [...this.state.lockedColorList];
      copy[index] = color
      return {...prev, lockedColorList: [...copy]}
    });
  }
  
  render() {
    const style = { 
      width : this.state.width,
      height : this.state.lockedColorList.length !== 0 ? this.state.height-75 : this.state.height
    }
    return (
      <>
      <MyCanvas style={style} lock={(color)=>this.setLock(color)} />
      {
        this.state.lockedColorList.length!==0 ? 
        (<div id='colors-list-container'>
        {
          this.state.lockedColorList.map((elem,index) => {
            return <ColorCard key={index} index={index} color={elem} onDelete={(color)=>{this.onDelete(color)}} onUpdate={(color,index)=>{this.onUpdate(color,index)}}/>
          })
        }
        </div>) : null
      }
      </>
    );
  }

}