import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
// import { Exclude } from 'class-transformer';
import { Report } from "src/reports/report.entity";

// console.log('Report:', Report);
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    // @Exclude()
    password: string;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted user with id', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updated user with id', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removed user with id', this.id);
    }
}

/*  In Nest.js, hooks are not explicitly used as 
 they are in some other frameworks.However,
  Nest.js provides lifecycle events that you can 
  use in your providers or controllers.

For example, you can use the @BeforeApplicationShutdown() 
decorator to listen for the application shutdown event.

Similarly, you can use @BeforeInsert(), @BeforeUpdate(),
 and @BeforeRemove() decorators in your entities for
 lifecycle hooks related to database operations. */

/*
If we try to update a user or if we try to remove an existing user, 
I want to do a console log. that says we are updating, saving, whatever.
 
One way we can very easily implement this is by using a feature inside of type called hooks.
Hooks allow us to define functions on an entity that will be called automatically at certain points
in time.
*/

