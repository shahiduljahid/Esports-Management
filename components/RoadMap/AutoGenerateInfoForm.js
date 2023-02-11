import React, { useState } from 'react'

import { TextField, InputLabel, Checkbox } from '@material-ui/core'
import CustomButton from '/components/CustomButtons/Button.js'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import notificationPopUp from '../../Functions/notificationPopUp'
import { async } from './../../pages/tournament/index'

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

const AutoGenerateInfoForm = ({
  setNewRoadMap,
  handleClose,
  setTournamentId,
  saveTourId,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const { enqueueSnackbar } = useSnackbar()

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
    data.matchFormat = matchMakingStyle
    data.withPreFinal = isPreFinal
    const newRoadMap = await handleAutoGenerateRoadMap(data)
    console.log(newRoadMap)
    if (newRoadMap?.length) {
      setNewRoadMap(newRoadMap)
      setTournamentId(saveTourId)
      handleClose()
      reset()
    }
  }

  //handle auto generate roadMap algorithm
  const handleAutoGenerateRoadMap = async (tourData) => {
    let newRoadMap = []
    let teamRemaining = parseInt(tourData.numberOfTeam)
    let i = 10
    while (i > 0) {
      const roundData = handleMakeRound(teamRemaining, tourData)
      console.log(roundData)
      if (roundData?.qualifiedTeam && roundData?.teamPerGroup) {
        const updateData = [...newRoadMap, roundData]
        newRoadMap = updateData
        if (roundData?.isFinal) {
          break
        } else {
          if (roundData?.matchMakingStyle === 'ROUND-ROBIN') {
            teamRemaining = parseInt(roundData?.qualify)
          } else {
            teamRemaining =
              parseInt(roundData?.dividedInto) * parseInt(roundData?.qualify)
          }
        }
      } else {
        newRoadMap = []
        notificationPopUp(
          `failed to generate . add more team or  make it manually`,
          'warning',
          enqueueSnackbar,
        )
        break
      }
      i--
    }
    return newRoadMap
  }
  const handleObjFormat = (name, teamRemaining, matchPerGroup, qualify) => {
    const { dividedInto, teamPerGroup } = handleTeamPerGroup(
      teamRemaining,
      'KNOCKOUT',
    )
    const obj = {
      roundName: name,
      invitedTeam: '',
      teamPerGroup: teamPerGroup,
      matchPerGroup: matchPerGroup,
      qualify: qualify,
      dividedInto: dividedInto,
      matchMakingStyle: 'KNOCKOUT',
      qualifiedTeam: teamRemaining,
      isFinal: false,
    }
    return obj
  }
  const handleMakeRound = (teamRemaining, tourInfo) => {
    //Generate Final  stage
    if (teamRemaining <= 20)
      return {
        roundName: 'FINAL',
        invitedTeam: '',
        teamPerGroup: teamRemaining,
        matchPerGroup: tourInfo.finalMatch,
        qualify: '',
        dividedInto: '',
        matchMakingStyle: 'KNOCKOUT',
        qualifiedTeam: teamRemaining,
        isFinal: true,
      }
    //Generate PreFinal  stage
    else if (teamRemaining <= 40) {
      if (tourInfo.withPreFinal === 'YES') {
        const { dividedInto, teamPerGroup } = handleTeamPerGroup(
          teamRemaining,
          tourInfo.matchFormat,
        )
        if (tourInfo.matchFormat === 'KNOCKOUT') {
          return {
            roundName: 'PRE FINAL',
            invitedTeam: '',
            teamPerGroup: teamPerGroup,
            matchPerGroup: tourInfo.preFinalMatch,
            qualify: '8',
            dividedInto: dividedInto,
            matchMakingStyle: 'KNOCKOUT',
            qualifiedTeam: teamRemaining,
            isFinal: false,
          }
        } else {
          return {
            roundName: 'PRE FINAL',
            invitedTeam: '',
            teamPerGroup: teamPerGroup,
            matchPerGroup: tourInfo.preFinalMatch,
            qualify: '16',
            dividedInto: dividedInto,
            matchMakingStyle: 'ROUND-ROBIN',
            qualifiedTeam: teamRemaining,
            isFinal: false,
          }
        }
      } else {
        return handleObjFormat(
          'SEMI FINAL',
          teamRemaining,
          tourInfo.semiFinalMatch,
          8,
        )
      }
    }
    //Generate semi final  stage
    else if (teamRemaining <= 80) {
      return handleObjFormat(
        'SEMI FINAL',
        teamRemaining,
        tourInfo.semiFinalMatch,
        6,
      )
    }
    //Generate quarter final  stage
    else if (teamRemaining <= 160) {
      return handleObjFormat(
        'QUARTER-FINAL',
        teamRemaining,
        tourInfo.quarterFinalMatch,
        7,
      )
    }
    //Generate Group  stage
    else if (teamRemaining <= 300) {
      return handleObjFormat(
        'QUALIFIER ROUND',
        teamRemaining,
        tourInfo.groupStageMatch,
        8,
      )
    }
    //Generate Group  stage
    else if (teamRemaining > 300) {
      return handleObjFormat(
        'QUALIFIER ROUND',
        teamRemaining,
        tourInfo.groupStageMatch,
        8,
      )
    }
  }
  const handleTeamPerGroup = (teamNumber, matchStyle) => {
    let dividedInto
    let teamPerGroup
    if (matchStyle === 'KNOCKOUT') {
      const teamPerGroupArray = [16, 17, 18, 19, 20, 15]
      for (let index = 0; index < teamPerGroupArray.length; index++) {
        const teamNum = teamPerGroupArray[index]
        dividedInto = Math.round(teamNumber / teamNum)
        console.log(dividedInto, teamNumber, teamNum)
        const isTeamLeftOut = teamNumber - dividedInto * teamNum
        console.log(isTeamLeftOut)
        console.log(parseInt(teamNumber) % parseInt(teamNum))
        if (
          isTeamLeftOut < 0 &&
          parseInt(teamNumber) % parseInt(teamNum) > 13
        ) {
          teamPerGroup = teamNum
          break
        } else if (
          isTeamLeftOut <= 0 &&
          parseInt(teamNumber) % parseInt(teamNum) === 0
        ) {
          teamPerGroup = teamNum
          break
        }
      }
    } else {
      const teamPerGroupArray = [7, 8, 9, 10]
      for (let index = 0; index < teamPerGroupArray.length; index++) {
        const teamNum = teamPerGroupArray[index]
        dividedInto = Math.round(teamNumber / teamNum)
        const isSameTeamPerGroup = teamNumber - dividedInto * teamNum
        if (isSameTeamPerGroup === 0) {
          teamPerGroup = teamNum
          break
        }
      }
    }

    return { dividedInto, teamPerGroup }
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
                      style: { textTransform: 'uppercase' },
                      min: textField?.name === 'numberOfTeam' ? 15 : 1,
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
