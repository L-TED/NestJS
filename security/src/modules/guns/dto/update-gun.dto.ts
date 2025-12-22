import { PartialType } from '@nestjs/swagger';
import { CreateGunDto } from './create-gun.dto';

export class UpdateGunDto extends PartialType(CreateGunDto) {}
