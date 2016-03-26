import Cycle from '@cycle/core';
import {makeDOMDriver, div, input, p, button} from '@cycle/dom';
import * as Rx from 'rx';
const O = Rx.Observable;


/**
 *
 import btnMaker from './mvi-modules/menubutton.js';

 btnMaker('#topmenu')('HOME');

 //or

 const topMenu = btnMaker({el:'#top-menu'});

 const homeBtn = topMenu('home'}

 * @returns {Function}
 * @param el
 */

export default function menuButtonFactory(el) {

    // scope: el


    console.log("menuButtonFactory scope :: el is ... " + el);

    /**
     *hhjh
     *
     */
    return function menuButton(opt) {

        // scope: item

        //item = item | opt.item;
        //console.log("menuButton scope :: item is ... ", item);

        function main(drivers) {

            return {

                // DOM: view(model(intent(sources.DOM)))

                DOM: drivers.DOM.select('.menu-btn')

                    // intent -> selection
                    .events('click')
                    .map(ev => ev.target.checked)

                    // model -> state
                    .startWith(false)

                    // view -> selected
                    .map(selected =>
                        div({id: el}, [
                            button({
                                className: opt.btnClass + selected ? " selected" : "",
                                id: opt.id
                            }), opt.name
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


