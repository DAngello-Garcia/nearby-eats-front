export class PlaceReviewDTO {

    constructor(
        public action: string,
        public commentary: string,
        public placeId: string
    ) { }
}
