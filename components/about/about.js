import React from 'react';
import wrapperLibraries from './wrapper';

const About = () => {
    const sh3 = {
        'marginTop': '30px'
    };
    return (
        <React.Fragment>
            <h1 className={'mt-5'}>About Pokedex</h1>

            <h3 style={sh3}>What is this?</h3>
            <p>
                This website is built for learning purposes and you do not want to make a profit from pokeapi, it is only used for practical purposes.
                The site contains everything essential to react with good practices and relevant topics. Thank you
            </p>

            <h3 style={sh3}>Wrapper Libraries</h3>
            {
                wrapperLibraries.map((item, index) => <Test key={index} {...item}/>)
            }
        </React.Fragment>
    );
}

const Test = (props) => {
    return (
        <React.Fragment>
            <ul>
                <li>
                    <strong>{props.title}</strong>: {props.app} by <em>{props.by}</em>
                </li>
            </ul>
        </React.Fragment>
    )
} 

export default About;