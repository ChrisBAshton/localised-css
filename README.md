# Localised CSS

A work in progress. But the idea is this:

```css
.list li {
    display: block;
}

@media only local and (min-width: 400px) {
    .list li {
        display: inline;
    }
}
```

Just include the script (and jQuery - we have a jQuery dependency at the moment):

`<script src="localised-css.min.js"></script>`

## Bugs and caveats

* UNFINISHED - localised media queries are currently not parsed, I've hard-coded an example return value but that's it. Contributions are welcome.
* Stylesheets must be loaded from the same domain, otherwise JavaScript can't access the stylesheet contents.
* If a localised media query sets a static width, there's a risk of infinite looping (e.g. child is set to be 400px wide if its container is less than 300px wide. This naturally makes the container 400px wide, meaning we remove the child's 400px wide style on the next render, meaning the container becomes less than 300px wide again, and so on...)
* CSS only applied on page load, so site might look funky for a moment before localised CSS is loaded.
* Slow. Every re-render requires measuring the width of individual elements, DOM manipulation, etc. Untested on large sites.

## Instructions for testing

Needs to run from a server:

`python -m SimpleHTTPServer`

Go to http://localhost:8000/example/ to see it in action.