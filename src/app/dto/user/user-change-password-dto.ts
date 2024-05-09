export class UserChangePasswordDTO {

    constructor(
        public newPassword: string = '',
        public recoveryToken: string = '',
        public confirmPassword: string = ''
    ){}
}
