---
---
# Hide address bar
setTimeout ->
  window.scrollTo 0, 1
, 0

# Mobile navigation
nav = document.querySelectorAll '.sidebar ul > li a'
nav2 = document.querySelector '.sidebar select'

for item in nav
    option = document.createElement 'option'
    option.text = item.innerHTML
    option.value = item.getAttribute 'href'
    nav2.appendChild option

root = exports ? this
root.mobileNav = (select) ->
  selectedOption = select.options[select.selectedIndex]
  window.location = selectedOption.value
