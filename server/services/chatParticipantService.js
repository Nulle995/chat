import { ChatParticipantModel } from "../models/chatParticipantModel.js";

export class ChatParticipantService {
  static async join({ username, room }) {
    try {
      const joinedUser = await ChatParticipantModel.join({ username, room });
    } catch (e) {
      console.log(e);
    }
  }

  static async getParticipantsFromRoom({ room }) {
    const participants = await ChatParticipantModel.getParticipantsFromRoom({
      room,
    });
    return participants;
  }
}
