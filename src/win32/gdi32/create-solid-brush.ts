import { BrushHandle, COLORREF, ColorReference, HBRUSH } from '../../@types';
import { gdi32 } from './gdi32';

export function CreateSolidBrush(color: ColorReference): BrushHandle {
  return gdi32.invoke('CreateSolidBrush', HBRUSH, [COLORREF], [color]);
}
