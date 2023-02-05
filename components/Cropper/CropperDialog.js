import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import Cropper from "./Cropper";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CustomButton from "/components/CustomButtons/Button.js";

const CropperDialog = ({
  open,
  handleClose,
  setImage,
  setUpload,
  galleryImg
}) => {
  return (
    <div>
      <form action="">
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle
            style={{
              textAlign: "center",
              color: "#00cfff",
              textTransform: "uppercase",
            }}
            id="form-dialog-title"
          >
            Crop Image
          </DialogTitle>
          <DialogContent>
            <Cropper
            galleryImg={galleryImg}
              setUpload={setUpload}
              handleClose={handleClose}
              setImage={setImage}
    
            ></Cropper>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </form>
    </div>
  );
};

export default CropperDialog;
