import { IsString } from 'class-validator';

export class CredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export interface DefUser {
  userId: string;
  username: string;
  password: string;
}

export interface JWTPayload {
  userId: string;
  username: string;
  iat?: number;
}

export interface SigninResult {
  accessToken: string;
}
