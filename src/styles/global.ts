import { createGlobalStyle } from "styled-components";
import githubBackoground from '../assets/githubbackground.svg';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body{
        background: #F0F0F5 url(${githubBackoground}) no-repeat 70% top;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font: 16px Roboto, sans-serif;
    }

    #root {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;

    }

    button {
        cursor: pointer;
    }

`;
