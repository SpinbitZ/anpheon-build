import Cycle from '@cycle/core';
import * as Rx from 'rx';
import {div, input, label, h2, makeDOMDriver} from '@cycle/dom';
const O = Rx.Observable;

import mod from './mvi-modder';


export default function bmiCalc(opt) {
    console.log("bmi-calc-mvimod.js");
    return function () {
        var intent = function (DOMSource) {
            const changeWeight$ = DOMSource.select('.weight').events('input')
                .map(ev => ev.target.value);
            const changeHeight$ = DOMSource.select('.height').events('input')
                .map(ev => ev.target.value);
            return {changeWeight$, changeHeight$};
        };
        var model = function (changeWeight$, changeHeight$) {
            return O.combineLatest(
                changeWeight$.startWith(70),
                changeHeight$.startWith(170),
                (weight, height) => {
                    const heightMeters = height * 0.01;
                    const bmi = Math.round(weight / (heightMeters * heightMeters));
                    return {bmi, weight, height};
                }
            );
        };
        var view = function (state$) {
            return state$.map(state =>
                div([
                    div([
                        label('Weight: ' + state.weight + 'kg'),
                        input('.weight', {type: 'range', min: 40, max: 150, value: state.weight})
                    ]),
                    div([
                        label('Height: ' + state.height + 'cm'),
                        input('.height', {type: 'range', min: 140, max: 220, value: state.height})
                    ]),
                    h2('BMI is ' + state.bmi)
                ])
            );
        };

        mod({model: model, view: view, intent: intent, el: opt.el});

        //
        //function main(sources) {
        //    const {changeWeight$, changeHeight$} = intent(sources.DOM);
        //    const state$ = model(changeWeight$, changeHeight$);
        //    const vtree$ = view(state$);
        //
        //    //view(model(intent(sources.DOM)))
        //
        //    return {
        //        DOM: vtree$
        //    };
        //}
        //
        //const drivers = {
        //    DOM: makeDOMDriver(opt.el)
        //};
        //Cycle.run(main, drivers);

    };


}