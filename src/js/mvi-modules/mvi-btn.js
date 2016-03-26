import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {div, input, label, button, makeDOMDriver} from '@cycle/dom';
const O = Rx.Observable;


export default function btn(opt) {
    return function(){

        // Takes the DOM interface to the outside world and returns
        function selectIntent(DOMSource) {
            return DOMSource.select('.menu-btn').events('click')
                .map(ev => ev.target.value);
        }

        function model(intent$) {
            return O.combineLatest(
                intent$.startWith(70),
                (value) => {
                    console.log("value is ... ", value);
                    return {value};
                }
            );
        }

        function view(state$) {
            return state$.map(state =>
                div([
                    div([
                        label('MVIMod:: Property: ' + state.value + 'amounts'),
                        input('.prop', {type: 'range', min: 40, max: 150, value: state.value})
                    ])
                ])
            );
        }

        function main(sources) {
            return {
                DOM: view(model(selectIntent(sources.DOM)))
            };
        }

        const drivers = {
            DOM: makeDOMDriver(opt.el)
        };

        Cycle.run(main, drivers);

    };



}

