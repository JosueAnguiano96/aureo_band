import React from 'react';
import styled from 'styled-components';

const Divider = () => {
    return ( 
        <Divisor/>
     );
}

const Divisor = styled.hr`
    border: 1px solid #666; 
    border-radius: 300px/10px; 
    height: 0px; 
    text-align: center; 
    width: 90%;

`;
 
export default Divider;