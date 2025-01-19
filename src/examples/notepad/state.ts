import { InstanceHandle, MenuHandle, WindowHandle } from '../../@types';

export type State = {
  isWordWrapEnabled: boolean;
  zoomLevel: number;
  handles: {
    instanceHandle: InstanceHandle;
    mainWindowHandle: WindowHandle;
    editHandle: WindowHandle;
    statusBarHandle: WindowHandle;
    menuHandle: MenuHandle;
    fileMenuHandle: MenuHandle;
    editMenuHandle: MenuHandle;
    formatMenuHandle: MenuHandle;
    zoomMenuHandle: MenuHandle;
    viewMenuHandle: MenuHandle;
    helpMenuHandle: MenuHandle;
    debugMenuHandle: MenuHandle;
  };
};

export const DEFAULT_ZOOM_LEVEL = 100;
export const MIN_ZOOM_LEVEL = 10;
export const MAX_ZOOM_LEVEL = 500;
export const ZOOM_LEVEL_INCREMENT = 10;

export const state: State = {
  isWordWrapEnabled: false,
  zoomLevel: 100,
  handles: {
    instanceHandle: 0,
    mainWindowHandle: 0,
    editHandle: 0,
    statusBarHandle: 0,
    menuHandle: 0,
    fileMenuHandle: 0,
    editMenuHandle: 0,
    formatMenuHandle: 0,
    zoomMenuHandle: 0,
    viewMenuHandle: 0,
    helpMenuHandle: 0,
    debugMenuHandle: 0,
  },
};
