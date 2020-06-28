import React from 'react';
import styled from 'styled-components';


const Field= styled.div`
    display: flex;
    flex-direction: column;
`
const Label= styled.label`
    font-family: var(--font-secondary);
    font-weight: 700;
    font-size: 18px;
    padding-bottom: 5px;
    padding-top: 20px;
`
const Input = styled.input`
    border: 1px solid var(--colour-quaternary);
    height: 40px;
    padding: 1px 10px;
    font-family: var(--font-secondary);
    font-size: 16px;
    font-weight: 400;
`
const Select = styled.select`

    border: 1px solid var(--colour-quaternary);
    height: 40px;
    padding: 1px 10px;
    font-family: var(--font-secondary);
    font-size: 16px;
    font-weight: 400;

    /* RESET */    
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    
    /* ARROW */ 
    background-image:
        linear-gradient(45deg, transparent 50%, white 50%),
        linear-gradient(135deg, white 50%, transparent 50%),
        linear-gradient(to right, var(--colour-quaternary), var(--colour-quaternary));
    background-position:
        calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px),
        100% 0;
    background-size:
        5px 5px,
        5px 5px,
        2.5em 2.5em;
    background-repeat: no-repeat;

`
const RadioItem = styled.div`
    display: inline-block;
    position: relative;
    padding: 0 6px;
    margin: 5px 0 0;
  
    input[type='radio'] {
        display: none;
    }

    label {
        padding-bottom: 10px;
        font-family: var(--font-secondary);
        font-size: 16px;
        font-weight: 400;
        text-transform: capitalize;
    }

    label:before {
        content: " ";
        display: inline-block;
        position: relative;
        top: 12px;
        margin: 0 20px 0 0;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        border: 2px solid var(--colour-quaternary);
        background-color: transparent;
    }

    input[type=radio]:checked + label:after {
        border-radius: 50%;
        width: 25px;
        height: 25px;
        position: absolute;
        top: 18px;
        left: 12px;
        content: " ";
        display: block;
        background: var(--colour-quaternary);
    }
`

function InputField(props) {
  return (
    <Field>
        <Label for={props.name}>{props.label}</Label>
        {props.type==="text" &&
            <Input type="text" id={props.name} name={props.name} onChange={props.onChange}/>
        }
        {props.type==="select" &&
            <Select id={props.name} name={props.name} onChange={props.onChange}>
                {props.options && props.options.map(option =>{
                    return <option value={option}>{option}</option>    
                })}
            </Select>
        }
        {props.type==="radio" &&
            props.options && props.options.map( (option, index) =>{
                return (
                    <RadioItem key={props.name + index} onChange={props.onChange}>
                        <input type="radio" id={props.name + index} name={props.name} value={option} />
                        <label for={props.name + index}>{option}</label>
                    </RadioItem>   
                )
            })
        }
    </Field>
  );
}

export default InputField;