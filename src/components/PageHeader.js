import React from 'react';
import styled from 'styled-components';

const PageHeaderBackground = styled.section`
    background: ${props => (props.imgSrc ? "url("+ props.imgSrc+") center center / cover" : null)};
    height: 300px;
    width: 100%;
`
const PageHeaderDarkFilter = styled.div`
    background: rgba(35, 31, 32, 0.8);
    height: inherit;
    width: 100%;
    display: flex;
    align-items: center;
`
const PageHeaderTitle= styled.h1`
    text-align: center;
    max-width: 75%;
    color: var(--colour-secondary);
    margin: auto;
`

function PageHeader(props) {
  return (
    <PageHeaderBackground imgSrc= {props.bgImg} >
        <PageHeaderDarkFilter>
            <PageHeaderTitle>{props.title}</PageHeaderTitle>
        </PageHeaderDarkFilter>
    </PageHeaderBackground>
  );
}

export default PageHeader;