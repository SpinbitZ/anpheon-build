import Cycle from '@cycle/core';
import {div, input, label, makeDOMDriver} from '@cycle/dom';
import * as Rx from 'rx';
const O = Rx.Observable; //!!

/**
 *
 *
 *
 * @param opt {{el: string}}
 * @returns {Function}
 */

export default function scroller(opt) {

    console.log("scroller is ... ", opt);

    return function(){

        /////// Outside-in...IMV - processing side-effects --->  channeled through "/// DRIVERS".

        //// ->/////// INTENT-ACTION - Takes the DOM driver SOURCE interface to the outside intent and returns "input" mapped as value
        function intent(DOMSource) {
            return DOMSource.select(opt.el)
                .events('scroll')
                .map(e => {
                    console.log("e is ... ", e);
                    return e.target.scrollTop;
                });
        }

        ///// MODEL-STATE - (no side effects)
        function model(actions) {

            console.log("actions is ... ", actions);
            //let tableHeight$ = O.just(500);
            //let rowHeight$ = O.just(30);
            //let columns$ = O.just(['ID', 'ID * 10', 'Random Number']);
            //let rowCount$ = O.just(10000);
            let scrollTop$ = actions.startWith(0);
            //let visibleIndices$ = makeVisibleIndices$(
            //    tableHeight$, rowHeight$, rowCount$, scrollTop$
            //);
            let state$ = O.combineLatest(
                scrollTop$,
                (scrolltop) =>
                    {
                        console.log("model: scrolltop is ... ", scrolltop);
                    }
            );
            return state$;
        }

        ///// VIEW-TREE - render state - (still no side-effects) ---> //// vTree$
        function view(state$) {
            console.log("view: state$ is ... ", state$);
            return state$.map(state =>
                div({id:opt.el},[
                    div([
                        label('mvi-mod:: Property: ' + state.value + 'amounts'),
                        input('.prop', {type: 'range', min: 40, max: 150, value: state.value})
                    ])
                ])

            );
        }



        /////// IO-CYCLE- -> i/o - source/sink -->  mvi cycle, and DOM-link - for interfacing with side-effects or /// DRIVERS
        function MAIN(SOURCES) {
            return {
                DOM: view(model(intent(SOURCES.DOM)))
            };
        }

        /////// /////// SIDE-EFFECTS  --- in and out ... through drivers
        const DRIVERS = {
            //// SINKS --->
            DOM: makeDOMDriver('body') // eg. "#main"
        };

        //// one-function api
        Cycle.run(MAIN, DRIVERS);


    };

}


