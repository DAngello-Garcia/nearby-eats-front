export class CommentDTO {
    constructor(
        public placeId: string,
        public comment: string,
        public score: number
    ) { }
}
