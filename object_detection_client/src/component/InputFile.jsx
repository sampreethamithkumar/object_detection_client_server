import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { objectsInImage } from '../services/identifyImageService';

export default class inputFile extends Component {

    constructor() {
        super()
        this.state = {
          files: [],
          base64URL: "",
          id: "1",
          objects: undefined,
        }
      }

      imageAttached = async () => {
        try {
            // console.log(this.state.base64URL);
            // console.log(typeof(this.state.objects));
            const objects = await objectsInImage(this.state.id,this.state.base64URL);
            this.setState({objects});
            console.log(this.state.objects);
        }
        catch (ex) {
            console.log("Exception occured:", ex);
        }
      }

    getFiles(files){
        const base64Data = files[0].base64.split(',');
        // console.log(base64Data);
        this.setState({ files: files, base64URL: base64Data[1] })
        this.imageAttached();
      }

    render() {
        return (
            <div>
                <label className="custom-file-upload">
                <FileBase64
                    multiple={ true }
                    onDone={ this.getFiles.bind(this) } />
                    Attach Image
                </label>
                {this.state.base64URL !== "" && this.state.objects === undefined ? <p>Loading...</p> : null}

            <div className="center">
                { this.state.files.map((file,i) => {
                    return <img key={i} src={file.base64} />
                }) }
                <img src="" />
            </div>

            

            {this.state.objects !== undefined && this.state.objects.data.object !== null ? 
            <div className="pre-container1">
                <ul>
                {this.state.objects.data.object.map(object => 
                        <li>Detected: {object.label} | Accuracy {object.accuracy}</li>)} </ul>
            </div>  : null  
            }

            {this.state.objects !== undefined && this.state.objects.data.object === null ? <div><p>No Objects Detected, Please try another image.</p></div>: null}
            </div>
        )
    }
}
