import React, {useEffect, useState} from 'react'
import {InputGroup, Button, FormControl, Form, Col, Row, Modal} from 'react-bootstrap'
import useController from '../../AppProvider';
import Track from '../track/Track';

const Playlist = ({titles, showHomePage})=> {
  const [playlist, setPlaylist] = useState([]);
  const {searchTrack, createSet, deleteTitlesProvider} = useController();
  const [errorInfo, setErrorInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [playlistName, setPlaylistName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  let titlesArray = [];
  let title= "";
  for(let i = 0; i <= titles.length; i++){
    if(titles[i] === "\n" || titles[i] === "\r" || i === titles.length){
      titlesArray.push(title);
      title="";
    }else{
      title += titles[i];
    }
  }

  const handleRemove = track =>{
    const newPlaylist = playlist.filter(item => item[0] !== track);
    setPlaylist(newPlaylist);
  }

  const handleButton = async() =>{
    if(!playlist.length || !playlistName.length) return;
    const tracksUri = playlist.map(element=>{
      return element[1];
    });
    setLoading(true);
    try{
      await createSet(tracksUri, playlistName);
      setLoading(false);
      setModalOpen(true);
    }
    catch(err){
      setLoading(false);
      setErrorInfo(err.message);
    }
  }

  const handleModal = () =>{
    setModalOpen(false);
    deleteTitlesProvider();
    showHomePage();
  }

  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true);
      for(const index in titlesArray)
      {
        try{
          const res = await searchTrack(titlesArray[index]);
          if(res[0] !== null) setPlaylist(prev=>[...prev,res])
        }
        catch(err){
          setErrorInfo(err.message);
        }
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if(loading)return(
    <div className="d-flex justify-content-center">
      <div 
        className="spinner-border text-primary m-5"
        style={{width: "5rem", height: "5rem"}} 
        role="status">
      </div>
    </div>
  )
  else if(errorInfo.length)return(
    <div 
      className="alert alert-danger" 
      role="alert">
      {errorInfo}.
      <span 
        style={{textDecoration: "underline", fontWeight: "bold", cursor: "pointer"}}
        onClick={showHomePage}
      >
          Try again
      </span>
    </div>
  )
  else return(
    <>
    <div className='container'>
      <Row className="flex-nowrap justify-content-center">
        <Col xs={8}>
          <Form className='mb-5'>
            <InputGroup>
              <FormControl
                placeholder="Enter the name of the playlist you want to create"
                aria-label="Enter the name of the playlist you want to create"
                aria-describedby="Enter the name of the playlist you want to create"
                style={{"boxShadow": "none", "border": "none"}}
                value={playlistName}
                onChange={e=>setPlaylistName(e.target.value)}/>
              <Button 
                variant="outline-secondary" 
                style={{"boxShadow": "none"}} 
                onClick={handleButton}
              >
                Create a playlist!
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </div>
    {playlist.map((item, index)=><Track key={index} id={item} handleRemove={handleRemove}/>)}
    <Modal
      show={modalOpen}
      centered
    >
      <Modal.Body>
        <p>
          The playlist has been saved to your account! :D
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleModal}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  )

};


export default Playlist;
