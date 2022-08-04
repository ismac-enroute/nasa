export enum ROVER_CAMERAS {
  FHAZ = 'FHAZ',
  RHAZ = 'RHAZ',
  MAST = 'MAST',
  CHEMCAM = 'CHEMCAM',
  MAHLI = 'MAHLI',
  MARDI = 'MARDI',
  NAVCAM = 'NAVCAM',
}

export interface IResponse {
  img_src: string;
}
