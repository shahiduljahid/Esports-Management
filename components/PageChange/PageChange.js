import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

// core components
import { infoColor, title } from '/styles/jss/nextjs-material-kit.js'
import Image from 'next/image'

const useStyles = makeStyles({
  progress: {
    color: infoColor,
    width: '6rem !important',
    height: '6rem !important',
  },
  wrapperDiv: {
    margin: '100px auto',
    padding: '0px',
    maxWidth: '360px',
    textAlign: 'center',
    position: 'relative',
    zIndex: '9999',
    top: '0',
  },
  iconWrapper: {
    display: 'block',
  },
  title: {
    ...title,
    color: '#FFFFFF',
  },
})

export default function PageChange(props) {
  const classes = useStyles()
  return (
    <div>
      
        {/* <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#190e1f',
          }}
        >
          <div>
            <Image src={'/img/assets/preloader.gif'} height={300} width={200} />
          </div>
        </div> */}
     
    </div>
  )
}
