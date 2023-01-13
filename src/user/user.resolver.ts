import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { AddUserArgs, UpdateUserArgs } from './args/user.args';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {

    constructor(private readonly userService: UserService){}

    @Query(returns => [User], {name: 'GetAllUsers'})
    getAllUsers(){
        return this.userService.findAllusers();
    } 

    @Query(returns => User, {name: 'GetUserById'})
    getUserById(@Args({name: 'UserID', type:() => Int}) id: number){
        return this.userService.findUserById(id)
    }

    @Mutation(returns => String, {name: 'DeleteUser'})
    deleteUser(@Args({name: 'UserID', type:()=> Int}) id : number){
        return this.userService.deleteUser(id)
    }

    @Mutation(returns => String, {name: 'CreateUser'})
    createUser(@Args({name: 'CreateUserArgs', type:()=> AddUserArgs}) addUserArgs: AddUserArgs){
        return this.userService.createUser(addUserArgs)
    }

    @Mutation(returns => String, {name : 'UpdateUser'})
    updateUser(@Args({name:'UpdateUser'})updateUserArgs: UpdateUserArgs){
        return this.userService.updateUser(updateUserArgs)
    }
}
