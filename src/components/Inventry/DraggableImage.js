import React, { useMemo, useState } from "react";
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
  const [error, setError] = useState(false);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: ["image/jpeg", "image/png"],
    maxFiles: 1,
    maxSize: 1000000,
    minSize: 20000,
    onDropAccepted: (files) => handleImages(files),
    onDropRejected: () => setError(true)
  });
  const reducedTitle = (str) => {
    let words = str.split(" ");
    let decStr = words.length <= 3 ? str : words.slice(0, 3).join(" ");
    return encodeURIComponent(decStr);
  };

  const handleImages = (files) => {
    setError(false);
    let imageName = files[0].name;
    let imageFileExtension = imageName.slice(
      imageName.lastIndexOf("."),
      imageName.length
    );
    let newImageName = reducedTitle(props.imageTitle) + imageFileExtension;
    let imageFile = new File([files[0]], newImageName, {
      type: files[0].type,
    });
    props.imageHandler(imageFile);
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
      {error && (
        <Alert className="mt-2" variant="danger">
          Image not accepted. Please provide image according to instructions
        </Alert>
      )}
    </div>
  );
}

export default DraggableImage;
