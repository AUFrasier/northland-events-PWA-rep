import React, { useState } from "react"
import {Modal, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SuccessModal = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you for your submission!  We will review your advertisement request and get back to your shortly.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default SuccessModal;