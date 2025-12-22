import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'abc000',
  database: 'armory',
  autoLoadEntities: true,
};

/* userFactory: (configService: ConfigService) => ({
    configService.get('DB_HOST'),
    configService.get('DB_PORT'),
    configService.get('DB_USERNAME'),
    configService.get('DB_PASSWORD'),
    configService.get('DB_DATABASE'),
    autoLoadEntities: true,
})
*/
