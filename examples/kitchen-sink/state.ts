import {
  DoubleWord,
  FontHandle,
  InstanceHandle,
  Int,
  LongPointerToConstantWideString,
  MenuHandle,
  WindowHandle,
} from '@ahmic/lib-native';
import {
  FontCharSet,
  FontClipPrecision,
  FontFamily,
  FontOutPrecision,
  FontPitch,
  FontQuality,
  FontWeight,
} from '@ahmic/lib-native/win32/gdi32/create-font';

export type State = {
  handles: {
    instanceHandle: InstanceHandle;
    mainWindowHandle: WindowHandle;
    menuHandle: MenuHandle;
    fontHandle: FontHandle;
    fileMenuHandle: MenuHandle;
    okButtonHandle: WindowHandle;
    cancelButtonHandle: WindowHandle;
    dropdownHandle: WindowHandle;
  };
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
};

export const state: State = {
  handles: {
    instanceHandle: 0,
    mainWindowHandle: 0,
    menuHandle: 0,
    fontHandle: 0,
    fileMenuHandle: 0,
    okButtonHandle: 0,
    cancelButtonHandle: 0,
    dropdownHandle: 0,
  },
  font: {
    height: 12,
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
    fontFaceName: 'Segoe UI',
  },
};
