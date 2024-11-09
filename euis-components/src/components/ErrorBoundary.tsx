import React, { ReactNode } from "react";
import { Component } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if ((this.state as any)?.hasError) {
      // You can render any custom fallback UI
      return <>
        <h1>Something went wrong.</h1>
        <h2>Reload the window to restart it. (click twice on the taskbar icon)</h2>
      </>;
    }
    return this.props.children;
  }
}