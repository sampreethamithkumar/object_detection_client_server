import React, { Component } from 'react';
import InputFile from './InputFile';

export default class Design extends Component {
    render() {
        return (
            <div>
                <h1>Object Detection in Image</h1>
                <h2>Please upload an image</h2>
                <div className="text-center">
                    <InputFile />
                </div>
            </div>
        );
    }
}