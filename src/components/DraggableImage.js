import React, { useMemo } from "react";
import { Alert } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DraggableImage(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    maxSize: 1000000,
    minSize: 20000,
    onDropAccepted: (files) => handleImages(files),
  });

  const handleImages = (files) => {
    props.imageHandler(files[0]);
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div style={{ cursor: "hand" }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop an image here, or click to select Image. Minimum file
          size 20kb and Maximum file size is 1mb
        </p>
      </div>
      {isDragReject ? (
        <Alert variant="danger">
          Please provide image according to instructions
        </Alert>
      ) : null}
    </div>
  );
}

export default DraggableImage;
