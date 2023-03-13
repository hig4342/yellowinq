import { Deta } from 'deta';

const deta = Deta()
export const db = deta.Base(process.env.DETA_BASE!)