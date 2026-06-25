// import { useEffect, useState, useRef, type KeyboardEvent } from 'react';
// import api from '../../Services/api';
// import ChannelMessage from '../ChannelMessage';

// import '../../infra/i18n/i18n'
// import { useTranslation } from 'react-i18next';

// import { Container, Message, InputWrapper, Input, InputIcon } from './styles';



// export default function ChannelData() {
//     const { t } = useTranslation();

//     const [messages, setMessages] = useState<MessageBackend[]>([]);
//     const [inputText, setInputText] = useState('');
//     const messagesRef = useRef<HTMLDivElement>(null);
//     const currentChannelId = 1;

//     useEffect(() => {
//         async function fetchMessages() {
//             try {
//                 const response = await api.get<MessageBackend[]>(`/messages/${currentChannelId}`);
//                 setMessages(response.data);
//             } catch (error) {
//                 console.error('Error retrieving messages:', error);
//             }
//         }

//         fetchMessages();
//     }, [currentChannelId]);

//     useEffect(() => {
//         const div = messagesRef.current;
//         if (div) {
//             div.scrollTop = div.scrollHeight;
//         }
//     }, [messages]);

//     async function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
//   if (event.key === 'Enter' && inputText.trim() !== '') {
//     try {
//       await api.post('/messages', {
//         content: inputText,
//         userId: 1, 
//         channelId: currentChannelId 
//       });
//       setInputText('');
      
//       const response = await api.get<MessageBackend[]>(`/messages/${currentChannelId}`);
//       setMessages(response.data);

//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   }
// }

//     return (
//         <Container>
//             <Message ref={messagesRef}>
//                 {messages.length === 0 ? (
//                     <p style={{ color: 'var(--gray)', padding: '16px' }}>Nenhuma mensagem enviada ainda neste canal.</p>
//                 ) : (
//                     messages.map((msg) => (
//                         <ChannelMessage
//                             key={msg.id}
//                             author={msg.user.nickname}
//                             date={new Date(msg.createdAt).toLocaleDateString('pt-BR')}
//                             content={msg.content}
//                             isBot={msg.user.isBot}
//                             avatarUrl={msg.user.avatar}
//                         />
//                     ))
//                 )}
//             </Message>

//             <InputWrapper>
//                 <Input
//                     type="text"
//                     placeholder={t("Digite uma mensagem e aperte Enter")}
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                 />
//                 <InputIcon />
//             </InputWrapper>
//         </Container>
//     );
// }