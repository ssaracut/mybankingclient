import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};