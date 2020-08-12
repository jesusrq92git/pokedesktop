import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PokemonList from '../pokemon/PokemonList';

const Dashboard = () => {
    return(
        <Container>
            <Row>
                <Col>
                    <PokemonList></PokemonList>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard;