import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserArgs, UpdateUserArgs } from './args/user.args';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) public readonly userRepo: Repository<User>){}
    async findAllusers() : Promise<User[]> {
        let users = await this.userRepo.find()
        return users
    }

    async findUserById(id: number) : Promise<User | string>{
        let user = await this.userRepo.findOne({where : {id}})
        if (user){
        return user
        }
        return 'No user found against the given ID'
    }

    async deleteUser(id: number) : Promise<string>{
        await this.userRepo.delete(id)
        return 'User deleted Successfully!'
    }

    async createUser(addUserArgs : AddUserArgs) : Promise<string>{
        let user : User = new User();
        user.email = addUserArgs.email;
        user.fullName = addUserArgs.fullName;
        user.password = addUserArgs.password;
        await this.userRepo.save(user)
        return 'User created successfully'
    }

    async updateUser(updateUserArgs : UpdateUserArgs) : Promise<string>{
        let user = await this.userRepo.findOne({where:{id :updateUserArgs.id}})
        if (updateUserArgs.email){
            user.email = updateUserArgs.email;
        }if(updateUserArgs.fullName){
            user.fullName = updateUserArgs.fullName;
        }if(updateUserArgs.password){
            user.password = updateUserArgs.password
        }
        await this.userRepo.save(user)
        return 'User updated successfully'
    }
}
