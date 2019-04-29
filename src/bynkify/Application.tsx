import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { withTheme, createMuiTheme, MuiThemeProvider, FormHelperText, Grid, Card, CardContent, RadioGroup, Radio, Switch, FormControl, FormGroup, FormControlLabel, Checkbox, Input, InputLabel, FormLabel } from '@material-ui/core';
import { HeaderMedium, HeaderLarge, HeaderSmall, TextLarge } from '../components';
import { orange, blue, green, red } from '@material-ui/core/colors';
import { bynkify, BynkifyResult, defaultOptions, BynkifyOptions } from './bynkify';

const APPLICATION_NAME = "Bynkify";

const classes = {
    textField: "",
    button: "button",
    top: "container container-top",
    bottom: "container container-bottom",
    result: "container result"
}

const styles = {
    gradient: {
        color: 'white',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    }
}

/**
 * Theme used for Material UI.
 */
const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: orange,
        error: red,
    },
    typography: {
        useNextVariants: true
    }
});

class Application extends Component<any, {input : string, result : string, options : BynkifyOptions}> {

    constructor(props) {
        super(props);
        
        this.state = {
            input: undefined,
            result: undefined,
            options: defaultOptions
        }
    }

    processInput(input : string) {
        const result : BynkifyResult = bynkify(input, this.state.options);
        this.setState({
            result: result.output
        });
    }

    setOptions(options : BynkifyOptions) {
        this.setState({options: options});
    }

    render() {
        return (
            <Page>
                <Content>
                    <div className={classes.top}>
                        <Header/>
                        <Options onChange={(options) => this.setOptions(options)} />
                        <UserInput onChange={(input) => this.setState({input: input})} onConfirm={(input) => this.processInput(input)} />
                    </div>
                    <div className={classes.bottom}>
                        <ResultDisplay>{this.state.result}</ResultDisplay>
                    </div>
                </Content>
            </Page>
        );
    }
}

export class Options extends Component<{onChange : (options : BynkifyOptions) => void}, {frequency : string, replaceVerbs : boolean}> {

    constructor(props) {
        super(props);
        
        this.state = {
            frequency: defaultOptions.frequency.toFixed(2),
            replaceVerbs: defaultOptions.replaceVerbs
        };
    }
    

    onChange() {
        let options : BynkifyOptions = {
            frequency: parseFloat(this.state.frequency),
            replaceVerbs: this.state.replaceVerbs
        };
        this.props.onChange(options);
    }

    render() {
        return (
            <form noValidate autoComplete="off">
                <FormControl>
                    <FormGroup>
                        <FormControlLabel label="Replace Verbs" control={<Checkbox value={this.state.replaceVerbs} onChange={e => {this.onChange(); this.setState({replaceVerbs: e.target.checked})}} />} />
                    </FormGroup>
                </FormControl>
                <TextField
                    label="Text"
                    className={classes.textField}
                    value={this.state.frequency}
                    onChange={(e) => {this.onChange(); this.setState({frequency: e.target.value})}}
                    margin="normal"
                    variant="outlined"
                />
            </form>
        );
    }
}

class UserInput extends Component<{onConfirm : (input : string) => void, onChange ?: (input : string) => void}, {value : string}> {
    constructor(props) {
        super(props);
        
        this.state = {
            value: ''
        }
    }

    onChange(e) {

        this.setState({value: e.target.value});

        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    onConfirm() {
        this.props.onConfirm(this.state.value);
    }
    
    render() {
        return (
            <form noValidate autoComplete="off">
                <TextField
                    label="Text"
                    className={classes.textField}
                    value={this.state.value}
                    onChange={(e) => this.onChange(e)}
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows="5"
                    rowsMax="15"
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    style={styles.gradient}
                    className={classes.button}
                    fullWidth
                    onClick={() => this.onConfirm()}
                >Bynkify</Button>
            </form>
        );
    }
}

export class Content extends Component<any, any> {
    render() {
        return (
            <main>{this.props.children}</main>
        );
    }
}

export class ResultDisplay extends Component<any, any> {
    render() {
        return (
            <Card className={classes.result}>
                <CardContent className={classes.result}>
                    <TextLarge>{this.props.children}</TextLarge>
                </CardContent>
            </Card>
        );
    }
}

export class Header extends Component<any, any> {
    render() {
        return (
            <HeaderLarge>{APPLICATION_NAME}</HeaderLarge>
        );
    }
}

export class Page extends Component<any, any> {
    render() {
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme} >
                    <div className="application bynkify">{this.props.children}</div>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}


export default withTheme()(Application);