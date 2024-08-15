1. What is the difference between Component and PureComponent? Give an example where it might break my app.  
   The main difference is that PureComponents come with performance optimization by default, which helps to avoid unnecessary re-renders by performing a comparison to check if props and/or state have changed. On the other hand, if you want to avoid unnecessary re-renders in a Component, you need to handle it manually, which means writing more code but also gives you more control over your component's behavior. The risk with using PureComponents is that the comparison won't detect deep changes in complex states or props, which could lead to erratic behavior in your application and even potentially break it if you have a large application with many components.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?  
   It's not recommended to use state management with context in a component that utilizes the shouldComponentUpdate method because the comparison made within this method will ignore context state updates, unless you explicitly write the validation for the context state within shouldComponentUpdate, which can be very cumbersome and is generally not advisable.

3. Describe 3 ways to pass information from a component to its PARENT.  
   There are various ways to pass information from a child component to a parent component:  
   -With state management tools like Redux, it is possible to dispatch an action from the child component to update information that the parent component consumes. A similar approach can be used with Context, where the child component can modify a state that the parent component consumes from the same Context.  
   -With the useRef hook and the forwardRef method, it is possible to pass a reference from a parent component to a child component, allowing the child component to modify the reference.  
   -We can create a state with the useState hook in a parent component, and then pass the method to modify that state as a prop to the child component. This way, we can update the state value from the child component (this was the approach I used to allow my Autocomplete component to update the parent App component).

4. Give 2 ways to prevent components from re-rendering.  
   As mentioned in response 1, using a PureComponent can be a good way to avoid unnecessary re-renders. Just like the shouldComponentUpdate method in a Component, it is also an alternative to control when a component re-renders. For functional components, we can control when the component re-renders by using the dependencies we add to hooks like `useEffect()` and `useMemo()`, for example.

5. What is a fragment and why do we need it? Give an example where it might break my app.  
   Fragments are JSX tags that help us group elements without the need to wrap them, for example with a div, thus adding more nodes to the DOM. In this application, for example, I used it, to wrap list items in dropdown options.
   We need to be careful when using them because they can potentially break nested styles or cause issues with complex structures like tables.

6. Give 3 examples of the HOC pattern.  
   The HOC pattern is one of the most common and widely used in React because it allows us to manage information that a parent can pass down to all of its nested children. Many React APIs use this pattern, such as Context or memo. It is also often used to configure the theme of an application or to handle authentication and login state. We have to be careful with the prop drilling when we work with the HOC pattern.

7. What's the difference in handling exceptions in promises, callbacks and async…await?  
   In terms of error handling, with promises, we use the `.catch()` method, which is added after the `.then()` methods where we handle the promise in case there are no errors. For async/await, we use `try{} catch{}` blocks, which provide a more readable structure for understanding what happens when an error occurs and the function executes the code within the catch block. In the case of callback functions, the error is passed as an object in the first argument of the function, so that if an error exists, it can be validated and specific code can be executed.

8. How many arguments does setState take and why is it async.  
   The setState function takes two arguments: the first can be an object (which defines how we want to update the state) or a function, which allows us to use the previous state to update it. The second is an optional callback function. React handles it asynchronously to avoid unnecessary re-renders.

9. List the steps needed to migrate a Class to Function Component. All of us who have been programming in React for more than 5 years have faced this task since it is now recommended to use functional components over class components due to their better performance and ease of understanding and maintenance. To achieve this, we need to:  
   -create a function  
   -move all the lifecycle methods and state management into the body of the function. React provides us with hooks like `useEffect` (to replace lifecycle methods such as `componentDidUpdate()`) and `useState` (to replace `this.state` and `this.setState`).  
   -We would also need to replace all “this” declarations since they are not necessary in functional components.  
   -Finally, we would need to replace the `render()` method, as all the rendering logic goes directly into the return statement of the functional component.

10. List a few ways styles can be used with components.  
    React offers several ways to apply styles to components. The simplest (and not always recommended) method is inline styles, which are added using the style prop to the element, for example `<div style={{ width: "100%" }}></div>`. Another common way, which most developers learn first, is using CSS stylesheets. This involves creating a CSS file with the classes we want to apply, importing the file into our component, and applying the styles using the className prop, like this `<div className="div-style">` (this was the approach selected for this app). Lastly, we can use CSS libraries that offer greater flexibility and control for handling dynamic styles, such as styled-components, where we create styled components directly that can be reused as needed.

11. How to render an HTML string coming from the server.  
    It is not a highly recommended practice, as it can be risky if the source is not secure, but it can still be done through the `dangerouslySetInnerHTML` prop, which allows us to inject the HTML string directly into the DOM, just as I did in the Highlighter component in my application.
