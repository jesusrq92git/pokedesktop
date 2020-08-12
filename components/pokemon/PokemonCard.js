import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';

import spinner from '../pokemon/spinner.gif';

class PokemonCard extends Component{
    constructor(...props){
        super(...props);

        this.state = {
            name: '',
            imageUrl: '',
            pokemonIndex: '',
            imageLoading: true,
            toManyRequests: false
        };
    }

    componentDidMount = () => {
        const {name, url} = this.props;

        const positionIndex = url.split('/').length-2;
        const pokemonIndex = url.split('/')[positionIndex];

        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        this.setState({
            name: name,
            imageUrl: imageUrl,
            pokemonIndex: pokemonIndex
        })
    };

    render(){
        const {name, imageUrl, pokemonIndex, imageLoading, toManyRequests} = this.state;

        return(
            <Col xs={12} sm={6} md={3}>
                <Link to={`list/pokemon/${pokemonIndex}`} className={'link'}>
                    <Card className={'mt-5 card-list'}>
                        <Card.Header>
                            {pokemonIndex}
                        </Card.Header>
                        <Card.Body className={'center'}>
                            {
                                imageLoading ? (
                                    "Loading..."
                                ) : (
                                    null
                                )
                            }
                            <Card.Img className={'card-image-pokemon'}
                                      onLoad={()=> this.setState({imageLoading: false})}
                                      onError={()=> this.setState({toManyRequests: true})}
                                      src={imageUrl}
                                      style={
                                          toManyRequests ? {display: 'none'} : (imageLoading ? null : {display: 'block'})
                                      }
                            />
                            {
                                toManyRequests ? (
                                    <h6><span className={'badge badge-danger mt-2'}>To Many requests</span></h6>
                                ) : (
                                    null
                                )
                            }
                            <Card.Title>
                                {
                                    name.toLowerCase().split(' ').map(letter => {
                                        return letter.charAt(0).toUpperCase() + letter.substring(1);
                                    }).join(' ')
                                }
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        )
    }
}

export default PokemonCard;