//import Cycle from '@cycle/core';
//import {makeDOMDriver, div, input, p} from '@cycle/dom';
//
//function main(drivers) {
//    return {
//        DOM: drivers.DOM.select('canvas').events('click')
//            .map(ev => {
//                    "use strict";
//                    console.log("ev is ... ", ev);
//                    div('#canvas-id', [
//                        canvas("some canvas?")
//                    ])
//                }
//            )
//            .startWith({bob: "dobbs"})
//    };
//}
//
//const drivers = {
//    DOM: makeDOMDriver('#topnav-hero')
//};
//
//Cycle.run(main, drivers);