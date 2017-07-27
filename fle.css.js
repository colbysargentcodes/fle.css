/* 
  fle.css (v0.1.0) by Colby Sargent
  github.com/colbysargentdesign/fle.css
  
  it is recommended that only the options object is modified
*/
(function () {
  
  var options = {
    prefix: 'fc', // can be omitted, but this can cause issues
    directionName: 'direction', // 'direction', 'from' or 'both' - Name used for direction classes e.g. .fc-direction-right or .fc-from-left
    breaks: [ // currently not sorted. correct order (ascending) required. mobile-first style used (min-width media queries).
      {
        prefix: 'xs',
        size: '320px'
      },
      {
        prefix: 'sm',
        size: '480px'
      },
      {
        prefix: 'md',
        size: '768px'
      },
      {
        prefix: 'lg',
        size: '992px'
      },
      {
        prefix: 'xl',
        size: '1200px'
      }
    ]
  },
    rules = [
      {
        className: 'flex',
        style: 'display:flex'
      },
      {
        className: 'inline-flex',
        style: 'display:inline-flex'
      },
      {
        className: 'noflex',
        style: 'display:initial'
      },
      {
        className: 'fill',
        style: 'flex-grow:1'
      },
      {
        className: 'nofill',
        style: 'flex-grow:0'
      },
      {
        className: 'wrap',
        style: 'flex-wrap:wrap'
      },
      {
        className: 'wrap-reverse',
        style: 'flex-wrap:wrap-reverse'
      },
      {
        className: 'nowrap',
        style: 'flex-wrap:nowrap'
      },
      {
        className: getDirections('right'),
        style: 'flex-direction:row'
      },
      {
        className: getDirections('left'),
        style: 'flex-direction:row-reverse'
      },
      {
        className: getDirections('down'),
        style: 'flex-direction:column'
      },
      {
        className: getDirections('up'),
        style: 'flex-direction:column-reverse'
      }
    ],
    alignmentRules = {
      justify: [
        {
          style: 'justify-content:flex-start',
          defaultFor: ['right', 'left', 'down', 'up'],
          rules: {
            right: 'left',
            left: 'right',
            up: 'bottom',
            down: 'top'
          }
        },
        {
          style: 'justify-content:center',
          rules: {
            right: 'center',
            left: 'center',
            up: 'center',
            down: 'center'
          }
        },
        {
          style: 'justify-content:flex-end',
          rules: {
            right: 'right',
            left: 'left',
            up: 'top',
            down: 'bottom'
          }
        },
        {
          style: 'justify-content:space-around',
          rules: {
            right: 'space-around',
            left: 'space-around',
            up: 'space-around',
            down: 'space-around'
          }
        },
        {
          style: 'justify-content:space-between',
          rules: {
            right: 'space-between',
            left: 'space-between',
            up: 'space-between',
            down: 'space-between'
          }
        }
      ],
      align: [
        {
          style: 'align-items:flex-start',
          rules: {
            right: 'top',
            left: 'top',
            up: 'left',
            down: 'left'
          }
        },
        {
          style: 'align-items:center',
          rules: {
            right: 'center',
            left: 'center',
            up: 'center',
            down: 'center'
          }
        },
        {
          style: 'align-items:flex-end',
          rules: {
            right: 'bottom',
            left: 'bottom',
            up: 'right',
            down: 'right'
          }
        },
        {
          style: 'align-items:stretch',
          defaultFor: ['right', 'left', 'down', 'up'],
          rules: {
            right: 'stretch',
            left: 'stretch',
            up: 'stretch',
            down: 'stretch'
          }
        },
        {
          style: 'align-items:baseline',
          rules: {
            right: 'baseline',
            left: 'baseline',
            up: 'baseline',
            down: 'baseline'
          }
        }
      ]
    },
    fromDirections = {
      right: 'left',
      left: 'right',
      down: 'top',
      up: 'bottom'
    },
    otherDirections = {
      right: ['left', 'up', 'down'],
      left: ['right', 'up', 'down'],
      down: ['up', 'right', 'left'],
      up: ['down', 'right', 'left']
    };
  
  function getDirections(direction) {
    var directionReturn = [];
    if (typeof direction == 'string') {
      if (options.directionName == 'both' || options.directionName == 'direction')
        directionReturn.push('direction-' + direction);
      if (options.directionName == 'both' || options.directionName == 'from')
        directionReturn.push('from-' + fromDirections[direction]);
    }
    if (typeof direction == 'object' && Array.isArray(direction)) {
      for (var i = 0; i < direction.length; i++) {
        directionReturn = directionReturn.concat(getDirections(direction[i]));
      }
    }
    return directionReturn;
  }
  
  (function () {
    var fcTag = document.createElement('style'),
      fc = '';
    
    if (options.prefix.length > 0 && options.prefix.substr(-1) != '-')
      options.prefix += '-';
    
    function getClass(className, prefix, mergeClass) {
      var classReturn = [];
      if (typeof mergeClass == 'undefined')
        mergeClass = false;
      
      if (typeof className == 'string')
        return '.' + options.prefix + prefix + className;
      else if (typeof className == 'object' && Array.isArray(className))
        return '.' + options.prefix + prefix + className.join((mergeClass ? '' : ',' ) + '.' + options.prefix + prefix);
    }

    function getNot(className, prefix, wildcard) {
      var notReturn = [];
      if (typeof prefix != 'object')
        prefix = [prefix];
      if (typeof wildcard == 'undefined')
        wildcard = false;
      
      for (var i = 0; i < prefix.length; i++) {
        if (typeof className == 'string') {
          if (wildcard) notReturn.push(':not([' + wildcard + '*=' + options.prefix + prefix[i] + className + '])');
          else notReturn.push(':not(.' + options.prefix + prefix[i] + className + ')');
        }
        else if (typeof className == 'object' && Array.isArray(className)) {
          if (wildcard) notReturn.push(':not([' + wildcard + '*=' + options.prefix + prefix[i] + className.join(']):not([' + wildcard + '*=' + options.prefix + prefix[i]) + '])');
          else notReturn.push(':not(.' + options.prefix + prefix[i] + className.join('):not(.' + options.prefix + prefix[i]) + ')');
        }
      }
      
      return notReturn.join('');
    }
    
    for (var i = -1; i < options.breaks.length; i++) {
      var thisBreak = options.breaks[i],
          fcBreak = '',
          rightDirectionClass = getDirections('right'),
          leftDirectionClass = getDirections('left'),
          downDirectionClass = getDirections('down'),
          upDirectionClass = getDirections('up');
      
      if (thisBreak)
        thisBreak.prefix += '-';
      else
        thisBreak = {prefix: '', size: false};
      
      for (var x = 0; x < rules.length; x++) {
        var thisRule = rules[x];
        fcBreak += getClass(thisRule.className, thisBreak.prefix) + '{' + thisRule.style + '}';
      }
      
      var alignmentRulesKeys = Object.keys(alignmentRules);
      for (var x = 0; x < alignmentRulesKeys.length; x++) {
        if (alignmentRules.hasOwnProperty(alignmentRulesKeys[x])) {
          for (var y = 0; y < alignmentRules[alignmentRulesKeys[x]].length; y++) {
            var thisAlignment = alignmentRules[alignmentRulesKeys[x]][y],
              rlAxis = (alignmentRulesKeys[x] == 'justify' ? 'h' : 'v') + 'align-',
              duAxis = (alignmentRulesKeys[x] == 'align' ? 'h' : 'v') + 'align-',
              thisAlignmentSelectors = [];
            
            thisAlignmentSelectors.push(getClass(rlAxis + thisAlignment.rules.right, thisBreak.prefix) + getNot(getDirections(['left', 'down', 'up']), thisBreak.prefix));
            for (var d in rightDirectionClass) {
              thisAlignmentSelectors.push(getClass([rlAxis + thisAlignment.rules.right, rightDirectionClass[d]], thisBreak.prefix, true));
              thisAlignmentSelectors.push(getClass([rlAxis + thisAlignment.rules.left, leftDirectionClass[d]], thisBreak.prefix, true));
              thisAlignmentSelectors.push(getClass([duAxis + thisAlignment.rules.down, downDirectionClass[d]], thisBreak.prefix, true));
              thisAlignmentSelectors.push(getClass([duAxis + thisAlignment.rules.up, upDirectionClass[d]], thisBreak.prefix, true));
            }
            
            var activeBreaks = options.breaks.slice(0, i + 1);
            for (var b = activeBreaks.length - 2; b > -2; b--) {
              var bb = b < 0 ? 0 : 1;
              var activeBreak = activeBreaks[b],
                thisActiveBreaks = activeBreaks.slice(b < 0 ? 0 : b);
              thisActiveBreaks = thisActiveBreaks.map(function (ab) {return ab.prefix;});
              if (typeof activeBreak == 'undefined')
                activeBreak = '';
              else
                activeBreak = activeBreak.prefix;
              
              thisAlignmentSelectors[0] += getNot(getDirections(['left', 'down', 'up']), activeBreak);
              for (var d in rightDirectionClass) {
                //right
                thisAlignmentSelectors.push(getClass(rlAxis + thisAlignment.rules.right, thisBreak.prefix) + getClass(rightDirectionClass[d], activeBreak) + getNot(getDirections(otherDirections.right), thisActiveBreaks.slice(bb)));
                thisAlignmentSelectors.push(getClass(rlAxis + thisAlignment.rules.right, activeBreak) + getClass(rightDirectionClass[d], thisBreak.prefix));
                //left
                thisAlignmentSelectors.push(getClass(rlAxis + thisAlignment.rules.left, thisBreak.prefix) + getClass(leftDirectionClass[d], activeBreak) + getNot(getDirections(otherDirections.left), thisActiveBreaks.slice(bb)));
                thisAlignmentSelectors.push(getClass(rlAxis + thisAlignment.rules.left, activeBreak) + getClass(leftDirectionClass[d], thisBreak.prefix));
                //down
                thisAlignmentSelectors.push(getClass(duAxis + thisAlignment.rules.down, thisBreak.prefix) + getClass(downDirectionClass[d], activeBreak) + getNot(getDirections(otherDirections.down), thisActiveBreaks.slice(bb)));
                thisAlignmentSelectors.push(getClass(duAxis + thisAlignment.rules.down, activeBreak) + getClass(downDirectionClass[d], thisBreak.prefix));
                //up
                thisAlignmentSelectors.push(getClass(duAxis + thisAlignment.rules.up, thisBreak.prefix) + getClass(upDirectionClass[d], activeBreak) + getNot(getDirections(otherDirections.up), thisActiveBreaks.slice(bb)));
                thisAlignmentSelectors.push(getClass(duAxis + thisAlignment.rules.up, activeBreak) + getClass(upDirectionClass[d], thisBreak.prefix));
              }
            }
            if (thisAlignment.defaultFor && activeBreaks.length > 0) {
              var prevBreaks = activeBreaks.slice(0, -1).map(function (ab) {return ab.prefix;});
              prevBreaks.splice(0, 0, '');
              for (var d in rightDirectionClass) {
                thisAlignmentSelectors.push(getClass(rightDirectionClass[d], thisBreak.prefix) + getNot(rlAxis, prevBreaks, 'class'));
                thisAlignmentSelectors.push(getClass(leftDirectionClass[d], thisBreak.prefix) + getNot(rlAxis, prevBreaks, 'class'));
                thisAlignmentSelectors.push(getClass(downDirectionClass[d], thisBreak.prefix) + getNot(duAxis, prevBreaks, 'class'));
                thisAlignmentSelectors.push(getClass(upDirectionClass[d], thisBreak.prefix) + getNot(duAxis, prevBreaks, 'class'));
              }
            }
            
            fcBreak += thisAlignmentSelectors.join(',') + '{' + thisAlignment.style + '}';
          }
        }
      }
      
      fc += thisBreak.size ? '@media only screen and (min-width: ' + thisBreak.size + '){' + fcBreak + '}' : fcBreak;
    }
    
    fcTag.innerHTML = fc;
    document.head.appendChild(fcTag);
  }());
  
}());