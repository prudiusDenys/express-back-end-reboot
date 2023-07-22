import {UserViewModelDB} from '../repositories/users-repository/types';
import jwt from 'jsonwebtoken'
import {settings} from '../settings';

interface AccessToken {
  accessToken: string
}

export const jwtService = {
  async createJWT(user: UserViewModelDB): Promise<AccessToken> {
    const jwtToken = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '1h'})
    return {accessToken: jwtToken}
  },
  async getUserIdByToken(token: string): Promise<string | null> {
    try {
      const result: any = jwt.verify(token, settings.JWT_SECRET)
      return result.userId
    } catch (e) {
      return null
    }
  }
}
