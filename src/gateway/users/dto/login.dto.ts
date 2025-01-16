// export DTO for login, using class-validator
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  clientId(clientId: any) {
    throw new Error('Method not implemented.');
  }
  @IsEmail()
  identifier: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
