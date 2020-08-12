import React, {Component} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getPoke, getPokeSpecies } from './services';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

class Pokemon extends Component{
    constructor(...props){
        super(...props);

        this.state = {
            name: '',
            pokemonIndex: ',',
            imageUrl: '',
            types: [],
            description: '',
            stats: {
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                specialAttack: '',
                specialDefense: ''
            },
            height: '',
            weight: '',
            eggGroups: '',
            abilities: '',
            genderRatioMale: '',
            genderRatioFemale: '',
            catchRate: '',
            evs: '',
            hatchSteps: ''
        };
    }

    componentDidMount = () => {
        const { pokemonIndex } = this.props.match.params;

        //Get pokemon pokemonUrl
        getPoke(pokemonIndex)
            .then(res => {
                let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

                res.stats.map(stat => {
                    switch(stat.stat.name){
                        case 'hp':
                            hp = stat.base_stat;
                        break;
                        case 'attack':
                            attack = stat.base_stat;
                        break;
                        case 'defense':
                            defense = stat.base_stat;
                        break;
                        case 'speed':
                            speed = stat.base_stat;
                        break;
                        case 'special-attack':
                            specialAttack = stat.base_stat;
                        break;
                        case 'special-defense':
                            specialDefense = stat.base_stat;
                        break;
                        default:
                            hp = stat.base_stat;
                        break;
                    }
                });

                const height = Math.round((res.height * 0.3328084 +0.001) * 100) / 100;
                const weight = Math.round((res.weight * 0.220462 +0.001) * 100) / 100;
                const types = res.types.map(type => type.type.name);
                const abilities = res.abilities.map(ability => {
                    return ability.ability.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                });
                const evs = res.stats.filter(stat => {
                    if(stat.effort > 0){
                        return true;
                    }
                    return false;
                }).map(stat => {
                    return `${stat.effort} ${stat.stat.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}`
                }).join(', ');

                this.setState({
                    name: res.name,
                    imageUrl: res.sprites.front_default,
                    pokemonIndex,
                    types,
                    stats: {
                        hp,
                        attack,
                        defense,
                        speed,
                        specialAttack,
                        specialDefense
                    },
                    height,
                    weight,
                    abilities,
                    evs
                });
            })
            .catch(err => {
                console.log(err)
            })

        //Get pokemon pokemonSpeciesUrl
        getPokeSpecies(pokemonIndex)
            .then(res => {
                var description = '';
                res.flavor_text_entries.some(flavor => {
                    if(flavor.language.name === 'en'){
                        description = flavor.flavor_text;
                    }
                });
                const femaleRate = res.gender_rate;
                const genderRatioFemale = 12.5 * femaleRate;
                const genderRatioMale = 12.5 * (8 - femaleRate);
                const catchRate = Math.round((100 / 255) * res.capture_rate);
                const eggGroups = res.egg_groups.map(group => {
                    return group.name.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
                }).join(', ');
                const hatchSteps = 255 * (res.hatch_counter + 1);

                this.setState({
                    description,
                    genderRatioFemale,
                    genderRatioMale,
                    catchRate,
                    eggGroups,
                    hatchSteps
                })
            })
            .catch(err => {
                console.log(err)
            })
    };

    render(){
        const {name, pokemonIndex, imageUrl, types, description, stats, height, weight, eggGroups, abilities, genderRatioMale, genderRatioFemale, catchRate, evs, hatchSteps} = this.state;

        return(
            <Container>
                <Row>
                    <Col>
                        <Card className={'pokemon-card'}>
                            <Card.Header>
                                <Row>
                                    <Col xs={5}>
                                        <h5>{pokemonIndex}</h5>
                                    </Col>
                                    <Col xs={7}>
                                        <div className={'float-right'}>
                                            {
                                                types.map(type => (
                                                    <span key={type}
                                                          className={'badge badge-primary badge-pill mr-1'}
                                                          style={{
                                                              backgroundColor: `#${TYPE_COLORS[type]}`,
                                                              color: 'white'
                                                          }}>
                                                    {type}
                                                </span>
                                                ))
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row className={'align-items-center'}>
                                    <Col md={3}>
                                        <Card.Img src={imageUrl}
                                                  className={'card-img-top rounded mx-auto mt-2'}
                                        />
                                    </Col>
                                    <Col md={9}>
                                        <h4 className={'mx-auto'}>
                                            {
                                                name.toLowerCase().split(' ').map(s => {
                                                    return s.charAt(0).toUpperCase() + s.substring(1);
                                                }).join(' ')
                                            }
                                        </h4>
                                        <Row className={'align-items-center'}>
                                            <Col md={3}>HP</Col>
                                            <Col md={9}>
                                                <div className="progress">
                                                    <div className={'progress-bar'}
                                                         role={'progress-bar'}
                                                         style={{
                                                             width: `${stats.hp}%`
                                                         }}
                                                         aria-valuenow={'25'}
                                                         aria-valuemin={'0'}
                                                         aria-valuemax={'100'}
                                                    >
                                                        <small>{stats.hp}</small>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={'align-items-center'}>
                                            <Col md={3}>Attack</Col>
                                            <Col md={9}>
                                                <div className="progress">
                                                    <div className={'progress-bar'}
                                                         role={'progress-bar'}
                                                         style={{
                                                             width: `${stats.attack}%`
                                                         }}
                                                         aria-valuenow={'25'}
                                                         aria-valuemin={'0'}
                                                         aria-valuemax={'100'}
                                                    >
                                                        <small>{stats.attack}</small>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={'align-items-center'}>
                                            <Col md={3}>Defense</Col>
                                            <Col md={9}>
                                                <div className="progress">
                                                    <div className={'progress-bar'}
                                                         role={'progress-bar'}
                                                         style={{
                                                             width: `${stats.defense}%`
                                                         }}
                                                         aria-valuenow={'25'}
                                                         aria-valuemin={'0'}
                                                         aria-valuemax={'100'}
                                                    >
                                                        <small>{stats.defense}</small>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={'align-items-center'}>
                                            <Col md={3}>Speed</Col>
                                            <Col md={9}>
                                                <div className="progress">
                                                    <div className={'progress-bar'}
                                                         role={'progress-bar'}
                                                         style={{
                                                             width: `${stats.speed}%`
                                                         }}
                                                         aria-valuenow={'25'}
                                                         aria-valuemin={'0'}
                                                         aria-valuemax={'100'}
                                                    >
                                                        <small>{stats.speed}</small>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={'align-items-center'}>
                                            <Col md={3}>Special Attack</Col>
                                            <Col md={9}>
                                                <div className="progress">
                                                    <div className={'progress-bar'}
                                                         role={'progress-bar'}
                                                         style={{
                                                             width: `${stats.specialAttack}%`
                                                         }}
                                                         aria-valuenow={'25'}
                                                         aria-valuemin={'0'}
                                                         aria-valuemax={'100'}
                                                    >
                                                        <small>{stats.specialAttack}</small>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className={'align-items-center'}>
                                            <Col md={3}>Special Defense</Col>
                                            <Col md={9}>
                                                <div className="progress">
                                                    <div className={'progress-bar'}
                                                         role={'progress-bar'}
                                                         style={{
                                                             width: `${stats.specialDefense}%`
                                                         }}
                                                         aria-valuenow={'25'}
                                                         aria-valuemin={'0'}
                                                         aria-valuemax={'100'}
                                                    >
                                                        <small>{stats.specialDefense}</small>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Row>
                                        <Col>
                                            <p className={'p-2'}>{description}</p>
                                        </Col>
                                    </Row>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5 className={'center'}>Profile</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <h6 className={'float-right'}>Height:</h6>
                                            </Col>
                                            <Col md={6}>
                                                <h6 className={'float-left'}>{height} ft.</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <h6 className={'float-right'}>Egg Groups:</h6>
                                            </Col>
                                            <Col md={6}>
                                                <h6 className={'float-left'}>{eggGroups}</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <h6 className={'float-right'}>Weight:</h6>
                                            </Col>
                                            <Col md={6}>
                                                <h6 className={'float-left'}>{weight} lbs.</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <h6 className={'float-right'}>Hatch Steps:</h6>
                                            </Col>
                                            <Col md={6}>
                                                <h6 className={'float-left'}>{hatchSteps}</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <h6 className={'float-right'}>Catch Rate:</h6>
                                            </Col>
                                            <Col md={6}>
                                                <h6 className={'float-left'}>{catchRate}%</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <h6 className={'float-right'}>Abilities:</h6>
                                            </Col>
                                            <Col md={6}>
                                                <h6 className={'float-left'}>{abilities}</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <h6 className={'float-right'}>Gender Ratio:</h6>
                                            </Col>
                                            <Col md={6}>
                                                <div className='progress'>
                                                    <div className='progress-bar'
                                                         role={'progressbar'}
                                                         style={{
                                                             width: `${genderRatioFemale}%`,
                                                             backgroundColor: '#C2185B'
                                                         }}
                                                         aria-valuenow={'15'}
                                                         aria-valuemin={'0'}
                                                         aria-valuemax={'100'}>
                                                        <small>{genderRatioFemale}</small>
                                                    </div>
                                                    <div className='progress-bar'
                                                         role={'progressbar'}
                                                         style={{
                                                             width: `${genderRatioMale}%`,
                                                             backgroundColor: '#1976D2'
                                                         }}
                                                         aria-valuenow={'30'}
                                                         aria-valuemin={'0'}
                                                         aria-valuemax={'100'}>
                                                        <small>{genderRatioMale}</small>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <h6 className={'float-right'}>Evs:</h6>
                                            </Col>
                                            <Col md={6}>
                                                <h6 className={'float-left'}>{evs}</h6>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Pokemon;