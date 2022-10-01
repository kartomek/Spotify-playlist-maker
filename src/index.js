import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.sass';
import { AppProvider } from './AppProvider';
import { Container } from 'react-bootstrap'
import HomePage from './components/homePage/HomePage'

const rootElement = document.getElementById('root');

const app = (
        <AppProvider>
                <Container>
                        <HomePage />
                </Container>
        </AppProvider>
);

ReactDOM.render(app, rootElement);


