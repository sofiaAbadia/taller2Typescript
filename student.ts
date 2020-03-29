export class Student {
    name: string;
    avatar: string;
    code: number;
    id: number;
    age: number;
    address: string;
    phone: string;

    constructor(name: string, avatar: string,code: number, id: number, age: number, address: string, phone: string){
        this.name = name;
        this.avatar = avatar;
        this.code = code;
        this.id = id;
        this.age = age;
        this.address = address;
        this.phone = phone;
    }
}