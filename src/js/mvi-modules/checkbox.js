import Cycle from '@cycle/core';
import {makeDOMDriver, div, input, p} from '@cycle/dom';

export default function (opt) {
    return function(){
        function main(drivers) {
            return {
                DOM: drivers.DOM.select('input').events('click')
                    .map(ev => ev.target.checked)
                    .startWith(false)
                    .map(toggled =>
                        div([
                            input({type: 'checkbox'}), 'Toggle me',
                            p(toggled ? 'ON' : 'off')
                        ])
                    )
            };
        }
        const drivers = {
            DOM: makeDOMDriver(opt.el)
        };
        Cycle.run(main, drivers);
    };
};


