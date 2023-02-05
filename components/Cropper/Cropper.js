import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import CustomButton from "/components/CustomButtons/Button.js";
import { Button, Grid } from "@material-ui/core";
import getUrl from "../../Functions/getUrl";
//dialog component
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

async function dataURLtoFile(dataUrl, fileName) {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}


export default function Cropper({
  handleClose,
  setImage,
  setUpload,
  galleryImg,
}) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 50, height: 50 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [fileName, setFileName] = useState("");

  async function generateDownload(canvas, crop, fileName) {
    if (!crop || !canvas) {
      return;
    }
    const dataUrl = canvas.toDataURL();
    const newFile = await dataURLtoFile(dataUrl, fileName);
    setUpload(true);
    const cropImgFile = [newFile];
    setImage(cropImgFile);
    setUpload(false);
    handleClose();
  }
  function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }


  const onSelectFile = async(file) => {
    let data ;
    if(typeof(file)==='string'){
    const res = await fetch(file);
    const buffer = await res.arrayBuffer();
    const blob = new Blob([buffer], { type: "image/png" });
    const imgFile = blobToFile(blob,"img.png")
    data = imgFile


    }
    else{
      data= file
    }
    setFileName(data.name);
    const reader = new FileReader();
    reader.addEventListener("load", () => setUpImg(reader.result));
    reader.readAsDataURL(data);
    handleImgDialogClose();
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  //handle img dialog

  const [imgDialogOpen, setImgDialogOpen] = useState(false);
  const handleImgDialogOpen = () => {
    setImgDialogOpen(true);
  };

  const handleImgDialogClose = () => {
    setImgDialogOpen(false);
  };
  const handleImageUrlType = (url) => {
    if (typeof url === "string") {
      return url;
    } else {
      return window.URL.createObjectURL(url);
    }
  };

  return (
    <div>
      
      <Button
      style={{marginBottom:'20px'}}
        onClick={handleImgDialogOpen}
        variant="contained"
        color="primary"
        component="span"
      >
        Choose Image
      </Button>
      <GridContainer>
        {" "}
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <GridItem
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </GridItem>
        <GridItem
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={() => handleClose()} color="primary">
            Cancel
          </Button>
          <CustomButton
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={() =>
              generateDownload(
                previewCanvasRef.current,
                completedCrop,
                fileName
              )
            }
            color="info"
          >
            Save image
          </CustomButton>
        </GridItem>
      </GridContainer>
      <Dialog
        open={imgDialogOpen}
        onClose={handleImgDialogClose}
        fullScreen={true}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#00cfff",
              textTransform: "uppercase",
            }}
          >
            {"Choose Image"}
            <Button
              onClick={() => handleImgDialogClose()}
              variant="outlined"
              color="primary"
            >
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {galleryImg.map((item, i) => (
              <Grid
                onClick={() => onSelectFile(item)}
                style={{ display: "flex", flexDirection: "column" }}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <img
                  style={{ width: "100%" }}
                  src={handleImageUrlType(item)}
                  alt={item}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
