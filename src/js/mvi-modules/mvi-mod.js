import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {div, input, label, makeDOMDriver} from '@cycle/dom';
const O = Rx.Observable;


export default function mviMod(opt) {
    return function(){

        // Takes the DOM interface to the outside world and returns
        function intent(DOMSource) {
            return DOMSource.select('.prop').events('input')
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
                        label('Property: ' + state.value + 'amounts'),
                        input('.prop', {type: 'range', min: 40, max: 150, value: state.value})
                    ])
                ])
            );
        }

        function main(sources) {
            return {
                DOM: view(model(intent(sources.DOM)))
            };
        }

        const drivers = {
            DOM: makeDOMDriver(opt.el)
        };

        Cycle.run(main, drivers);

    };



}

