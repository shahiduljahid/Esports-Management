/*eslint-disable*/
import React from 'react'
import Link from 'next/link'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'

// @material-ui/icons
import { Apps, CloudDownload } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

// core components
import CustomDropdown from '/components/CustomDropdown/CustomDropdown.js'
import CustomButton from '/components/CustomButtons/Button.js'

import styles from '/styles/jss/nextjs-material-kit/components/headerLinksStyle.js'
import { Schedule } from '@material-ui/icons/Schedule'
import AccountPopover from './../Navbars/AccountPopover'
import { useAuth } from '../../lib/auth'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'

const useStyles = makeStyles(styles)

export default function HeaderLinks(props) {
  const { user, logOut } = useAuth()
  const classes = useStyles()
  const router = useRouter()
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/">
          <CustomButton color="transparent" className={classes.navLink}>
            Home
          </CustomButton>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/about">
          <CustomButton color="transparent" className={classes.navLink}>
            About
          </CustomButton>
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="services"
          buttonProps={{
            className: classes.navLink,
            color: 'transparent',
          }}
          dropdownList={[
            <Link href="#">
              <a className={classes.dropdownLink}>Schedule Management</a>
            </Link>,
            <Link href="#">
              <a className={classes.dropdownLink}>Certificate Management</a>
            </Link>,
            <Link href="/">
              <a className={classes.dropdownLink}>Stream Management</a>
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/stream">
          <CustomButton
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            Stream
          </CustomButton>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/contact">
          <CustomButton
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            Contact us
          </CustomButton>
        </Link>
      </ListItem>

      {user ? (
        <>
          {' '}
          <ListItem className={classes.listItem}>
            <Link href="/dashboard">
              <CustomButton
                color="transparent"
                target="_blank"
                className={classes.navLink}
              >
                Tournament
              </CustomButton>
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <AccountPopover />
          </ListItem>
        </>
      ) : (
        <>
          {!user &&
            router.pathname !== '/login' &&
            router.pathname !== '/dashboard' && (
              <ListItem className={classes.listItem}>
                <Link href="/login">
                  <Button
                    style={{
                      padding: '15px',
                      color: '#f50057',
                      fontWeight: '700',
                      fontSize: '17px',
                      fontFamily: 'Rajdhani , sans-serif',
                    }}
                    variant="outlined"
                    color="secondary"
                    target="_blank"
                    className={classes.navLink}
                  >
                    Log in
                  </Button>
                </Link>
              </ListItem>
            )}
        </>
      )}
    </List>
  )
}
