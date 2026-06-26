// import { useEffect, useState } from 'react';
// import api from '../../Services/api'; 

// import '../../infra/i18n/i18n'
// import { useTranslation } from 'react-i18next';

// import { 
//     Container, 
//     Profiler, 
//     Avatar, 
//     UserData, 
//     Icons, 
//     MicIcon, 
//     HeadphoneIcon, 
//     SettingsIcon  } from './styles';


// export default function UserInfo() {
//   const { t } = useTranslation();

//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const response = await api.get<User[]>('/users');
        
//         if (response.data.length > 0) {
//           setUser(response.data[0]);
//         }
//       } catch (error) {
//         console.error('Error searching for user:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchUser();
//   }, []);

//   if (loading) {
//     return (
//       <Container>
//         <Profiler>
//           <UserData><strong>{t('Carregando...')}</strong></UserData>
//         </Profiler>
//       </Container>
//     );
//   }

//   if (!user) {
//     return (
//       <Container>
//         <Profiler>
//           <UserData><strong>{t('Nenhum usuário')}</strong></UserData>
//         </Profiler>
//       </Container>
//     );
//   }

//   const userTag = `#${String(user.id).padStart(4, '0')}`;

//   return (
//     <Container>
//         <Profiler>
//             <Avatar style={{ backgroundImage: user.avatar ? `url(${user.avatar})` : undefined }} />
//             <UserData>
//                 <strong>{user.nickname}</strong>
//                 <span>{userTag}</span>
//             </UserData>
//         </Profiler>

//         <Icons>
//             <MicIcon/>
//             <HeadphoneIcon/>
//             <SettingsIcon/> 
//         </Icons>
//     </Container>
//   );
// }