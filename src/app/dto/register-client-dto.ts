export class RegisterClientDTO {
    constructor(
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public password: string = '',
        public nickname: string = '',
        public city: string = '',
        public profilePicture: string = '',
        public confirmPassword: string = ''
    ) { }
}
