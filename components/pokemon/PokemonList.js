import React, {Component} from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPokemons } from './services';

import PokemonCard from './PokemonCard';

class PokemonList extends Component{
    constructor(...props){
        super(...props);

        this.state = {
            quantityUrl: this.props.homeReducer.quantity,
            pokemon: null
        };
    }

    componentDidMount = () => {

        getPokemons(this.state.quantityUrl)
            .then(res => {
                this.setState({pokemon: res.results})
            })
            .catch(err => {
                console.log(err)
            })

    };

    render(){
        const {pokemon} = this.state;
        return(
            <React.Fragment>
                {
                    pokemon ? (
                        <Row>
                            {
                                pokemon.map((pokemon, index) => (
                                    <PokemonCard
                                        {...pokemon}
                                        key={index}
                                    >
                                    </PokemonCard>
                                ))
                            }
                        </Row>
                    ) : (
                        <h1 className={'mt-5'}>Loading pokemons...</h1>
                    )
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    homeReducer: state.homeReducer
});

export default connect(
    mapStateToProps,
    null
)(PokemonList);