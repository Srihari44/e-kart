import React, { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { storage } from "../providers/firebaseConfig";
import DraggableImage from "./DraggableImage";

const ReactFirebaseFileUpload = (props) => {
  const [image, setImage] = useState(null);
  const [showProgress, showProcessHandler] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    showProcessHandler(true);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        showProcessHandler(false);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            props.urlHandler(url);
            showProcessHandler(false);
          });
      }
    );
  };

  const handleRemove = () => {
    setImage(null);
    showProcessHandler(false);
    props.oldImageUrl
      ? props.urlHandler(props.oldImageUrl)
      : props.urlHandler("");
  };

  return (
    <div>
      <DraggableImage imageHandler={(image) => setImage(image)} />
      {image ? (
        <React.Fragment>
          <span>{image.name}</span>
          <Button onClick={handleUpload}>Upload</Button>
          <Button onClick={handleRemove}>Remove</Button>
        </React.Fragment>
      ) : null}
      {showProgress && <ProgressBar animated now={progress} />}
    </div>
  );
};

export default ReactFirebaseFileUpload;
