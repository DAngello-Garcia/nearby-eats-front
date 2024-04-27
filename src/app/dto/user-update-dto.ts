export class UserUpdateDTO {
    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public city: string = '',
        public profilePicture: string = ''
    ) {}
}
