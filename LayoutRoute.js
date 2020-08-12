import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class LayoutRoute extends Component{
    constructor(...props){
        super(...props);
    }

    render(){
        const {component: Component, ...rest} = this.props;
        console.log(this.props)

        return(
            <Route {...rest} render={matchProps => (
                !!this.props.homeReducer.name && !!this.props.homeReducer.quantity
                ? (
                    <Component {...matchProps}/>
                ): (
                    <Redirect to='/' />
                )
            )} />
        )
    }
}

const mapStateToProps = state => ({
    homeReducer: state.homeReducer
});

export default connect(
    mapStateToProps,
    null
)(LayoutRoute);