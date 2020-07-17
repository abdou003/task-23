import React, { useState } from "react";
import axios from "axios";
import FileInputComponent from "react-file-input-previews-base64";
import "./App.css";

function App() {
  const getBaseFile = (images) => {
    let listImages = [];
    for (let i = 0; i < images.length; i++) {
      let imageObj = {
        imageName: images[i].name,
        imageData: images[i].base64,
      };
      listImages.push(imageObj);
    }
    axios
      .post(`http://localhost:3001/image/uploadbase`, listImages)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using base64 format");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        alert("Error while uploading image using base64 format");
        window.location.reload(false);
      });
  };

  return (
    <div className="main-container">
      <h3 className="main-heading">Image Upload App</h3>

      <div className="image-container">
        <div className="process">
          <h4 className="process__heading">Process: Using Base64</h4>
          <p className="process__details">
            Upload image as Base64 directly to nodeJs server 1
          </p>
          <div className="process__upload-btn">
            <FileInputComponent
              labelText="Select image"
              labelStyle={{ fontSize: 14 }}
              multiple={true}
              callbackFunction={getBaseFile.bind(this)}
              accept="image/*"
            />
          </div>
        </div>
      </div>

      <p className="main-credit">Created by abdou</p>
    </div>
  );
}

export default App;
