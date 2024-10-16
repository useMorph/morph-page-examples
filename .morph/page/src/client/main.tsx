import { ComponentType, ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Card,
  DataTable,
  Embed,
  Grid,
  Metrics,
  PageProvider,
  Panel,
  Stack,
  VariableDatePicker,
  VariableInput,
  VariableSelect,
  VariableValue,
} from '@use-morph/page';
// import './style.css';
import '@use-morph/page/css';
import { PageSkeleton } from './page-skeleton';
import { ErrorPage } from './error-page';

type ComponentDictionary = {
  [name: string]: ComponentType<any>;
};

type MDXProps = {
  children?: ReactNode;
  components?: ComponentDictionary;
};

type MDXComponent = (props: MDXProps) => JSX.Element;

const pages = import.meta.glob<{
  default: MDXComponent;
  name?: string;
  title?: string;
}>('../../../../src/**/*.mdx', {
  // 変数が使えないので、固定しないといけない
  eager: true,
});

const routes: Array<{ path: string; title: string; Element: MDXComponent }> = [];
for (const path of Object.keys(pages)) {
  const name = pages[path].name;
  const title = pages[path].title;

  if (!name) {
    console.error(`${path} has not exported a name`);
    continue;
  }

  routes.push({
    path: name === 'index' ? '/' : `/${name}`,
    title: title || `${name}`,
    Element: pages[path].default,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, title, ...rest }) => ({
    ...rest,
    title,
    errorElement: <ErrorPage routes={routes} />,
    element: (
      <PageSkeleton
        routes={routes.map((route) => ({ path: route.path, title: route.title }))}
        title={title}
      >
        <Element
          components={{
            DataTable(properties) {
              return <DataTable {...properties} />;
            },
            Embed(properties) {
              return <Embed {...properties} />;
            },
            Metrics(properties) {
              return <Metrics {...properties} />;
            },
            VariableInput(properties) {
              return <VariableInput {...properties} />;
            },
            VariableValue(properties) {
              return <VariableValue {...properties} />;
            },
            VariableDatePicker(properties) {
              return <VariableDatePicker {...properties} />;
            },
            VariableSelect: function (properties) {
              return <VariableSelect.Root {...properties} />;
            },
            VariableSelectGroup: function (properties) {
              return <VariableSelect.Group {...properties} />;
            },
            VariableSelectLabel: function (properties) {
              return <VariableSelect.Label {...properties} />;
            },
            VariableSelectItem: function (properties) {
              return <VariableSelect.Item {...properties} />;
            },
            VariableSelectSeparator: function (properties) {
              return <VariableSelect.Separator {...properties} />;
            },
            Stack(properties) {
              return <Stack {...properties} />;
            },
            Card(properties) {
              return <Card.Root {...properties} />;
            },
            Grid(properties) {
              return <Grid {...properties} />;
            },
            Panel(properties) {
              return <Panel {...properties} />;
            },
          }}
        />
      </PageSkeleton>
    ),
  }))
);

const App = () => {
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageProvider>
      <App />
    </PageProvider>
  </StrictMode>
);
