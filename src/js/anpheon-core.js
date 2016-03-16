import mviMod from './mvi-modules/bmi-calc-mvimod.js';
import checkbox from './mvi-modules/checkbox.js';

mviMod({el:'#bmi-calc'})();
mviMod({el:'#bmi-calc2'})();




var check1 = checkbox({el:'#checkbox'});
var check2 = checkbox({el:'#checkbox2'});

check2();
check1();

