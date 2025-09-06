import { UserData } from '../storeModels';

export const mockUserData = {
  lastname: 'Smirlian',
  reportsIds: ['KwV07xt8yzkHZf58G5nk'],
  photoUrl: 'https://i.pinimg.com/736x/f6/aa/24/f6aa2407d3ca6532e0304d6cd0e9291d.jpg',
  friendsIds: ['SAbeLh2HO6vG8e3Cbj8O'],
  name: 'Nacho',
  uid: 'lIFIUWmdefPH53nFLq1KUSukNkV2',
  friends: [
    {
      name: 'Test',
      lastname: 'User',
      userId: 'SAbeLh2HO6vG8e3Cbj8O',
    },
    {
      name: 'Lucas',
      lastname: 'Rodriguez',
      userId: '23241535',
      photoUrl: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/D3YPHLTV6NDRHEHKMARK5KOCJU.JPG',
    },
    {
      name: 'German',
      lastname: 'Beder',
      userId: '1111111',
      photoUrl: 'https://www.nexofin.com/archivos/2023/03/german-beder-foto-nota.jpg',
    },
    {
      name: 'Rober',
      lastname: 'Galati',
      userId: '999999',
      photoUrl:
        'https://media.losandes.com.ar/adjuntos/368/migration/resizer/v2/WLB2TBHFP5EBHNC57TIAGPUPHI.jpg?auth=57d4367f6abf3b0d2dca3b5497a310b13b418ba32314d343d41a35671a81bcb5&width=1080&height=1350',
    },
  ],
  reports: [
    {
      active: true,
      name: 'Compras Agosto',
      type: 'household',
      users: [
        {
          contributionsIds: ['yJazMKwti1iqAxxt0pKS', '2Bw3wYZv5K2oK5mUmZZd'],
          fixedPercentage: 50,
          userId: 'SAbeLh2HO6vG8e3Cbj8O',
          name: 'Test',
          lastname: 'User',
          contributions: [
            {
              date: '2025-10-12T19:20:00-03:00',
              amount: 24300,
              reportId: 'KwV07xt8yzkHZf58G5nk',
              userId: 'SAbeLh2HO6vG8e3Cbj8O',
              description: 'Verduleria',
              receiptPhotoUrl: 'https://ocr.space/Content/Images/receipt-ocr-original.webp',
            },
            {
              date: '2025-10-25T19:20:00-03:00',
              amount: 10000,
              reportId: 'KwV07xt8yzkHZf58G5nk',
              userId: 'SAbeLh2HO6vG8e3Cbj8O',
              description: 'Carniceria',
            },
          ],
        },
        {
          fixedPercentage: 50,
          contributionsIds: ['2aOqTSzwcpbQ5azIOAEv'],
          userId: 'lIFIUWmdefPH53nFLq1KUSukNkV2',
          name: 'Nacho',
          photoUrl:
            'https://static.wikia.nocookie.net/swfanon/images/e/e1/Obiwankenobi_dsws.jpg/revision/latest?cb=20081204152935',
          lastname: 'Smirlian',
          contributions: [
            {
              reportId: 'KwV07xt8yzkHZf58G5nk',
              amount: 78000,
              receiptPhotoUrl: 'https://www.docuclipper.com/wp-content/uploads/Receipt-Example-1018x1440.jpg',
              description: 'Test contribution',
              date: '2025-10-10T09:00:00-03:00',
              userId: 'lIFIUWmdefPH53nFLq1KUSukNkV2',
            },
          ],
        },
      ],
      id: 'KwV07xt8yzkHZf58G5nk',
      creator: {
        name: 'Nacho',
        lastname: 'Smirlian',
        photoUrl: '',
      },
    },
  ],
} as UserData;
