import React from 'react';
import Auth from '../auth/auth.js';
import { Link } from 'react-router-dom'

import { Header } from 'semantic-ui-react';


const Banner = () => {

    return (
        <div id='header'>
            <Link to='/'>
                <Header id='header_title' sub>Social Club, a modern web forum.</Header>
            </Link>
            <Auth />
        </div>
    )
};

export default Banner;