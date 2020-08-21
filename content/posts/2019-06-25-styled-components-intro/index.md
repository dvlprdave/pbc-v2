---
title: An intro to Styled-Components
author: David Quick
date: 2020-08-21
excerpt: Styled-components is one of many ways to style React components. It allows us to use CSS directly in our components.
---

[Wes Bos]: https://wesbos.com/tagged-template-literals/

CSS in JavaScript doesn't hold an amazing reception, yet here we are, doing exactly that. Who would have thought 🤷🏽‍♂.

Styled-components is one of many (my favorite) ways to style React components. It allows us to use CSS directly in our components and have a clear identifier for everything within them. No more repetition though *className*. Just concise names. 

Let's take a surface look at styled-components while using this header component as an example:

```javascript
const Header = styled.div`
    display: flex;
    background: #fff;
    color: #000;
    height: 10rem;
    padding: 0.5rem;
`
```

If you've never seen a styled-component before, you are either confused or curious. Either way, 
you should at least be familiar with the basic CSS shown. If not, don't worry about it. 

Let's break down what we have above and figure out whats going on.

### Under The Hood

A variable is created with the name of Header. It's value is just a function wearing a disguise. 
We write **styled.div**, as our component is simply a **div**. However, this could be a **ul**, **h1-h6**, 
or even a **button** if you'd like (styled.button). 

We then include a set of backticks and within those backticks, you'd begin to write regular CSS.

> This is still JSX, so any component you define must start with a capital letter. Lowercase
 component names are used for built-in components.

 These backticks may be familiar to you if you're used to ES6. They are **tagged template literals**. I won't get into too much detail about them, but if you're curious, [Wes Bos](https://wesbos.com/tagged-template-literals/) wrote an amazing article that breaks everything down. A more technical explanation can be found over at the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)

 ### Try it out yourself

Create a React project and test it out yourself.

```shell
npx create-react-app styled-component-playground
cd styled-component-playground
yarn start
```

Open the app on: http://localhost:3000/ 

### Adding Styled-components

Let's add styled-components to our project by entering the following in the terminal:

 ```shell
 npm i --save styled-components
 ```

 Once that's done, create a component named **Header.jsx** and then import styled-components.

```javascript
import styled from 'styled-components';
```

Now that we have that in place, you can use your new styled component. 

```javascript
import React from "react"
import styled from 'styled-components'

const Header = styled.div`
    display: flex;
    background: #fff;
    color: #000;
    height: 10rem;
    padding: 0.5rem;
`
const App = () => (
    <div>
        <Header /> 
    </div>
)

export default App
```
To view the Header component, head over to your app.js file and import the header component at the top of the file and return it. You should now see your component in all its glory. Try changing a few styles and have fun with it!

### Want to know more? 

This was simply a quick example and intro into styled components. 
If you'd like to learn more and dive deeper, head over to the 
[styled components docs](https://www.styled-components.com/docs).