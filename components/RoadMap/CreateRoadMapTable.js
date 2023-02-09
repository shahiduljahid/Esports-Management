import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  InputLabel,
  Button,
  Grid,
  Checkbox,
  FormHelperText,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import CustomButton from '/components/CustomButtons/Button.js'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import axios from 'axios'

// core components
import getUrl from '../../Functions/getUrl'
import { useAuth } from '../../lib/auth'
//dialog component
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import notificationPopUp from '../../Functions/notificationPopUp'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))
const normalRoundTextFields = [
  {
    label: 'ROUND NAME',
    placeHolder: 'ROUND NAME',
    type: 'text',
    name: 'roundName',
    defaultValue: '',
    isRequired: true,
  },
  {
    label: 'INVITED TEAM',
    placeHolder: 'NUMBER OF INVITED TEAM',
    type: 'number',
    name: 'invitedTeam',
    defaultValue: '',
    isRequired: false,
  },
  {
    label: 'MATCH MAKING STYLE',
    placeHolder: '',
    type: 'dropDown',
    name: 'matchMakingStyle',
    defaultValue: '',
    isRequired: false,
  },
  {
    label: 'TEAMS PER GROUP',
    placeHolder: 'NUMBER OF TEAM',
    type: 'number',
    name: 'teamPerGroup',
    defaultValue: '',
    isRequired: true,
  },
  {
    label: 'MATCH PER GROUP',
    placeHolder: 'NUMBER OF MATCHES',
    type: 'number',
    name: 'matchPerGroup',
    defaultValue: '',
    isRequired: true,
  },

  {
    label: 'QUALIFY NEXT ROUND',
    placeHolder: 'TEAM QUALIFY NEXT ROUND',
    type: 'number',
    name: 'qualify',
    defaultValue: '',
    isRequired: true,
  },
]
const finalRoundTextFields = [
  {
    label: 'ROUND NAME',
    placeHolder: 'FINAL',
    type: 'text',
    name: 'roundName',
    defaultValue: 'FINAL',
    isRequired: true,
  },

  {
    label: 'MATCH WILL BE PLAYED',
    placeHolder: 'NUMBER OF MATCHES',
    type: 'number',
    name: 'matchPerGroup',
    defaultValue: '',
    isRequired: true,
  },

  {
    label: 'INVITED TEAM',
    placeHolder: 'INVITED TEAM NEXT ROUND',
    type: 'number',
    name: 'invitedTeam',
    defaultValue: '',
    isRequired: false,
  },
]
const CreateRoadMapTable = ({
  newRoadMap,
  teamRemaining,
  setTeamRemaining,
  setNewRoadMap,
  handleAddRoadMapClose,
}) => {
  const { user } = useAuth()
  const classes = useStyles()
  const [imgLoading, setImageLoading] = useState(false)
  const [matchMakingStyle, setMatchMakingStyle] = useState('KNOCKOUT')
  const [isFinal, setIsFinal] = useState()
  const { enqueueSnackbar } = useSnackbar()
  const [qualifiedTeam, setQualifiedTeam] = useState(teamRemaining)
  const [invitedTeam, setInvitedTeam] = useState()
  const [divideInto, setDivideInto] = useState()
  const handleUpdatedForm = (e, name) => {
    if (name === 'teamPerGroup') {
      const totalTeam = parseInt(teamRemaining)
      if (
        parseInt(e.target.value) > 0 &&
        parseInt(e.target.value) < totalTeam
      ) {
        const res = totalTeam / parseInt(e.target.value)

        setDivideInto(Math.round(res))
      } else {
        setDivideInto()
      }
    }
    if (name === 'invitedTeam') {
      if (parseInt(e.target.value) > 0) {
        const newNumber = parseInt(qualifiedTeam) + parseInt(e.target.value)
        setInvitedTeam(parseInt(e.target.value))
        setTeamRemaining(newNumber)
        if (newNumber > 20) {
          setIsFinal(false)
        }
      } else {
        setInvitedTeam()
        setTeamRemaining(qualifiedTeam)
      }
    }
  }

  const handleMinInputRange = (name) => {
    if (name === 'teamPerGroup') {
      if (matchMakingStyle === 'KNOCKOUT') {
        return 13
      } else {
        return 7
      }
    } else if (name === 'matchPerGroup') {
      return 1
    } else {
      return 0
    }
  }
  const handleMaxInputRange = (name) => {
    if (name === 'teamPerGroup') {
      if (matchMakingStyle === 'KNOCKOUT') {
        return 20
      } else {
        return 10
      }
    } else {
      return 1000
    }
  }

  const handleMatchMakingStyle = (e) => {
    setMatchMakingStyle(e.target.value)
  }

  const handleIsFinal = (e) => {
    setIsFinal(e.target.checked)
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  //useForm and on Submit functions

  const onSubmit = async (data) => {
    let alertMessage
    const totalTeam = parseInt(teamRemaining)
    const dividedInto = totalTeam / parseInt(data.teamPerGroup)

    let isSubmittable = true
    if (isFinal) {
      let teamCount = parseInt(teamRemaining)

      if (teamCount > 20) {
        isSubmittable = false
        alertMessage =
          'you can not make round with more than 20 team in a single group'
      } else {
        if (teamCount < 12) {
          isSubmittable = false
          alertMessage =
            'you can not make lobby with less than 13 team in a single group'
        }
      }
    } else {
      if (matchMakingStyle === 'KNOCKOUT') {
        const isTeamLeftOut =
          totalTeam - Math.round(dividedInto) * parseInt(data.teamPerGroup)

        if (parseInt(data.teamPerGroup) > parseInt(teamRemaining)) {
          isSubmittable = false
          alertMessage = `INVALID TEAM IN PER GROUP`
        } else if (isTeamLeftOut > 0) {
          isSubmittable = false
          alertMessage = `${isTeamLeftOut} TEAM WILL BE LEFT ! ADD MORE TEAM IN PER GROUP`
        } else if (
          parseInt(teamRemaining) % parseInt(data.teamPerGroup) < 13 &&
          parseInt(teamRemaining) % parseInt(data.teamPerGroup) !== 0
        ) {
          console.log(parseInt(teamRemaining) % parseInt(data.teamPerGroup))
          isSubmittable = false
          alertMessage =
            'you can not make lobby with less than 13 team in a single group'
        } else if (parseInt(data.teamPerGroup) > 20) {
          isSubmittable = false
          alertMessage =
            'you can not make lobby with more than 20 team in a single group'
        }
      } else {
        const isSameTeamPerGroup =
          totalTeam - Math.round(dividedInto) * parseInt(data.teamPerGroup)

        if (isSameTeamPerGroup !== 0) {
          isSubmittable = false
          alertMessage = `NEED SAME NUMBER OF  TEAM AT PER GROUP IN ROUND ROBIN FORMAT`
        } else if (Math.round(dividedInto) <= 2) {
          isSubmittable = false
          alertMessage = `YOU HAVE ${dividedInto} GROUP . NEED MORE THAN 2  GROUP IN ROUND ROBIN FORMAT`
        }
      }
    }

    if (isSubmittable) {
      console.log(data)
      data.dividedInto = Math.round(dividedInto)
      data.roundName = data.roundName.toUpperCase()
      data.matchMakingStyle = matchMakingStyle
      data.qualifiedTeam =  qualifiedTeam
      data.isFinal = isFinal ? true : false
      const updateRoadMap = [...newRoadMap, data]
      if (matchMakingStyle === 'KNOCKOUT') {
        setTeamRemaining(data.qualify * Math.round(dividedInto))
      } else {
        setTeamRemaining(data.qualify)
      }
      handleAddRoadMapClose()
      setNewRoadMap(updateRoadMap)
      handleAddRoadMapClose(updateRoadMap)
      reset()
    } else {
      notificationPopUp(alertMessage, 'error', enqueueSnackbar)
    }
  }

  return (
    <>
      {imgLoading && (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              zIndex: 2099,
              top: 0,
              left: 0,
              right: 0,
              height: '100vh',
              position: 'fixed',
              width: '100%',
              backdropFilter: 'blur(3px)',
              background: '#2b2b2bb0',
              padding: '30px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 'auto',
                background: '#ffff',
                padding: '4px',
                textAlign: 'center',
                boxShadow: 'rgb(53 53 53 / 52%) 1px 1px 10px 4px',
              }}
            >
              <img style={{ width: 300 }} src="/img/progress.gif" />
            </div>
          </div>
        </div>
      )}
      <form
        style={{
          marginTop: '20px',
          padding: 5,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {parseInt(teamRemaining) <= 20 && (
          <div style={{ marginBottom: '10px' }}>
            {' '}
            <label>
              <Checkbox
                checked={isFinal ? true : false}
                value={'final'}
                onChange={handleIsFinal}
                type="checkbox"
                name={'isFinal'}
                id={'isFinal'}
              />
              {'IS IT FINAL STAGE ?'}
            </label>
          </div>
        )}

        <GridContainer style={{ margin: 0 }}>
          {!isFinal ? (
            <>
              {normalRoundTextFields.map((textField, i) => {
                if (textField.type === 'text' || textField.type === 'number') {
                  return (
                    <GridItem key={i} xs={12} sm={6}>
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
                          min: handleMinInputRange(textField.name),
                          max: handleMaxInputRange(textField.name),
                        }}
                        {...register(textField.name, {
                          required: textField.isRequired,
                        })}
                        onChange={(e) => handleUpdatedForm(e, textField.name)}
                      ></TextField>
                      <FormHelperText style={{ marginBottom: '20px' }}>
                        {textField.name === 'teamPerGroup' ? (
                          <span
                            style={{
                              fontSize: '12px',
                              color: '#ffc107',
                              fontWeight: '700',
                            }}
                          >
                            {divideInto && `DIVIDED INTO ${divideInto} GROUP`}
                          </span>
                        ) : (
                          ''
                        )}
                        {textField.name === 'invitedTeam' ? (
                          <span
                            style={{
                              fontSize: '12px',
                              color: '#ffc107',
                              fontWeight: '700',
                            }}
                          >
                            {invitedTeam &&
                              `${qualifiedTeam} QUALIFIED TEAM + ${invitedTeam} INVITED TEAM`}
                          </span>
                        ) : (
                          ''
                        )}
                      </FormHelperText>
                    </GridItem>
                  )
                }

                if (textField.type === 'dropDown') {
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
                            checked={
                              matchMakingStyle === 'KNOCKOUT' ? true : false
                            }
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
            </>
          ) : (
            <>
              {finalRoundTextFields.map((textField, i) => {
                if (textField.type === 'text' || textField.type === 'number') {
                  return (
                    <GridItem key={i} xs={12} sm={6}>
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
                          min: handleMinInputRange(textField.name),
                          max: handleMaxInputRange(textField.name),
                        }}
                        {...register(textField.name, {
                          required: textField.isRequired,
                        })}
                        onChange={(e) => handleUpdatedForm(e, textField.name)}
                      ></TextField>
                      <FormHelperText style={{ marginBottom: '20px' }}>
                        {textField.name === 'invitedTeam' ? (
                          <span
                            style={{
                              fontSize: '12px',
                              color: '#ffc107',
                              fontWeight: '700',
                            }}
                          >
                            {invitedTeam &&
                              `${qualifiedTeam} QUALIFIED TEAM + ${invitedTeam} INVITED TEAM`}
                          </span>
                        ) : (
                          ''
                        )}
                      </FormHelperText>
                    </GridItem>
                  )
                }
              })}
            </>
          )}
        </GridContainer>
        <CustomButton style={{ marginTop: '50px' }} type="submit" color="info">
          ADD ROUND
        </CustomButton>
      </form>
    </>
  )
}
export default CreateRoadMapTable
