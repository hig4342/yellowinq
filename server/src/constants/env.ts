import * as dotenv from 'dotenv'
import path from 'path'

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.production') })
  console.log(dotenv.parse)
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.development') })
} else {
  throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}