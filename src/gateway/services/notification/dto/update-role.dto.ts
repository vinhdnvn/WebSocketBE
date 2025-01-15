import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  roleId: string;

  @IsString()
  @IsNotEmpty()
  permissionIds: string;
}


export class PermissionDto {
  resourceId: string;
  action: string;
  string: number;
}

export class UpdateRoleResponseDto {
  roleId: string;
  permissions: PermissionDto[];
}
