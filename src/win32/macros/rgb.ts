import { ColorReference, Int } from '../../@types';

export function RGB(red: Int, green: Int, blue: Int): ColorReference {
  return (red & 0xff) | ((green & 0xff) << 8) | ((blue & 0xff) << 16);
}
