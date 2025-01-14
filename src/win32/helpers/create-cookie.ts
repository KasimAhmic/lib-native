import koffi from 'koffi';

import { ULONG_PTR } from '../../@types';

/**
 * Creates a Buffer object with the size of the specified type.
 *
 * @param type The type of the cookie to create. Defaults to {@link ULONG_PTR}.
 */
export function createCookie(type: koffi.IKoffiCType = ULONG_PTR): Buffer {
  return Buffer.alloc(koffi.sizeof(type));
}
