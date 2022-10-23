import React,{useState} from 'react';
import Close from './img/Close.svg';
import Settings from './img/Settings.svg';
import Copy from './img/Copy.svg';
import Popup from './Popup';

function ColorCard(props) {
  const [isOpen, setIsOpen] = useState(false);
    const handleonClose = (e) => {
      setIsOpen((prev) => {
        return !prev;
      });
    }
  function use_dark (color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    return ((c_r*0.299) + (c_g*0.587) + (c_b*0.114) ) > 186;
  }
 const prim = use_dark(props.color)? '#000000' : '#FFFFFF';
 const contrast = {filter:`invert(${use_dark(props.color)? '0' : '1'})`}
 
  return (
    <>
    {isOpen ? <Popup color={props.color} isOpen={isOpen} onClose={handleonClose} index={props.index} onUpdate={props.onUpdate}  /> : null }
    <div className='color' style={{backgroundColor:props.color}}>
      <div className='tools'>
      <h4 style={{color:prim}}>{props.color}<img className='icon' style={{...contrast,paddingLeft:'8px'}} src={Copy} onClick={() => {navigator.clipboard.writeText(props.color)}}></img></h4>
        <img className='icon' style={contrast} src={Close} onClick={()=>{props.onDelete(props.color)}}></img>
        <img className='icon' style={contrast} src={Settings} onClick={handleonClose}></img>
      </div>
    </div>
    </>
  )
}

export default ColorCard