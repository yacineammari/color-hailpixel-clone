import React,{ useReducer } from 'react';
import ReactDom from 'react-dom';
import Copy from './img/Copy.svg';

function Popup(props) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }
    
    function rgbToHex(r, g, b) {
        const hex = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        return hex;
    }


    function reducer(prev, action){
        const val = parseInt(action.payload);
        switch (action.type) {
            case 'CHANGERED':
            return {...prev,red:val, green: prev.green, blue: prev.blue, hex: rgbToHex(val,prev.green,prev.blue)}
            case 'CHANGEBLUE':
                return {...prev,red:prev.red, green: prev.green, blue: val, hex: rgbToHex(prev.red,prev.green,val)}
            case 'CHANGEGREEN':
                return {...prev,red:prev.red, green: val, blue: prev.blue, hex: rgbToHex(prev.red,val,prev.blue)}
            default:
                return prev;
        }
      };

    const hex = props.color.replace('#', '');
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);

    const [state,dispatch] = useReducer(reducer,{red:c_r,green:c_g,blue:c_b,hex:props.color});

    if (props.isOpen === false) return null;
    return ReactDom.createPortal (
    <>
        <div onClick={props.onClose} className='overlay-styles' />
        <div className='modal-styles'>
            <div className='color-display' style={{backgroundColor:state.hex}}></div>
            <div className='color-update-tools'>
                <div className='color-code-section'>
                    <span>Hex: {state.hex} <img className='icon' src={Copy} onClick={() => {navigator.clipboard.writeText(state.hex)}}></img> </span>
                    <span>RGB: {`rgb(${state.red},${state.green},${state.blue})`} <img className='icon' src={Copy} onClick={() => {navigator.clipboard.writeText(`rgb(${state.red},${state.green},${state.blue})`)}}></img> </span>
                </div>

                <div className='color-slider-section'>

                <div className='slider-container' style={{'--color':'#f03e3e'}}>
                    <input type='range' id='red-slider' min='0' max='255' value={state.red}
                        style={{background:`linear-gradient(to right, var(--color) ${(state.red / 255)*100}%, #d5d5d5 ${(state.red / 255)*100}%)`}} 
                        onInput={(e)=>{
                            dispatch({type:'CHANGERED',payload:e.target.value});
                    }}/>
                    <div className='slider-value'>{state.red}</div>
                </div> 

                <div className='slider-container' style={{'--color':'#6cfe32'}}>
                    <input type='range' id='green-slider' min='0' max='255' value={state.green}
                        style={{background:`linear-gradient(to right, var(--color) ${(state.green / 255)*100}%, #d5d5d5 ${(state.green / 255)*100}%)`}} 
                        onInput={(e)=>{
                            dispatch({type:'CHANGEGREEN',payload:e.target.value});
                    }}/>
                    <div className='slider-value'>{state.green}</div>
                </div> 
                
                <div className='slider-container' style={{'--color':'#3264fe'}}>
                    <input type='range' id='blue-slider' min='0' max='255' value={state.blue}
                        style={{background:`linear-gradient(to right, var(--color) ${(state.blue / 255)*100}%, #d5d5d5 ${(state.blue / 255)*100}%)`}} 
                        onInput={(e)=>{
                            dispatch({type:'CHANGEBLUE',payload:e.target.value});
                    }}/>
                    <div className='slider-value'>{state.blue}</div>
                </div> 

                </div>

                <div className='buttons'>
                    <a onClick={()=>{props.onUpdate(state.hex,props.index);props.onClose();}}>Save Update</a>
                    <a onClick={props.onClose}>Cancel Update</a>
                </div>
            </div>
        </div>
    </> ,
        document.getElementById('portal')  
      );
}

export default Popup;