import {UserViewModelDB} from '../repositories/users-repository/types';
import jwt from 'jsonwebtoken'
import {settings} from '../settings';

interface AccessToken {
  accessToken: string
}

export const jwtService = {
  async createJWT(user: UserViewModelDB): Promise<string> {
    return jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '1h'})
  },
  async getUserIdByToken(token: string): Promise<AccessToken | null> {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET)
      return {accessToken: result.userId}
    } catch (e) {
      return null
    }
  }
}
