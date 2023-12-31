import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password })
        return this.repo.save(user)
        /* why do we bother to use a constant user rather than
        only use save({ email, password }) ?
        Here is the gocha. user is like an entity, so hooks will work. 
        If we use ({ email, password }), hooks won't work.*/

        /*
        save()  VS  insert() & update()
        remove() VS delete()
        
                Save and remove are expected to be called with entity instances, 
                and if you call them with an entity,   hooks will be executed.
               But if you make use of insert, update or delete to directly insert a record, 
                directly update or directly delete a record, then your hooks will not be executed, 
                which is sometimes not going to be what you expect.
        */
    }

    findOne(id: number) {
        if (!id) return null;
        return this.repo.findOneBy({ id })
    }

    find(email: string) {
        return this.repo.find({ where: { email } })
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException('User Not Found!')
        Object.assign(user, attrs)
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException('User Not Found')
        return this.repo.remove(user)
    }
}

/*
Now ideally we would not throw a plain error object 
because Nest doesn't really know how to extract
any information from that.

Instead, we should be throwing exceptions that are implemented or created by nest, such as the not
found exception, the bad request exception.
*/
