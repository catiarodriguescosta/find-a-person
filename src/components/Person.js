import React from 'react';
import styled from 'styled-components';

const PersonWrapper = styled.article`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid var(--colour-primary);
    margin-bottom: 15px;
    @media (min-width: 768px){
        width: calc(50% - 20px);
    }
`
const PersonImage = styled.div`
    height: 254px;
    background: ${props => (props.imgSrc ? "url("+ props.imgSrc+") center center / cover" : null)};
    width: 100%;
`
const PersonBody = styled.div`
    padding: 20px 0; 
`
const PersonDetailTitle= styled.span`
    color: var(--colour-tertiary);
`

function Person(props) {
  return (
    <PersonWrapper>
        <PersonImage imgSrc= {props.picture} />
        <PersonBody>
            <h2>{props.name}</h2>
            <p><PersonDetailTitle>Age: </PersonDetailTitle>{props.age}</p>
            <p><PersonDetailTitle>Gender: </PersonDetailTitle>{props.gender}</p>
            <p><PersonDetailTitle>Email: </PersonDetailTitle>{props.email}</p>
        </PersonBody>
    </PersonWrapper>
  );
}

export default Person;