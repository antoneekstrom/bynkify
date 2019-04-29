
// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// The app
import Bynkify from './bynkify/Application';

// Themes
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, green, orange } from '@material-ui/core/colors';

import CssBaseline from '@material-ui/core/CssBaseline';

/**
 * Main container.
 */
export class AppContainer extends Component<{application : JSX.Element}, any> {

    constructor(props) {
        super(props);
        const { classes } = props;
    }
    

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <div className="wrapper">{this.props.application}</div>
            </React.Fragment>
        );
    }
}

let app = (
    <AppContainer application={<Bynkify/>} />
);

// Render the Application
let element = document.getElementById("root");
ReactDOM.render(app, element);