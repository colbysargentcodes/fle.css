# fle.css
**fle.css** is a CSS library of classes to simplify the creation of flex-based layouts.

The library can be generated through a javascript file with customisable options.

### Usage
1. Modify the `options` object in `fle.css.js` to your requirements.
2. Link the script in your HTML (it is recommended you place the script tag after your `body` element)
```
<script src='fle.css.js'></script>
```

## Options
All options are currenty required.
### prefix
`Type: String`

Prepended to all classes. The can be omitted, however this may cause issues.

### directionName
`Type: String`

Defines how direction classes are named (examples below). Valid options are `direction`, `from`, or `both`.

`direction` would use the class `.fc-direction-right` for a left to right flow.

`from` would use the class `.fc-from-left` for a left to right flow.

`both` would enable both types.

### breaks
`Type: Array of Objects`

Media query breakpoints to be generated. Each breakpoint object requires *prefix* and *size* string properties.

Currently, these breakpoints are not sorted prior to generation, therefore should be in ascending order.

## Key Files
### fle.css.js
The main script, with customisable options, this generates and appends the CSS library to the document's `head` element.

### fle.css-min.js
A minified version of `fle.css.js`

### fle.css
The base CSS library, generated using default options.