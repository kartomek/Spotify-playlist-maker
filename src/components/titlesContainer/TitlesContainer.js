import React, {useState} from 'react'
import Playlist from '../playlist/Playlist'
import { Form, Button, FormGroup } from 'react-bootstrap';
import useController from '../../AppProvider';

const TitlesContainer=({showHomePage})=> {

  const {titlesProvider, saveTitlesProvider} = useController();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [titles, setTitles] = useState(titlesProvider);
  const [validated, setValidated] = useState(false);

  const handleSubmit = e =>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }else{
      setShowPlaylist(true);
      saveTitlesProvider(titles);
    }

    setValidated(true);
  }

  if(showPlaylist) return<Playlist titles={titles} showHomePage={showHomePage}/>
  else return (
    <Form validated={validated} noValidate onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Control 
          as="textarea" 
          required 
          placeholder="Enter the names of the songs you want to create a playlist from (each title on a new line)" 
          rows={15} 
          className="mb-3" 
          value={titles} 
          onChange={e=>setTitles(e.target.value)} 
          style={{"backgroundColor": "rgb(30,30,30)", "color": "white"}}
        />
        <Form.Control.Feedback 
          type="invalid"
        >
          You must enter the song titles to continue
        </Form.Control.Feedback>
      </FormGroup>
      <div className="d-flex justify-content-end">
        <Button 
          type="submit" 
          className="btn-info" 
          style={{"boxShadow": "none"}}
        >
          Create a Playlist
        </Button>
      </div>
    </Form>
  )

}

export default TitlesContainer