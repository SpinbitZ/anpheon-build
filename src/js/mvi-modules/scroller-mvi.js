import Cycle from '@cycle/core';
import {div, input, label,p, makeDOMDriver} from '@cycle/dom';
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

    return function (opt2) {

        console.log("(opt2) is ... ", (opt2));

        /////// Outside-in...IMV - processing side-effects --->  channeled through "/// DRIVERS".

        /////// input-first (sensor) DOM source

        //// -_-> /////// INTENT-ACTION - Takes the DOM driver SOURCE interface to the outside intent and returns "input" mapped as value
        function intent(DOMBody) {
            console.log("DOMBody is ... ", DOMBody);
            return DOMBody.select("#" + opt.el)
                .events('scroll')
                .map(e => {
                    console.log("e is ... ", e);
                    return e.target.scrollTop;
                });
        }

        ///// MODEL-STATE - (no side effects)
        function model(scrollAction$) {

            console.log("scrollAction$ is ... ", scrollAction$);
            let scrollTop$ = scrollAction$.startWith(0);
            let state$ = O.combineLatest(
                scrollTop$,
                (scrolltop) => {
                    console.log("model: scrolltop is ... ", scrolltop);
                    return scrolltop;
                }
            );
            return state$;
        }


        /////// output-last (effector) DOM write or sink

        ///// VIEW-TREE - render state - effector - rendering visual (sink) output for side-effects in the real world
        function view(scrollState$) { /////// ---> //// vTree output to DOM driver
            console.log("view: scrollState$ is ... ", scrollState$);
            return scrollState$.map(state => {
                console.log("state is ... ", state);
                //---> DIV has to match in selection with makeDOMDriver in the run Cycle
                return div({id: opt.el}, [
                    div({id:"screen"},[
                        p("scroll: " + state)
                    ])
                ]);
            });

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
            DOM: makeDOMDriver("#" + opt.el) // eg. "#main"
        };

        //// one-function api
        Cycle.run(MAIN, DRIVERS);


    };

}

/*

 function main(DOMBody) {

 //// -_-> /////// INTENT-ACTION - Takes the DOM driver SOURCE interface to the outside intent and returns "input" mapped as value
 return DOMBody.select(opt.el)
 .events('scroll')
 .map(e => {
 console.log("e is ... ", e);
 return e.target.scrollTop;
 })

 ///// MODEL-STATE - (no side effects)
 .startWith(0)
 .map((scrolltop) => {
 console.log("model: scrolltop is ... ", scrolltop);
 return scrolltop;
 })

 ///// VIEW-TREE - render state - effector - rendering visual (sink) output for side-effects in the real world
 .map(state => {
 console.log("state is ... ", state);
 //---> DIV
 return div({id: opt.el}, [
 div([
 label('mvi-mod:: Property: ' + state + 'amounts'),
 input('.prop', {type: 'range', min: 40, max: 150, value: state})
 ])
 ])
 });
 }

 */
