import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
//import 'whatwg-fetch';

window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};