import React from 'react'
import {Row, Col} from 'react-bootstrap'

const Track=({id, handleRemove})=> {

  return (
    <div className="container">
      <Row className="flex-nowrap justify-content-center">
        <Col xs={5}>
          <iframe 
            className="w-100" 
            src={`https://open.spotify.com/embed/track/${id[0]}`}
          >
          </iframe>
        </Col>
        <Col 
          xs={1} 
          className="d-flex justify-content-center"
        >
          <div 
            role='button' 
            onClick={()=>handleRemove(id[0])}
          >
            <h1 className='text-white text-center'>-</h1>
          </div>
        </Col>
      </Row>
    </div>
  )

}

export default Track