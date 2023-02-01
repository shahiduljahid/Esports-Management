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
import Button from '/components/CustomButtons/Button.js'

import styles from '/styles/jss/nextjs-material-kit/components/headerLinksStyle.js'
import { Schedule } from '@material-ui/icons/Schedule'

const useStyles = makeStyles(styles)

export default function HeaderLinks(props) {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/">
          <Button color="transparent" className={classes.navLink}>
            Home
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/about">
          <Button color="transparent" className={classes.navLink}>
            About
          </Button>
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
              <a className={classes.dropdownLink}>
                Schedule Management
              </a>
            </Link>,
            <Link href="#">
              <a className={classes.dropdownLink}>
                Certificate Management
              </a>
            </Link>,
            <Link href="/">
              <a className={classes.dropdownLink}>Stream Management</a>
            </Link>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/gallery">
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            Gallery
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/contact">
          <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
          >
            Contact us
          </Button>
        </Link>
      </ListItem>

      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  )
}
