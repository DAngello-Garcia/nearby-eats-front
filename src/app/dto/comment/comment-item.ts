import { ReplyItem } from './reply-item';

export class CommentItem {
  constructor(
    public id: string,
    public date: string,
    public clientId: string,
    public text: string,
    public score: number,
    public reply: ReplyItem
  ) {}
}
