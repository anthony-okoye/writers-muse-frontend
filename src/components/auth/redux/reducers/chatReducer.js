import { CLEAR_CONVERSATION } from '../actions/chatActions';

const initialState = {
  currentConversationId: null,
  chatThread: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CONVERSATION:
      return {
        ...state,
        currentConversationId: null,
        chatThread: [],
      };
      case 'UPDATE_CHAT_THREAD':
      return {
        ...state,
        chatThread: action.payload, // Update chat thread with new messages
      };
    default:
      return state;
  }
};

export default chatReducer;
