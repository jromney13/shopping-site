import React from 'react';

import { useLocation } from 'react-router-dom';

export default function Receipt() {

const {state} = useLocation()

console.log(state)


  return <div>PAYMENT RECEIPT {state}</div>;
}
