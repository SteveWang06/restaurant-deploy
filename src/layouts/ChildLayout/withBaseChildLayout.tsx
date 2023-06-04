import BaseLayout, { BaseChildLayoutProps } from "./BaseChildLayout";



function withBaseChildLayout<T>(Page: React.FC<T>): React.FC<T> {
  const RootPage: typeof Page = (props: T) => {
    return (
      <BaseLayout {...props}>
        <Page {...(props as any)} />
      </BaseLayout>
    );
  };

  return RootPage;
}

export default withBaseChildLayout;
