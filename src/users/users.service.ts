import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    // repo: Repository<User>;
    // constructor(repo: Repository<User>){
    //     this.repo = repo;
    // }

    constructor(@InjectRepository(User) private repo: Repository<User>){}
    // The type annotation on this is Repository and we applied a generic type to it of <User>.
    // So this right here means that repo is going to be an instance of a type Repository that deals with instances of users. That's what <User> right there is meant to say. This repository is going to handle users. So then the last part of this that's definitely the weirdest part is @InjectRepository with User.
    // So this is a little bit of an aid to the dependency injection system.
    // This is what is going to tell the dependency injection system that we need the user repository.
    // You might recall that when we spoke about dependency injection a little bit ago, we said that the dependency injection system uses this type annotation right here to figure out what instance it needs to inject into this class at runtime.
    // Unfortunately, the dependency injection system does not play nicely with generics, which is what this is right here.
    // So this decorator is required simply because we have to use a generic type right here.

    create(email: string, password: string){
        const user = this.repo.create({email, password}); // 👈 makes a new instance of an entity, but does not persist it to DB. Hooks can be executed with create method
        return this.repo.save(user); // 👈 Adds or updates a record to the DB or persists the entity to the DB.
    }
    // Once again, to hook up our service to our controller, we will use dependency injection.

    findOne(id: number){
        return this.repo.findOneBy({id});
    } 

    find(email: string){
        return this.repo.find({where: {email}});
    }       

    async update(id: number, attributes: Partial<User>){
        // In TypeScript, Partial<T> is a utility type that constructs a type with all the properties of T set to optional. This means that Partial<User> will have all the properties of the User entity, but all of them will be optional.
        const user = await this.repo.findOneBy({id});

        if(!user){
            throw new NotFoundException('User not found');
        }

        Object.assign(user, attributes); // Overwrites the user object with the attributes object.
        return this.repo.save(user); // 👈 Updates the record in the DB. Hooks can be executed with save method
    }

    async remove(id: number){
        const user = await this.repo.findOneBy({id});
        if(!user){
            throw new NotFoundException('User not found');
        }
        return this.repo.remove(user); // 👈 Removes the record from the DB. Hooks can be executed with remove method
    }
}
