import Head from "next/head";
import classNames from "classnames";
import { type NextPage } from "next";
import type { Layout, Layouts } from "react-grid-layout";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useWindowSize } from "@react-hook/window-size";
import { useEffect, useState } from "react";
import { useLayoutStore } from "../store/layouts";

const Home: NextPage = () => {
  const { addLayout, resetLayouts } = useLayoutStore();

  return (
    <>
      <Head>
        <title>Costream</title>
        <meta name="description" content="Costream" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="root" className="h-screen w-screen">
        <Grid />
        <ActionButton position="right-2 bottom-2" onClick={() => addLayout()} />
        <ActionButton
          position="left-2 bottom-2"
          onClick={() => resetLayouts()}
        />
      </main>
    </>
  );
};

export default Home;

const ResponsiveGridLayout = WidthProvider(Responsive);

const Grid = () => {
  const [width, height] = useWindowSize();
  const [hasLoaded, setHasLoaded] = useState(false);
  const { layouts, setLayout, setLayouts } = useLayoutStore();
  const [breakpointChange, setBreakpointChange] = useState(false);

  const onLayoutChange = (newLayout: Layout[], newLayouts: Layouts) => {
    if (breakpointChange) {
      setBreakpointChange(false);
    } else {
      setLayout(newLayout);
      setLayouts(newLayouts);
    }
  };

  const onBreakpointChange = () => {
    setBreakpointChange(true);
  };

  useEffect(() => {
    if (width || height) {
      setHasLoaded(true);
    }
  }, [width, height]);

  return hasLoaded ? (
    <ResponsiveGridLayout
      cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
      rowHeight={height / 12}
      width={width / 12}
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      onLayoutChange={(_, newLayouts) => onLayoutChange(_, newLayouts)}
      onBreakpointChange={() => onBreakpointChange()}
      margin={[0, 0]}
    >
      {!!layouts &&
        layouts.lg?.map((layout: Layout) => {
          return (
            <div key={layout.i}>
              <GridItem item={layout} />
            </div>
          );
        })}
    </ResponsiveGridLayout>
  ) : (
    <p>Loading...</p>
  );
};

const GridItem = (props: { item: Layout }) => {
  return (
    <div className="pointer-events-none h-full w-full">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/MbMrLhKzYL4"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const ActionButton = (props: { onClick: () => void; position: string }) => {
  const className = `fixed ${props.position} z-10 h-12 w-12 rounded-full bg-black text-gray-1`;
  return (
    <button onClick={props.onClick} className={className}>
      +
    </button>
  );
};

type IFrameContainerProps = { showBorders: boolean };

const IFrameContainer = ({ showBorders }: IFrameContainerProps) => {
  const borderClass = classNames({
    "border border-dashed border-gray-4 p-4": showBorders,
  });

  return <div className={borderClass}></div>;
};
