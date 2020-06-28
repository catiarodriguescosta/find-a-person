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