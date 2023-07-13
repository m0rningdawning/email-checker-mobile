import MailCore from 'react-native-mailcore';
import {
  MCOIMAPSession,
  MCOIMAPMessagesRequestKind,
} from 'react-native-mailcore';

export const fetchEmails = async credentials => {
  const session = new MCOIMAPSession();
  session.hostname = credentials.imap;
  session.username = credentials.email;
  session.password = credentials.password;
  session.port = 993;
  session.connectionType = MCOConnectionType.TLS;

  try {
    await session.connect();
    await session.login();
    await session.select('INBOX');

    const request = session.fetchMessagesOperation();
    request.requestKind = MCOIMAPMessagesRequestKind.Headers;
    request.predicate = MCOIMAPSearchExpression.searchUnread();

    const messages = await request.start();

    return messages;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    session.disconnect();
  }
};
