import React from 'react';

const errorNotFount = () => {
    const sh1 = {
        'marginTop':'50px',
        'fontSize':'200px'
    }
    const sp = {
        'fontSize':'50px'
    }
    return (
        <React.Fragment>
            <center>
                <p style={sh1}>404</p>
                <p style={sp}>No encontrado :(</p>
            </center>
        </React.Fragment>
    );
}

export default errorNotFount;