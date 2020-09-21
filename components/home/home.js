import React, {Component} from 'react';
import { Button, Row, Col, Form, Modal } from 'react-bootstrap';
import { setName, setQuantity } from '../../actions/homeAction';
import { connect } from 'react-redux';

const simg = {
    'marginTop': '50px',
    'width': '80%'
}
const sform = {
    'width': '300px',
    'marginTop': '20px'
}

class Home extends Component {
    constructor(...props){
        super(...props);
        
        this.state = {
            name: this.props.homeReducer.name,
            quantity: this.props.homeReducer.quantity,
            showModal: false
        };
    }

    handleHome = (e) => {
        const nameInput = e.target.name;
        const valueInput = e.target.value;

        this.setState({
          ...this.state,
          [nameInput]: valueInput
        })
    }

    handleSave = () => {
        this.props.setName(this.state.name)
        this.props.setQuantity(this.state.quantity)
        this.setState({
            showModal: true
        })
    }

    render(){
        const { showModal } = this.state;
        return (
            <React.Fragment>
                <Modal show={showModal}>
                    <Modal.Header>
                        <Modal.Title>¡Guardado Exitosamente!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bienvenido {this.props.homeReducer.name}, <br/>
                        Pasa a la sección listar para ver tus {this.props.homeReducer.quantity} pokemones.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={()=>this.setState({showModal:false})}
                        >
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <center>
                    <Row className={"top-200"}>
                        <Col>
                            <Form style={sform}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Ingresa tu nombre</Form.Label>
                                    <Form.Control type="text" name="name" defaultValue={this.props.homeReducer.name} placeholder="" onBlur={this.handleHome} required/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Cantidad de pokemones a listar</Form.Label>
                                    <Form.Control as="select" name="quantity" defaultValue={this.props.homeReducer.quantity} onBlur={this.handleHome}>
                                        <option>50</option>
                                        <option>100</option>
                                        <option>150</option>
                                        <option>200</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button 
                                    variant="primary" 
                                    type="button" 
                                    onClick={this.handleSave}
                                >
                                    Guardar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </center>
            </React.Fragment>
        );
    };
}

const mapStateToProps = state => ({
    homeReducer: state.homeReducer
});

const mapDispatchToProps = () => {
    return {
        setName, setQuantity
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(Home);