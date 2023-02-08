import React from 'react'

import { TextField, InputLabel } from '@material-ui/core'
import CustomButton from '/components/CustomButtons/Button.js'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import { useForm } from 'react-hook-form'

const addTeamNumberField = [
  {
    label: 'HOW MANY TEAM WILL BE IN THE TOURNAMENT',
    placeHolder: 'NUMBER OF TEAM',
    type: 'number',
    name: 'teamRemaining',
    defaultValue: '',
    isRequired: true,
  },
]

const AddTeamNumber = ({
  handleClose,
  setViewTeamAddTable,
  handleAddRoadMapOpen,
  setTeamRemaining,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  //useForm and on Submit functions

  const onSubmit = async (data) => {
    setTeamRemaining(data.teamRemaining)
    setViewTeamAddTable(false)
    handleClose()
    handleAddRoadMapOpen()
  }

  return (
    <>
      <form
        style={{
          marginTop: '20px',
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
                    marginBottom: '10px',
                  }}
                >
                  {textField.label}
                </InputLabel>

                <TextField
                  style={{
                    marginBottom: '20px',
                    marginRight: '10px',
                    width: '100%',
                  }}
                  variant={'outlined'}
                  type={textField.type}
                  placeholder={textField.placeHolder}
                  id={textField.name}
                  name={textField.name}
                  defaultValue={textField.defaultValue}
                  inputProps={{
                    style: { textTransform: 'uppercase' },
                  }}
                  {...register(textField.name, {
                    required: textField.isRequired,
                  })}
                ></TextField>
              </GridItem>
            )
          })}
        </GridContainer>
        <CustomButton style={{ marginTop: '50px' }} type="submit" color="info">
          START MAKING ROADMAP
        </CustomButton>
      </form>
    </>
  )
}
export default AddTeamNumber
