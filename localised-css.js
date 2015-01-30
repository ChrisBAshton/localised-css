;(function () {

    "use strict";

    function init() {
        var css = getLocalisedCss();

        applyLocalisedCss(css);
        window.setInterval(function () {
            applyLocalisedCss(css);
        }, 100);
    }

    function getLocalisedCss() {
        var stylesheets = document.styleSheets,
            rules,
            rule,
            localisedCss = [];
        for (var i = 0; i < stylesheets.length; i++) {
            rules = stylesheets[i].cssRules;
            for(var j in rules) {
                rule = rules[j].cssText;
                if (typeof rule !== 'undefined') {
                    console.log(rule);
                    if (rule.indexOf('@media only local') !== -1) {
                        localisedCss.push(processLocalisedCssRule(rule));
                    }
                }
            }
        }
        return localisedCss;
    }

    function applyLocalisedCss(css) {
        for (var i = 0; i < css.length; i++) {
            $(css[i].container).each(function () {
                var container = $(this),
                    child     = container.find(css[i].child),
                    containerWidth;

                if(child.length > 0) {
                    // only do the expensive width calculation if there is actually a child element to apply rules to
                    containerWidth = container.outerWidth();
                
                    if ( (css[i].maxWidth) && (containerWidth > css[i].condition) || (css[i].minWidth) && (containerWidth < css[i].condition)) {
                        child.attr('style', css[i].style);
                    }
                    else {
                        child.attr('style', '');
                    }
                }
            });
        }
    }

    function processLocalisedCssRule(rule) {
        // need to process the rule
        console.log(rule);

        // for now, we hardcode it
        return {
            container: '.list',
            child:     'li',
            style:     'display: inline;',
            maxWidth:  true,
            minWidth:  false,
            condition: '400'
        };
    }

    $(document).ready(init);

}());