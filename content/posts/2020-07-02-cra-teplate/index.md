---
title: Building your own Create React App template
author: David Quick
date: 2019-11-14
excerpt: Using CRA (create-react-app) is a convenient and fast way to get started on a React project.
---

> As per the create-react-app docs. Creating templates is a feature available with react-scripts@3.3.0 and higher.

Using CRA (create-react-app) is a convenient and fast way to get started on a React project. Chances are, you have a set of favorite packages and tools that you use when setting up a new project. 

Having to constantly install these packages and tools every time you create a project gets tiring and unless your aim is to specifically learn how to set up a React project, there's no need to always do so. 

This is where a CRA template comes in hand. By creating your own template, you can run a single command and have everything at your disposal. 

### Overview 

We'll walk through the process of creating a very basic CRA template and publish our template to npm so that we can use it and share it with others.

### Getting Started

Head into a folder where you want your template to live and open your terminal to that location. 

You can then run the following command in your terminal: 

```shell
npx create-react-app cra-template-[template-name]
```
> `[template-name]` should be changed to the actual name of your template and **must** follow the convention of `cra-template-` followed by your template name. You can name this anything you'd like, just make sure it's unique compared to the pre-existing published templates. I've named mine `cra-template-custom-styled` for the sake of this article. 

Once CRA has finished, you can move into the app and run it with the following commands: 

```shell
cd cra-template-custom-styled
yarn start
```

Now we have a simple CRA project that we can begin customizing to our liking. 

### Building The Template

Let's focus on setting up our template structure before we add the features we want. 

The structure for any CRA template will be as follows: 

```shell
cra-template
│ └───template
│   │   gitignore
│   │ 
│   └───public
│       │   ...   
│   └───src
│       │   App.js
│       │   App.test.js
│       │   index.css
│       │   index.js
│       │   ...   
│   package.json  
│   README.md
│   template.json
```

> Note: You can head over to the base [cra-template](https://github.com/facebook/create-react-app/tree/master/packages/cra-template) to get a more visual understanding of the file and folder structure if the above confuses you.

Let's go ahead and structure our app by creating a `template` folder at the top level and moving both the `src` and `public` folders inside the `template` folder. 

You can then take the `.gitignore` file and move it into the `template` folder. With this, we can also remove the `.` from the start of the file so that it looks like this: `gitignore`. 

> Just for clarity, the `gitignore` file **should not** have the `.` in front of it.

We can also delete both the `yarn.lock` file and the `package-lock.json` file in the root as well as the `node_modules` folder.

One last thing is to create a `template.json` file in the root of our project and add the following to it: 

```js
{
  "package": {
    "dependencies": {
      "@testing-library/jest-dom": "^4.2.4",
      "@testing-library/react": "^9.3.2",
      "@testing-library/user-event": "^7.1.2",
      "react": "^16.13.1",
      "react-dom": "^16.13.1",
      "react-scripts": "3.4.1"
    }
  }
}
```

This `template.json` file is where we'll store all of our packages.

### Adding Dependancies

For this particular template, we're going to use styled-components. 

> You're more than welcome to use any dependencies you'd like.

Let's add styled-components and a babel plugin by adding the following to our `template.json` file:

`"styled-components": "^5.1.1,"`
`"babel-plugin-styled-components": "^1.10.7"`

> Note: Normally you'd want to add these as a devDependency, but cra-templates currently don't support the use of devDependencies. You can read more [here](https://github.com/facebook/create-react-app/issues/6180#issuecomment-453640473) as to why. 

The reason that we've manually added these instead of installing them is because once we run CRA, it will look inside the `template.json` file and download all of the dependencies listed for us. 

> Make sure you do a quick npm search for the dependencies you want to add and their correct version number. 

Your `template.json` file should now look like this:

```js
{
  "package": {
    "dependencies": {
      "@testing-library/jest-dom": "^4.2.4",
      "@testing-library/react": "^9.3.2",
      "@testing-library/user-event": "^7.1.2",
      "react": "^16.13.1",
      "react-dom": "^16.13.1",
      "react-scripts": "3.4.1",
      "styled-components": "^5.1.1",
      "babel-plugin-styled-components": "^1.10.7"
    }
  }
}
```

With the addition of the babel plugin, we need to create a `.babelrc` file in our `template` folder and add the following to the `.babelrc` file: 

```js
{
  "plugins": ["babel-plugin-styled-components"]
}
```

### Editing package.json

When creating a template, the `package.json` file will look a little different. Let's remove everything currently in our file and add the following: 

```js
{
  "name": "cra-template-custom-styled",
  "version": "1.0.0",
  "keywords": [
    "react",
    "create-react-app",
    "template"
  ],
  "description": "My custom template for Create React App.",
  "main": "template.json"
  "repository": {
    "type": "git",
    "url": "https://github.com/facebook/create-react-app.git",
    "directory": "packages/cra-template"
  },
  "license": "MIT",
  "engines": {
    "node": ">=10"
  },
  "bugs": {
    "url": "https://github.com/facebook/create-react-app/issues"
  },
  "files": [
    "template",
    "template.json"
  ]
}
```

Make sure the name field is the name of **your** template. 

Within the `package.json` file, you should consider changing the description to better suit your template and changing the `url` to your repository. You could also add an `author` field and more keywords for any dependencies you've added. 

> The most important line within this file is "main": "template.json". If you don't have this, you won't be successful in publishing your template. 

### Customizing The Template

Aside from your dependencies of choice, the files you include within your template are completely up to you. 

In general, CRA comes with a few files that you'll most likely end up getting rid of anyways.

> You're free to follow along or create/delete any files and folders on your own from this point on. 

Heading into the `src` folder, I've gotten rid of the following files: 

- `App.css`
- `logo.svg`
- `serviceWorker.js`

With those files gone, I've altered my `App.js` file to look as follows: 

```jsx
import React from 'react'
import styled from 'styled-components'

const App = () => (
  <AppContainer>
    <Intro>
       Welcome to my CRA-Template!
    </Intro>
  </AppContainer>
)

export default App

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  background: #1d1f27;
`

const Intro = styled.p`
  font-size: 2.5vw;
  color: #ffff;
`
```
I also removed the `serviceWorker` from the `index.js` file. 

I won't go much further, as customizing the template to your liking is something only you know. The possibilities are endless!

### Publishing The Template

You'll need an account with npm in order to publish your template. If you don't have one already, go ahead and create one. 

Once created, head to your terminal and log in to npm with the following command: 

`npm login`

You'll be prompted to put in your information. Once you're done, you can publish the template with: 

`npm publish --access public`

Guess what? You just created your first create-react-app template! 

To see it in action create a new project with the following command: 

`npx create-react-app your-project-name --template [your-template-name]`

`your-template-name` should be the name of your template without the `cra-template-` prefix. The `--template` parameter will identify it as a template. 

### Closing 

I hope you found this article useful. Build all the templates!!!