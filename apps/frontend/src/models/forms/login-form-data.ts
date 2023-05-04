import { LoginDto } from '@datatlas/dtos';

export interface LoginFormData extends LoginDto {
  rememberMe?: boolean;
}
