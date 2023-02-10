import React, { useState } from 'react'

import { TextField, InputLabel, Checkbox } from '@material-ui/core'
import CustomButton from '/components/CustomButtons/Button.js'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import { useForm } from 'react-hook-form'

const addTeamNumberField = [
  {
    label: 'HOW MANY TEAM WILL BE IN THE TOURNAMENT',
    placeHolder: 'NUMBER OF TEAM',
    type: 'number',
    name: 'numberOfTeam',
    defaultValue: '',
    isRequired: true,
  },
  {
    label: 'Pre final stage ?',
    placeHolder: '',
    type: 'checkbox',
    name: 'isPreFinal',
    defaultValue: '',
    isRequired: false,
  },
  {
    label: 'MATCH MAKING STYLE IN PRE FINAL ?',
    placeHolder: '',
    type: 'checkbox',
    name: 'matchMakingStyle',
    defaultValue: '',
    isRequired: false,
  },

  {
    label: 'NUMBER OF MATCHES IN GROUP STAGE',
    placeHolder: 'GROUP MATCHES',
    type: 'number',
    name: 'groupStageMatch',
    defaultValue: '2',
    isRequired: true,
  },
  {
    label: 'NUMBER OF MATCHES IN QUARTER-FINAL STAGE',
    placeHolder: 'QUARTERFINAL MATCHES',
    type: 'number',
    name: 'quarterFinalMatch',
    defaultValue: '3',
    isRequired: true,
  },
  {
    label: 'NUMBER OF MATCHES IN SEMI-FINAL STAGE',
    placeHolder: 'SEMI-FINAL MATCHES',
    type: 'number',
    name: 'semiFinalMatch',
    defaultValue: '4',
    isRequired: true,
  },
  {
    label: 'NUMBER OF MATCHES IN PRE-FINAL STAGE PER GROUP',
    placeHolder: 'PRE-FINAL MATCHES',
    type: 'number',
    name: 'preFinalMatch',
    defaultValue: '6',
    isRequired: true,
  },
  {
    label: 'NUMBER OF MATCHES IN FINAL STAGE',
    placeHolder: 'FINAL MATCHES',
    type: 'number',
    name: 'finalMatch',
    defaultValue: '12',
    isRequired: true,
  },
]

const AutoGenerateInfoForm = ({}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const [matchMakingStyle, setMatchMakingStyle] = useState('KNOCKOUT')
  const handleMatchMakingStyle = (e) => {
    setMatchMakingStyle(e.target.value)
  }
  const [isPreFinal, setIsPreFinal] = useState('NO')
  const handleIsPreFinal = (e) => {
    setIsPreFinal(e.target.value)
  }

  //useForm and on Submit functions

  const onSubmit = async (data) => {
    console.log(data)   
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
            if (textField.type === 'text' || textField.type === 'number') {
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
                      style: { textTransform: 'uppercase' },min:1
                    }}
                    {...register(textField.name, {
                      required: textField.isRequired,
                    })}
                  ></TextField>
                </GridItem>
              )
            }
            if (
              textField.type === 'checkbox' &&
              textField.name === 'isPreFinal'
            ) {
              return (
                <GridItem
                  style={{ marginBottom: '10px' }}
                  key={i}
                  xs={12}
                  sm={6}
                >
                  <InputLabel
                    required={textField.isRequired}
                    style={{
                      marginBottom: '10px',
                    }}
                  >
                    {textField.label}
                  </InputLabel>
                  <fieldset
                    style={{
                      float: 'left',
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    <label>
                      <Checkbox
                        checked={isPreFinal === 'YES' ? true : false}
                        value={'YES'}
                        type="checkbox"
                        name={'YES'}
                        id={'YES'}
                        onChange={handleIsPreFinal}
                      />
                      {'YES'}
                    </label>
                    <label>
                      <Checkbox
                        checked={isPreFinal === 'NO' ? true : false}
                        type="checkbox"
                        value={'NO'}
                        name={'NO'}
                        id={'NO'}
                        onChange={handleIsPreFinal}
                      />
                      {'NO'}
                    </label>
                  </fieldset>
                </GridItem>
              )
            }
            if (
              textField.type === 'checkbox' &&
              textField.name === 'matchMakingStyle' &&
              isPreFinal === 'YES'
            ) {
              return (
                <GridItem
                  style={{ marginBottom: '10px' }}
                  key={i}
                  xs={12}
                  sm={6}
                >
                  <InputLabel
                    required={textField.isRequired}
                    style={{
                      marginBottom: '10px',
                    }}
                  >
                    {textField.label}
                  </InputLabel>
                  <fieldset
                    style={{
                      float: 'left',
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    <label>
                      <Checkbox
                        checked={matchMakingStyle === 'KNOCKOUT' ? true : false}
                        value={'KNOCKOUT'}
                        type="checkbox"
                        name={'KNOCKOUT'}
                        id={'KNOCKOUT'}
                        onChange={handleMatchMakingStyle}
                      />
                      {'KNOCKOUT'}
                    </label>
                    <label>
                      <Checkbox
                        checked={
                          matchMakingStyle === 'ROUND-ROBIN' ? true : false
                        }
                        type="checkbox"
                        value={'ROUND-ROBIN'}
                        name={'ROUND-ROBIN'}
                        id={'ROUND-ROBIN'}
                        onChange={handleMatchMakingStyle}
                      />
                      {'ROUND-ROBIN'}
                    </label>
                  </fieldset>
                </GridItem>
              )
            }
          })}
        </GridContainer>
        <CustomButton style={{ marginTop: '50px' }} type="submit" color="info">
          START MAKING ROADMAP
        </CustomButton>
      </form>
    </>
  )
}
export default AutoGenerateInfoForm
