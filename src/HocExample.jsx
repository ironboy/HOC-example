import React from 'react';

export default function HocExample(Component) {
  return () => {
    // IMPORTANT: Note that we create the Component using new Component()
    // not <Component/>, there is a difference
    // this way of creating an instance of the component 
    // allows us to recurse through the children
    let toRender = recursiveMap(new Component(), modifier)

    return toRender;
  }
}

// loop  through all elements recursively
function recursiveMap(children, fn) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, fn)
      });
    }
    return fn(child);
  });
}

// a function we call on  each element 
// where we can have logic to modify the attributes
// and children of it depending on type of  element
function modifier(reactElement) {
  console.log(reactElement);
  let props = { ...reactElement.props };
  // add the class cool to all div and p elements
  if (reactElement.type === 'div' || reactElement.type === 'p') {
    props.className = (props.className || '')
      + (props.className ? ' ' : '') +
      'coolt';
  }
  // add a span with the text 'YES' to all a elements
  if (reactElement.type === 'a') {
    props.children.push(<span>YES</span>);
  }
  let modified = React.cloneElement(reactElement, props);
  console.log(modified);
  return modified;
}