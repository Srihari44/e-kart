import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { storage } from "../../providers/firebaseConfig";
import DraggableImage from "./DraggableImage";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const ReactFirebaseFileUpload = (props) => {
  const [image, setImage] = useState(null);
  const [showProgress, showProcessHandler] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (image) => {
    setImage(image);
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
    showProcessHandler(true);
    storage
      .ref(`images/${image.name}`)
      .delete()
      .then(() => {
        setImage(null);
        showProcessHandler(false);
        props.oldImageUrl
          ? props.urlHandler(props.oldImageUrl)
          : props.urlHandler("");
      });
  };

  return (
    <div>
      {!image && (
        <DraggableImage
          imageTitle={props.title}
          imageHandler={(image) => handleUpload(image)}
        />
      )}
      {image ? (
        <React.Fragment>
          <div
            className="d-flex align-items-center rounded d-block my-3 p-2 justify-content-between"
            style={{ border: "2px solid #eee" }}
          >
            <div className="px-2 d-flex flex-column">
              <span className="pb-2">{image.name}</span>
              <span>Size: {Math.round(image.size / 1000)} KB</span>
            </div>
            {showProgress && (
              <ProgressBar
                style={{ minWidth: "105px" }}
                animated
                now={progress}
              />
            )}
            <div>
              <IconButton onClick={handleRemove} disabled={showProgress}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default ReactFirebaseFileUpload;
