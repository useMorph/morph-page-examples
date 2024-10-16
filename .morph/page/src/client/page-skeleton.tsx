import React from 'react';
import { DropdownMenu, MenuIcon, Button } from '@use-morph/page';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

type PageSkeletonProps = React.PropsWithChildren<{
  routes: Array<{ path: string; title: string }>;
  title: string;
}>;

export const PageSkeleton: React.FC<PageSkeletonProps> = (props) => {
  return (
    <ErrorBoundary fallbackRender={fallbackRender}>
      <div className="morph-page">
        <div className="flex items-center gap-3">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button size="icon" variant={'ghost'}>
                <MenuIcon size={18} />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              {props.routes.map((route) => (
                <DropdownMenu.Item key={route.path} asChild>
                  <a className="no-underline hover:underline !cursor-pointer" href={route.path}>
                    {route.title}
                  </a>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <div className="text-sm text-gray-500">{props.title}</div>
          <div className="flex-1"></div>
          <div className="text-gray-900 tracking-wide">
            Made with
            <a href="https://www.morph-data.io" className="ml-2">
              <img src="morph_logo_svg.svg" alt="Morph" className="h-5 inline" />
            </a>
          </div>
        </div>
        <div className="mt-4">{props.children}</div>
      </div>
    </ErrorBoundary>
  );
};
