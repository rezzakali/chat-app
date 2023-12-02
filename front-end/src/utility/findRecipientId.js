const findRecipientId = (chat, loggedInUserId) => {
  let recipientId = null;

  if (chat && loggedInUserId) {
    recipientId = chat?.members?.find((id) => id !== loggedInUserId);
    return recipientId;
  }
};

export default findRecipientId;
