import {
  DoubleWord,
  FontHandle,
  InstanceHandle,
  Int,
  LongPointerToConstantWideString,
  MenuHandle,
  WindowHandle,
} from '../../@types';
import {
  FontCharSet,
  FontClipPrecision,
  FontFamily,
  FontOutPrecision,
  FontPitch,
  FontQuality,
  FontWeight,
} from '../../win32/gdi32/create-font';

export type State = {
  isWordWrapEnabled: boolean;
  zoomLevel: number;
  font: {
    height: Int;
    width: Int;
    escapement: Int;
    orientation: Int;
    weight: FontWeight;
    italic: DoubleWord;
    underline: DoubleWord;
    strikeOut: DoubleWord;
    charSet: FontCharSet;
    outPrecision: FontOutPrecision;
    clipPrecision: FontClipPrecision;
    quality: FontQuality;
    pitchAndFamily: FontPitch | FontFamily;
    fontFaceName: LongPointerToConstantWideString;
  };
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
    fontHandle: FontHandle;
  };
};

export const DEFAULT_ZOOM_LEVEL = 100;
export const MIN_ZOOM_LEVEL = 10;
export const MAX_ZOOM_LEVEL = 500;
export const ZOOM_LEVEL_INCREMENT = 10;

export const state: State = {
  isWordWrapEnabled: false,
  zoomLevel: 100,
  font: {
    height: 18,
    width: 0,
    escapement: 0,
    orientation: 0,
    weight: FontWeight.NORMAL,
    italic: 0,
    underline: 0,
    strikeOut: 0,
    charSet: FontCharSet.DEFAULT,
    outPrecision: FontOutPrecision.DEFAULT_PRECIS,
    clipPrecision: FontClipPrecision.DEFAULT_PRECIS,
    quality: FontQuality.DEFAULT_QUALITY,
    pitchAndFamily: FontPitch.DEFAULT_PITCH | FontFamily.SWISS,
    fontFaceName: 'Consolas',
  },
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
    fontHandle: 0,
  },
};
