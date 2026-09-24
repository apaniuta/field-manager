import { Component, type ErrorInfo, type ReactNode } from "react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";

interface ErrorBoundaryProps {
  /** Fallback title, e.g. "Не вдалося відобразити карту". */
  title: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * A class component on purpose: React has no hook for catching render errors
 * (`getDerivedStateFromError` / `componentDidCatch` exist only on classes).
 * Catches render errors only, not errors in event handlers or async code.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>{this.props.title}</AlertTitle>
          <AlertDescription>
            Сталася неочікувана помилка. Решта застосунку працює.
          </AlertDescription>
          <AlertAction>
            <Button
              variant="outline"
              size="sm"
              onClick={() => this.setState({ hasError: false })}
            >
              Спробувати ще раз
            </Button>
          </AlertAction>
        </Alert>
      </div>
    );
  }
}
