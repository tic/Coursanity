import React from 'react';
import Colors from '../constants/Colors';

const TYPES = ['BallTriangle', 'Bars', 'Circles', 'Grid', 'Oval', 'Puff', 'Rings',
                'ThreeDots', 'Watch', 'Triangle', 'Mutating Dots', 'CradleLoader'];


export default function LoadingSpinner(props) {
    // let name = props.name ? props.name : TYPES[Math.floor(Math.random() * TYPES.length)];
    let name = 'BarLoader';
    let color = props.color ? props.color : Colors.uvaOrange;

    // type={name}
    return (
        <View/>
    );
}
