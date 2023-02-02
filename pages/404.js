import React, {useState } from 'react'
import GridContainer from '/components/Grid/GridContainer.js'
import GridItem from '/components/Grid/GridItem.js'
import homeStyle from '../components/Header/Header.module.css'
import Layout from './../Layout/Layout'

const _error = () => {
  const [loading, setLoading] = useState(true)
  const loader = () => {
    setTimeout(() => {
      setLoading(false)
    }, 10)
  }
  loader()
  return (
    <Layout image={'/img/assets/contactBg.jpg'}>
      <div>
        {' '}
        <GridContainer
          style={{
            margin: '0px',
            marginBottom: '100px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <GridItem
            style={{
              marginTop: '120px',
              marginBottom: '50px',
              backgroundImage: `url('/img/assets/partnerTitleBg.jpg')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              transition: '2s',
              backgroundPosition: `${loading ? 'unset' : 'center 0'}`,
            }}
          >
            <GridItem
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
              }}
              className={homeStyle.contactTitleSection}
            >
              <h1
                style={{ color: 'white',fontSize: '60px'  }}
                className={homeStyle.contactTitleText}
              >
                404
              </h1>
              <h3
                style={{ color: 'white', fontSize: '40px' }}
                className={homeStyle.contactTitleText}
              >
                RUN ALONG NOW, NOTHING TO SEE HERE
              </h3>
            </GridItem>
          </GridItem>
        </GridContainer>
      </div>
    </Layout>
  )
}

export default _error
