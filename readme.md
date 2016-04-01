# Equalize Text Width

This is an interesting plugin for designers. The idea is quite simple: get some element with more then one line of text and make all lines fill the full width of the element, changing the font size. 

### Sample code:

How to use it:
```javascript
$(function(){
  // equalizes the text inside element
  $('h1').equalizeTextWidth();
  // equalizes the text inside element by text width
  $('h1').equalizeTextWidth('text');
  // equalizes the text inside element by text width, extending the element, if necessary
  $('h1').equalizeTextWidth('text', true);
  // undo what was done
  $('h1').equalizeTextWidth('undo');
});
```

This is [on GitHub](https://github.com/caugbr/equalize-text-width/)
