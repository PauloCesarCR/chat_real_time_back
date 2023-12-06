export default class Message {
    constructor(
        readonly user_origem_id: number,
        readonly message: string,
        readonly date: Date,
        readonly room_id: number
    ) {

    }
}