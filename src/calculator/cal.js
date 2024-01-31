import "./cal.css"
import { useState } from "react";

function Calculator(){

    const [current,setCurrent]= useState("");
    const [operator,setOperater]= useState("");
    const [last,setLast]= useState("");

     function handleClick(value){
       
        setCurrent(current+value);
     }

     function Op(value){
        setLast(current);
        setCurrent(" ");
        setOperater(value);
     }

     function calculate(){

      let  prev=parseFloat(last)
       let currentValue=parseFloat(current);
        let result;
       if(isNaN(prev)){
        return
       } else{
        switch (operator){
            case "+":
            result=prev+currentValue;
            break;
            case "-":
            result = prev - currentValue
            break;
            case "*":
            result = prev * currentValue
            break;
            case "/":
            result = prev / currentValue
            break;
                    
        }

            setCurrent(result);
    }

     }

    const Clear=()=>{
        setCurrent(" ")
        setLast(null)
        setOperater(null)
    }

    const Del=()=>{
      let num = current.toString().slice(0,-1);
        setCurrent(num)
    }

    return(
    <>
    <div className="container" >
    <div className="current" >{current}</div>
        <div> 

            <button onClick={Clear}>AC</button>
            <button onClick={Del}>DEL</button>
        </div>
            <div> 
            <button onClick = {()=>{handleClick("1")}}>1</button>
            <button onClick = {()=>{handleClick("2")}}>2</button>
            <button onClick = {()=>{handleClick("3")}}>3</button>
            <button onClick ={()=>{Op("+")}} >+</button>
            </div>

            <div>
            <button onClick = {()=>{handleClick("4")}}>4</button>
            <button onClick = {()=>{handleClick("5")}}>5</button>
            <button onClick = {()=>{handleClick("6")}}>6</button>
            <button onClick ={()=>{Op("-")}}>-</button>
            </div>

            <div>
            <button onClick = {()=>{handleClick("7")}}>7</button>
            <button onClick = {()=>{handleClick("8")}}>8</button>
            <button onClick = {()=>{handleClick("9")}}>9</button>
            <button onClick ={()=>{Op("*")}} >*</button>
            </div>
            
            <div>
            <button onClick = {()=>{handleClick("0")}}>0</button>
            <button onClick = {calculate}>=</button>
            <button onClick ={()=>{Op("/")}} >/</button>

            </div>


        </div>
    </>
    )
}

export default Calculator;