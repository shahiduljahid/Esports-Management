import React from "react";

import { TextField, InputLabel } from "@material-ui/core";
import CustomButton from "/components/CustomButtons/Button.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import { useForm } from "react-hook-form";

const EditRoadMap = ({
  roundData,
  position,
  newRoadMap,
  setNewRoadMap,
  handleClose,
}) => {
  const addTeamNumberField = [
    {
      label: "ROUND NAME",
      placeHolder: "",
      type: "text",
      name: "roundName",
      defaultValue: roundData?.roundName,
      isRequired: true,
    },
    {
      label: "MATCH PER GROUP",
      placeHolder: "NUMBER OF MATCHES",
      type: "number",
      name: "matchPerGroup",
      defaultValue: roundData?.matchPerGroup,
      isRequired: true,
    },
  ];
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //useForm and on Submit functions

  const onSubmit = async (data) => {
    roundData.roundName = data.roundName.toUpperCase();
    roundData.matchPerGroup = data.matchPerGroup;
    newRoadMap.splice(position, 1, roundData);
    setNewRoadMap(newRoadMap);
    handleClose();
  };

  return (
    <>
      <form
        style={{
          marginTop: "20px",
          padding: 5,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <GridContainer style={{ margin: 0 }}>
          {addTeamNumberField.map((textField, i) => {
            return (
              <GridItem key={i} xs={12}>
                <InputLabel
                  required={textField.isRequired}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {textField.label}
                </InputLabel>

                <TextField
                  style={{
                    marginBottom: "20px",
                    marginRight: "10px",
                    width: "100%",
                  }}
                  variant={"outlined"}
                  type={textField.type}
                  placeholder={textField.placeHolder}
                  id={textField.name}
                  name={textField.name}
                  defaultValue={textField.defaultValue}
                  inputProps={{
                    style: { textTransform: "uppercase" },
                    min: 1,
                  }}
                  {...register(textField.name, {
                    required: textField.isRequired,
                  })}
                ></TextField>
              </GridItem>
            );
          })}
        </GridContainer>
        <CustomButton style={{ marginTop: "50px" }} type="submit" color="info">
          Edit ROADMAP
        </CustomButton>
      </form>
    </>
  );
};
export default EditRoadMap;
