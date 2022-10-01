import React, {useState} from 'react'
import {InputGroup, Button, FormControl, Alert, Form, Row, Col} from 'react-bootstrap'
import TitlesContainer from '../titlesContainer/TitlesContainer'
import useController from '../../AppProvider'

const HomePage = () => {

  const [showTitlesConatiner, setShowTitlesConatiner] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const {saveToken, token} = useController();
  const [inputToken, setInputToken] = useState(token? token : "");

  const handleButton = ()=>{
    if(inputToken.length > 0){
      saveToken(inputToken);
      setShowAlert(false);
      setShowTitlesConatiner(true);
    }else setShowAlert(true);
  }

  return (
    <div>
      <h1 className='text-center text-white m-5 header'>Spotify playlist maker!</h1>
      <div className='decoration1'></div>
      <div className='decoration2'></div>

      {showTitlesConatiner ? <TitlesContainer showHomePage={()=>setShowTitlesConatiner(false)}/> 
      : (
        <div>
          {showAlert && 
          (
            <Alert 
              variant="danger" 
              onClose={() => setShowAlert(false)} 
              dismissible
            >
              To create a playlist, you must provide an access token!
              <Alert.Link 
                href="https://developer.spotify.com/console/post-playlists/"
              > 
                You can find it here. 
              </Alert.Link>
              Make sure the token allows you to modify playlists!
            </Alert>
          )}
        
          <Form>
            <InputGroup>
              <FormControl
                placeholder="Enter your Spotify token"
                aria-label="Enter your Spotify token"
                aria-describedby="Enter your Spotify token"
                style={{"boxShadow": "none", "border": "none"}}
                value={inputToken}
                onChange={e=>setInputToken(e.target.value)}
              />
              <Button 
                variant="outline-secondary"
                style={{"boxShadow": "none"}} 
                onClick={handleButton}
              >
                Next
              </Button>
            </InputGroup>
          </Form>
        
          <div className='w-75'>
            <Row>
              <Col>
                <h1 
                  className='text-white mb-5 border-bottom border-primary' 
                  style={{"marginTop": "15vh"}}
                >
                  How to create a playlist?
                </h1>
              </Col>
            </Row>
            <Row className='text-white'>
              <Col md={3} sm={6} className="mb-4" style={{"color": "rgb(143,143,143)"}}>
                1. Enter the access token for your Spotify account
              </Col>
              <Col md={3} sm={6} className="mb-4" style={{"color": "rgb(143,143,143)"}}>
                2. Enter the list of the songs you want to make a Spotify playlist from
              </Col>
              <Col md={3} sm={6} className="mb-4" style={{"color": "rgb(143,143,143)"}}>
                3. From the songs found, remove the wrong ones
              </Col>
              <Col md={3} sm={6} className="mb-4" style={{"color": "rgb(143,143,143)"}}>
                {`4. Create a playlist and save songs! :${')'}`}
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage