import { DoubleWord } from '../../@types';

export interface IInitCommonControlsEx {
  dwSize: DoubleWord;
  dwICC: DoubleWord;
}

export class InitCommonControlsExStruct implements IInitCommonControlsEx {
  dwSize: DoubleWord;
  dwICC: DoubleWord;
}
