import React from 'react';
import ReactDOM from 'react-dom';

export default class Layout extends React.Component {
    render() {
        return (
            <h1>Hello World!</h1>
        );
    }
}

ReactDOM.render(<Layout/>, document.getElementById('app'));
