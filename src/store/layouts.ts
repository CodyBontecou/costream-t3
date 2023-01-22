import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Layout, Layouts } from "react-grid-layout";
import produce from "immer";

const defaultLayout: Layout[] = [
  {
    i: "1",
    w: 3,
    h: 1,
    x: 0,
    y: 0,
    resizeHandles: ["nw", "sw", "ne", "se"],
  },
  {
    i: "2",
    w: 3,
    h: 1,
    x: 1,
    y: 0,
    resizeHandles: ["nw", "sw", "ne", "se"],
  },
  {
    i: "3",
    w: 5,
    h: 3,
    x: 2,
    y: 0,
    resizeHandles: ["nw", "sw", "ne", "se"],
  },
];

const defaultAddedLayout: Layout = {
  i: "4",
  w: 1,
  h: 1,
  x: 3,
  y: 0,
  resizeHandles: ["nw", "sw", "ne", "se"],
};

const defaultLayouts: Layouts = {
  md: defaultLayout,
  lg: defaultLayout,
  sm: defaultLayout,
  xs: defaultLayout,
  xxs: defaultLayout,
};

interface LayoutState {
  layouts: Layouts;
  layout: Layout[];
  addLayout: any;
  setLayout: (layout: Layout[]) => void;
  setLayouts: (layouts: Layouts) => void;
  resetLayouts: () => void;
  removeLayout: (index: number) => void;
}

export const useLayoutStore = create<LayoutState>()(
  devtools(
    persist(
      (set) => ({
        layouts: defaultLayouts,
        layout: defaultLayout,
        addLayout: () =>
          set(
            produce((state: LayoutState) => {
              state.layout = state.layout.concat({
                i: (state.layout.length + 1).toString(),
                w: 1,
                h: 1,
                x: state.layout.length,
                y: 0,
                resizeHandles: ["nw", "sw", "ne", "se"],
              });
              for (const [k, v] of Object.entries(state.layouts)) {
                state.layouts[k] = state.layout;
              }
            })
          ),
        setLayout: (layout) =>
          set(
            produce((state: LayoutState) => {
              state.layout = layout;
              for (const [k, v] of Object.entries(state.layouts)) {
                state.layouts[k] = state.layout;
                console.log(state.layouts[k]);
              }
            })
          ),
        setLayouts: (layouts) =>
          set(
            produce((state: LayoutState) => {
              state.layouts = layouts;
            })
          ),
        resetLayouts: () =>
          set(
            produce((state: LayoutState) => {
              state.layout = [];
              for (const [k, v] of Object.entries(state.layouts)) {
                state.layouts[k] = state.layout;
              }
            })
          ),
        removeLayout: (index) =>
          set(
            produce((state: LayoutState) => {
              state.layout.splice(index, 1);
              for (const [k, v] of Object.entries(state.layouts)) {
                state.layouts[k] = state.layout;
              }
            })
          ),
      }),
      {
        name: "layout-storage",
      }
    )
  )
);
