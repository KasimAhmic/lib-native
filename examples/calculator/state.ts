import { InstanceHandle, MenuHandle, WindowHandle } from '@ahmic/lib-native';

export type State = {
  handles: {
    instanceHandle: InstanceHandle;
    mainWindowHandle: WindowHandle;
    menuHandle: MenuHandle;
    worksheetsMenuHandle: MenuHandle;
    viewMenuHandle: MenuHandle;
    historyMenuHandle: MenuHandle;
    editMenuHandle: MenuHandle;
    helpMenuHandle: MenuHandle;
  };
};

export const state: State = {
  handles: {
    instanceHandle: 0,
    mainWindowHandle: 0,
    menuHandle: 0,
    viewMenuHandle: 0,
    worksheetsMenuHandle: 0,
    historyMenuHandle: 0,
    editMenuHandle: 0,
    helpMenuHandle: 0,
  },
};
