import { Component } from "react";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <h1>কিছু একটা ভুল হয়েছে</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;