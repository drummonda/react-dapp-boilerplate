import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

class MetamaskAlert extends Component {
    render() {
        const { metamask } = this.props
        return (
          <div>
            <Modal show={!metamask}>
              <Modal.Header>
                <Modal.Title>MetaMask needed</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  If you're reading this, you need to install MetaMask!
                  <br/>
                  Once you have installed, please refresh the page
              </Modal.Body>
              <Modal.Footer>
                  <Button href="https://metamask.io/">Get MetaMask</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    metamask: state.web3.metamask
})

export default connect(mapStateToProps)(MetamaskAlert)
