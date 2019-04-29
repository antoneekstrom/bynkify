import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography'

export class Text extends Component<any, any> {
    render() {
        return (
            <Typography component="p" variant="body2">{this.props.children}</Typography>
        );
    }
}

export class TextLarge extends Component<any, any> {
    render() {
        return (
            <Typography component="p" variant="h5">{this.props.children}</Typography>
        );
    }
}

export class HeaderSmall extends Component<any, any> {
    render() {
        return (
            <Typography component="h3" variant="h3"></Typography>
        );
    }
}

export class HeaderMedium extends Component<any, any> {
    render() {
        return (
            <Typography component="h2" variant="h2">{this.props.children}</Typography>
        );
    }
}

export class HeaderLarge extends Component<any, any> {
    render() {
        return (
            <Typography component="h1" variant="h1">{this.props.children}</Typography>
        );
    }
}