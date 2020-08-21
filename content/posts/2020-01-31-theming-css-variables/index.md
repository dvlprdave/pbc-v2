---
title: Theming with CSS variables
author: David Quick
date: 2020-01-31
hero: ./images/css-theme.jpg
excerpt: We'll look at CSS variables at a glance and then dive into a small project.
---

Out of pure meddling and frustration over being stuck on a project for a lot longer than expected, I learned quite a bit about CSS variables and how they allow us to make dynamic changes with ease.

We'll look at CSS variables at a glance and then dive into a small project I've created. The main focus is to showcase how CSS variables and JavaScript make a "dynamic" duo. 

### What are CSS Variables?

CSS variables are **"custom properties"** that act as a value for CSS declarations within your stylesheet. If you're familiar with preprocessors such as Sass and Less, then you'll get the hang of them instantly. If not, no worries. Just think **"dynamic variables"** and you'll get the hang of it. 

You create your CSS variables by using two hyphens `"--"` followed by the variable name, a colon `":"`, then the actual CSS value. The syntax looks like this:


```css
--main-color: #333;
```

### Where do I place all my CSS variables? 

Your CSS variables can be placed within any element, but it's common to put them within the `:root` element. This allows your variables to:

- have one central location
- have higher specificity as the `:root` targets the HTML element
- have global scope as opposed to local scope on a single element (not necessarily a bad thing)


```css
:root {
  --main-color: #333;
  --secondary-color: #444;
}
```

If you're curious about having locally scoped CSS variables, you can take a look at this awesome [article](https://css-tricks.com/breaking-css-custom-properties-out-of-root-might-be-a-good-idea/) discussing its advantages.

### How do I actually use them?

Let's say we want to set the background color of a specific `div`. Take the CSS variable name and wrap it within the `"var()"` function. You can then set it as the property value to a CSS declaration like so:

```css
div {
  background-color: var(--main-color);
}
```

### Fallbacks

You can give your CSS variables a fallback value in the event that your variable is invalid. Simply add a comma after the variable and then provide the fallback as the second parameter.


```css
div {
  background-color: var(--main-color, grey);
}
```


Personally, I find this rattles the entire idea of having variables as you have to place the actual fallback (the initial value of the variable) directly in the variable call.


```css
/* This won't work */

:root {
  --main-color: #333, grey;
  /* Fallbacks cannot be written within the initial creation of the variable. */
}
```

## CSS variables in practice

I've built out a small project showcasing how CSS Variables can be used in a dynamic way. We'll primarily be focusing on the styles and functionality, so don't worry too much about the HTML document aside from our inputs.

<iframe
     src="https://codesandbox.io/embed/smoosh-frog-j7x9y?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="smoosh-frog-j7x9y"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

###  Setting Up Our CSS Variables and Initial Values

If you head over to the `styles.css` file, you'll see all of the CSS variables we'll be using defined within the `:root` element. 

```css
:root {
  --base-font: 16px;
  --background-color: #ffba49;
  --text-color: #000000;
}
```

With our variables defined, we can then attach them as a value to a specific CSS property. In our case, all of our variables will sit within the `.text-section` class, as these are the only dynamic parts we want to target.

```css
.text-section {
  background: var(--background-color);
  color: var(--text-color);
  font-size: var(--base-font);
}
```

## Inputs

We have two color inputs and a range input that will allow us to select our desired color and font size.

```html
<input id="background-color" type="color" value="#ffba49" />
<input id="text-color" type="color" value="#000000" />
<input
    type="range"
    id="base-font"
    value="14"
    min="12"
    max="16"
    step="1"
    name="font-size"
  />
```
The `background-color`, `text-color` and `base-font` id's on our inputs correspond to the CSS variables we defined. This will allow us to have a link between our input values and CSS variable values.

## Dynamic Functionality

If you head over to the `index.js` file you'll notice that there isn't much going on, so let's walk through everything.

```js
const inputs = document.querySelectorAll("input");

const handleUpdate = event => {
  const suffix = event.target.id === "base-font" ? "px" : "";

  document.documentElement.style.setProperty(
    `--${event.target.id}`,
    `${event.target.value}${suffix}`
  );
};

inputs.forEach(input => input.addEventListener("input", handleUpdate));
```
Initially, we're grabbing all of our inputs and storing them in a variable called `inputs`. 

```js
const inputs = document.querySelectorAll("input");
```
 
One line down, you'll see the `handleUpdate` function. Let's go over the first line within the function.

```js
const suffix = event.target.id === "base-font" ? "px" : "";
```
Here, we're creating a variable called `suffix` which holds a ternary operator that states if the current target element has an id of **base-font**, then give us a string of "px" else an empty string. 

Moving further down is where the magic happens. This is where our CSS variables come to life.

```js
document.documentElement.style.setProperty(
    `--${event.target.id}`,
    `${event.target.value}${suffix}`
  );
```
What's going on here is that `document.documentElement.style` is being used to access the root element of the page `<html>` and allow us to set styles via the `style` property. 

The `setProperty` method that follows, takes in three parameters, but we'll only be giving it two. A property name and value. 

```js
setProperty(
`--${event.target.id}`, `${event.target.value}${suffix}`
)
```
In this instance, the property name is the target element written in the form of a CSS variable using two hyphens `--` before the name.

`event.target.id` will target the current element being accessed with its id which is the name defined as our CSS variables.

```js
// If the background color input is clicked then 
`--${event.target.id}` 

// becomes
`--${background-color}` 
```

`event.target.value` is the value selected for any element that's currently being targeted.

`suffix` (as we saw earlier holds either "px" or "") is added to the end of the value in case the font size input is selected. This is because the `font-size` CSS property takes a value that ends in "px". 

Lastly, we loop over each input and attach an event listener to the input event which triggers the `handleUpdate` function.

```js
  inputs.forEach(input => input.addEventListener("input", handleUpdate));
```

I've decided to use the **input event** rather than the **change event** because input events fire as soon as the value on an input changes, rather than waiting for the value to be fully set. This allows us to see the value change as we slide our input slider and move our cursor around the color input.

## Wrapping up

Hopefully you have a better understanding of CSS variables and how to use them in a dynamic way. Feel free to further build out the project I started and build something cool!