(function(){
    'use strict';

    var leagues = {
        noob: 16,
        unrank: 32,
        bronze: {
            i: 112,
            ii: 96,
            iii: 80,
            iv: 64,
            v: 48
        },
        silver:{
            i: 192,
            ii: 176,
            iii: 160,
            iv: 144,
            v: 128
        },
        gold:{
            i: 272,
            ii: 256,
            iii: 240,
            iv: 224,
            v: 208
        },
        platinum:{
            i: 352,
            ii: 336,
            iii:320,
            iv: 304,
            v: 288
        },
        diamond:{
            i: 432,
            ii: 416,
            iii: 400,
            iv: 384,
            v: 368
        },
        master: 448,
        challenger: 464
    };

    angular
    .module('lolTot.singup')
    .constant('leagues', leagues)
    .value('maxPoints', 1200);

})();
