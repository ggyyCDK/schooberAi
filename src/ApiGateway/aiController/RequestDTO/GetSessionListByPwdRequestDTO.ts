import { ApiProperty } from '@midwayjs/swagger';

export class GetSessionListByPwdRequestDTO {
    @ApiProperty({ description: '当前工作目录路径' })
    pwd: string;
}
