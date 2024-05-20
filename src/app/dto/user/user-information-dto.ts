export class 
UserInformationDTO {

    constructor(
        public id: string = '',
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public nickname: string = '',
        public city: string = '',
        public profilePicture: string = '',
        public favoritePlaces: string[] = []
    ) {}
}
