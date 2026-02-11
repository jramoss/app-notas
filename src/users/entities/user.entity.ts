import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypto from 'bcrypt';
import { BeforeUpdate } from 'typeorm/browser';
@Entity({ name: 'users' })
export class User {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
 
  @Column({ default: true })
  isActive: boolean;
  
  @Column({ default: () => 'CURRENT_TIMESTAMP' , type: 'timestamp' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @UpdateDateColumn()
  updatedAt: Date; 

   // Method to compare password during login
  async validatePassword(password: string): Promise<boolean> {
    return await bcrypto.compare(password, this.password);
  }
}
