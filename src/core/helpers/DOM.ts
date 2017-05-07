import * as ReactDOM from 'react-dom';

namespace DOM {
	export function animateElement(ref: any, callback: Function = null, delay = 500, type = 'opacity') {
        const elem = ReactDOM.findDOMNode(ref);
        if (elem instanceof HTMLElement) {
            // Set the opacity of the element to 0
            elem.style.opacity = '0';	// eslint-disable-line immutable/no-mutation		
            setTimeout(() => {
                window.requestAnimationFrame(() => {
                    // Now set a transition on the opacity
                    elem.style.transition = `opacity ${delay}ms`;	// eslint-disable-line immutable/no-mutation
                    // and set the opacity to 1
                    elem.style.opacity = '1';	// eslint-disable-line immutable/no-mutation		
                });
                if (typeof callback === 'function') {
                    callback();
                }
            }, 150);
        } 
        else {
            if (typeof callback === 'function') {
                callback();
            }
            return;
        }            
    }
}

export default DOM;
