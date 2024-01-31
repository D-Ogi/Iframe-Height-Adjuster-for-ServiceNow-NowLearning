// ==UserScript==
// @name         Iframe Height Adjuster for ServiceNow NowLearning
// @namespace    http://tampermonkey.net/dawidogi
// @version      0.1
// @description  Adjust iframe height on ServiceNow Learning pages
// @author       D-Ogi
// @match        https://nowlearning.servicenow.com/lxp/en/pages/learning-course*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    // Default iframe height
    let iframeHeight = '79em';

    // Function to update iframe height
    function updateIframeHeight(newHeight) {
        iframeHeight = newHeight;
        GM_addStyle('.scorm-iframe { height: ' + iframeHeight + ' !important; }');
    }

    // Add menu command to change iframe height
    GM_registerMenuCommand('Set Iframe Height', function() {
        const userHeight = prompt('Enter new iframe height (e.g., 79em):', iframeHeight);
        if (userHeight) {
            updateIframeHeight(userHeight);
        }
    });

    // Initial style injection
    updateIframeHeight(iframeHeight);

    // MutationObserver to handle dynamic iframe loading
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeName === 'IFRAME' && node.classList.contains('scorm-iframe')) {
                        updateIframeHeight(iframeHeight);
                    }
                });
            }
        });
    });

    // Start observing the body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });
})();
