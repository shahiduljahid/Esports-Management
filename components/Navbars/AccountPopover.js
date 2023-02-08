import { useRef, useState } from 'react'

// material
import { alpha } from "@material-ui/core/styles";

import {
  Button,
  Box,
  Divider,
  Typography,
  Avatar,
  IconButton,
} from '@material-ui/core'
// components
import MenuPopover from './MenuPopover'
import { useAuth } from '../../lib/auth'
import { useRouter } from 'next/router'

export default function AccountPopover() {
  const { user, logOut } = useAuth()
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={user?.photoUrl} alt={user?.name} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box style={{ padding: '10px' }} sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" style={{ color: '#00cfff' }} noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" style={{ color: '#00cfff' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Box style={{ padding: '10px' }} sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            onClick={() => {
              logOut()
            }}
            style={{ color: '#00cfff', borderColor: '#00cfff' }}
            variant="outlined"
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}
