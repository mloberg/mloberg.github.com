---
---
# Hide address bar
setTimeout ->
  window.scrollTo 0, 1
, 0

# Mobile navigation
nav = $$('.sidebar ul > li')
nav2 = $$('.sidebar select')

nav.each (item, index) ->
  item = item.getFirst 'a'
  text = item.get('text')
  nav2.adopt new Element 'option', {
    value: item.get('href'),
    html: text.charAt(0).toUpperCase() + text.slice(1)
  }

$$('.sidebar select').addEvent 'change', ->
  selected = this.getElement(':selected')
  window.location = selected.get('value')
