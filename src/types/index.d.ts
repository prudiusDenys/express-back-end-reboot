import {UserViewModelDB} from '../repositories/users-repository/types';


declare global {
  namespace Express {
    export interface Request {
      user: UserViewModelDB | null
    }
  }
}
