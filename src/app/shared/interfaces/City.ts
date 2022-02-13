export interface ICity {
  name: string,
  lon: number,
  lat: number,
  'local_names'?: { ru: string },
  country?: string,
  state?: string
}
