import { Location } from '../clases/location';
import { Review } from '../clases/review';
import { Schedule } from '../clases/schedule';

export class ItemNegocioDTO {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public location: Location = new Location('', []),
    public pictures: string[] = [],
    public schedule: Schedule[] = [],
    public phones: string[] = [],
    public categories: string[] = [],
    public review: Review[] = [],
    public createdBy: string = '',
    public status: string = '',
    public score: number = 0,
    public isOpen: boolean = false,
  ) { }
}
