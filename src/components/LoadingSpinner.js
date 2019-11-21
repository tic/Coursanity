import React from 'react';
import {ClipLoader} from 'react-spinners/ClipLoader'
import Colors from '../constants/Colors';

export default function LoadingSpinner(props) {
    let name = props.name ? props.name : "cube-grid";
    let color = props.color ? props.color : Colors.uvaOrange;

    return (
        <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={'#ff00ff'}
        />

    );
}
