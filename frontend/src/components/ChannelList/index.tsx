// import { useEffect, useState } from 'react';
// import api from '../../Services/api';
// import ChannelButton from '../../infra/domain/channelBuntton/useCase/channelBunttonServer';

// import '../../infra/i18n/i18n'
// import { useTranslation } from 'react-i18next';

// import { Container, Category, AddCategoryIcon } from './styles'



// export default function ChannelList() {
//     const { t } = useTranslation();

//     const [channels, setChannels] = useState<channel[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchChannels() {
//             try {
//                 const response = await api.get('/channels');
//                 setChannels(response.data);
//             } catch (error) {
//                 console.error('Error retrieving backend channels:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchChannels();
//     }, []);

//     return (
//         <Container>
//             <Category>
//                 <span>{t("Canais de texto")}</span>
//                 <AddCategoryIcon />
//             </Category>

//             {loading ? (
//                 <p style={{ color: 'var(--gray)', padding: '0 16px', fontSize: '13px' }}>Carregando canais...</p>
//             ) : channels.length === 0 ? (
//                 <p style={{ color: 'var(--gray)', padding: '0 16px', fontSize: '13px' }}>Nenhum canal criado</p>
//             ) : (
//                 channels.map((channel) => (
//                     <ChannelButton
//                         key={channel.id}
//                         ChannelName={channel.name}
//                     />
//                 ))
//             )}
//         </Container>
//     );
// }