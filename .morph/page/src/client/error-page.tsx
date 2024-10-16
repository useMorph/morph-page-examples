import React from 'react';
import { Button, Card, DropdownMenu, MenuTrigger } from '@use-morph/page';

type ErrorPageProps = React.PropsWithChildren<{
  routes: Array<{ path: string; title: string }>;
}>;

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  return (
    <div className="h-full min-h-[90svh] w-full flex flex-col justify-center items-center gap-3">
      <h1>Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
      <p>Please select an exsiting page from below.</p>
      <div className="h-full w-full flex flex-col justify-center items-center gap-1 py-2 px-4">
        {props.routes.map((route) => (
          <a key={route.path} href={route.path}>
            <Button variant={'link'}>{route.title}</Button>
          </a>
        ))}
      </div>
    </div>
  );
};
