import React, { useState, CSSProperties } from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import Email from '@material-ui/icons/Email'
import People from '@material-ui/icons/People'
// core components
import Header from '/components/Header/Header.js'
import HeaderLinks from '/components/Header/HeaderLinks.js'
import Footer from '/components/Footer/Footer.js'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import Button from '/components/CustomButtons/Button.js'
import Card from '/components/Card/Card.js'
import CardBody from '/components/Card/CardBody.js'
import CardHeader from '/components/Card/CardHeader.js'
import CardFooter from '/components/Card/CardFooter.js'
import CustomInput from '/components/CustomInput/CustomInput.js'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useForm } from 'react-hook-form'
import styles from '/styles/jss/nextjs-material-kit/pages/loginPage.js'
import Head from 'next/head'
import { useAuth } from '../lib/auth'
import { useRouter } from 'next/router'
import BeatLoader from 'react-spinners/BeatLoader'

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

const useStyles = makeStyles(styles)

export default function LoginPage(props) {
  const {
    loginStatus,
    signInWithGoogle,
    signInWithGoogleRedirect,
    signUpWithEmailAndPass,
    signInWithEmailAndPass,
    resetPass,
  } = useAuth()

  const router = useRouter()
  const { user } = useAuth()
  if (user) {
    router.push('/tournament')
  }
  const [newUser, setNewUser] = useState(false)
  // const [resetPopup, setResetPopup] = useState(false);
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (e) => {
    e.preventDefault()
    if (e.target.email.value) {
      resetPass(e.target.email.value)
        .then((res) => {
          if (res?.success) {
            setOpen(false)
          } else if (res?.error) {
            setOpen(false)
          }
        })
        .catch((error) => {
          // ..
        })
    }
  }

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const { name, email, password } = data
    if (newUser) {
      try {
        await signUpWithEmailAndPass(name, email, password)
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        const res = await signInWithEmailAndPass(email, password)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const [cardAnimaton, setCardAnimation] = useState('cardHidden')
  // setTimeout(function () {
  //   setCardAnimation("");
  // }, 700);
  const classes = useStyles()
  const { ...rest } = props
  return (
    <div>
      <Head>
        <title>Login ESPORTS GROUND</title>
      </Head>
      <Header
        absolute
        color="transparent"
        brand="ESPORTS GROUND"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/landing-bckgrd.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer style={{ display: 'flex', justifyContent: 'center' }}>
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes['']}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={classes.form}
                >
                  <CardHeader
                    // style={{ height: 120 }}
                    color="info"
                    className={classes.cardHeader}
                  >
                    <h4>Login</h4>
                    <div className={classes.socialLine}>
                      <Button
                        style={{
                          cursor:
                            loginStatus.status == 'pending' && 'not-allowed',
                        }}
                        justIcon
                        target="_blank"
                        color="transparent"
                        onClick={signInWithGoogle}
                      >
                        <i className={'fab fa-linkedin'} />
                      </Button>

                      <Button
                        style={{
                          cursor:
                            loginStatus.status == 'pending' && 'not-allowed',
                        }}
                        justIcon
                        target="_blank"
                        color="transparent"
                        onClick={signInWithGoogle}
                      >
                        <i className={'fab fa-google'} />
                      </Button>
                    </div>
                  </CardHeader>
                  {/* <p className={classes.divider}>Or Be Classical</p> */}
                  <CardBody>
                    {newUser && (
                      <CustomInput
                        register={{
                          ...register('name', {
                            // pattern: /^[A-Za-z]+$/i,
                          }),
                        }}
                        labelText="Full Name..."
                        id="first"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: 'text',
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                    {/* {errors?.name?.type === "pattern" && (
                      <p>Alphabetical characters only</p>
                    )} */}
                    <CustomInput
                      register={{
                        ...register('email', {
                          required: true,
                          // maxLength: 20,
                          pattern: /^\S+@\S+\.\S+$/,
                        }),
                      }}
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'email',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors?.email?.type === 'required' && (
                      <p>This field is required</p>
                    )}
                    {errors?.email?.type === 'pattern' && (
                      <p>Email is not valid</p>
                    )}
                    <CustomInput
                      register={{
                        ...register('password', {
                          required: 'Password is required!',
                        }),
                      }}
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'password',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                    />
                    {errors.password && (
                      <p style={{ color: 'black' }}>
                        {errors.password.message}
                      </p>
                    )}

                    {newUser && (
                      <>
                        <CustomInput
                          register={{
                            ...register('passwordConfirmation', {
                              required: 'Please confirm password!',
                              validate: {
                                matchesPreviousPassword: (value) => {
                                  const { password } = getValues()
                                  return (
                                    password === value ||
                                    "Passwords didn't match!"
                                  )
                                },
                              },
                            }),
                          }}
                          labelText="Confirm password"
                          id="pass"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: 'password',
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: 'off',
                          }}
                        />
                        {errors.passwordConfirmation && (
                          <p style={{ color: 'black' }}>
                            {errors.passwordConfirmation.message}
                          </p>
                        )}
                      </>
                    )}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      style={{
                        padding: '12px 30px',
                        transition: 'all 0.3s',
                        cursor:
                          loginStatus.status == 'pending' && 'not-allowed',
                      }}
                      type="submit"
                      color="info"
                      size="lg"
                    >
                      {newUser ? 'Sign Up' : 'log in'}
                      {loginStatus.status == "pending" && (
                  
                        <BeatLoader  style={{ marginLeft: 5 }} margin={2}
                        size={12} color="white" />
                      )}
                    </Button>
                  </CardFooter>

                  <p style={{ textAlign: 'center', marginBottom: 25 }}>
                    {!newUser ? (
                      <span style={{ color: 'black' }}>
                        Don't have account?{' '}
                        <span
                          style={{ cursor: 'pointer' }}
                          className={classes.underline}
                          onClick={() => {
                            setNewUser(true)
                          }}
                        >
                          Create an account
                        </span>
                      </span>
                    ) : (
                      <span style={{ color: 'black' }}>
                        Already have an account?{' '}
                        <span
                          style={{ cursor: 'pointer' }}
                          className={classes.underline}
                          onClick={() => {
                            setNewUser(false)
                          }}
                        >
                          Login
                        </span>
                      </span>
                    )}
                  </p>
                </form>
              </Card>
              <p style={{ textAlign: 'center', marginTop: -25, fontSize: 17 }}>
                <span style={{ color: 'white' }}>
                  Forgot password?{' '}
                  <span
                    style={{ color: '#01cfff' }}
                    className={classes.underline}
                    onClick={handleClickOpen}
                  >
                    {' '}
                    Reset
                  </span>
                </span>
              </p>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <form onSubmit={handleClose}>
                  <DialogTitle id="form-dialog-title">
                    Reset password
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Password rest link will be sent to your email if you are
                      registered.
                    </DialogContentText>
                    <TextField
                      required
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"
                      name="email"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button type="submit" color="info">
                      Send
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  )
}
