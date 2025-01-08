export enum Role {
    ADMIN = "A",
    USER = "U"
}

export class Person {
    uid: string;
    name: string;
    surname: string;
    email: string;
    role: Role;
    createAt: string;

    constructor(uid: string, name: string, surname: string, email: string, role: Role, createAt: string) {
        this.uid = uid;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.createAt = createAt;
    }



}