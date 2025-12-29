
import type { Campaign, NFTBadge, EarnedBadge } from './types';
import { addDays } from 'date-fns';

export const MOCK_USER_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
export const MOCK_CREATOR_ADDRESS = '0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6';

export const AVAILABLE_BADGES: NFTBadge[] = [
    {
        id: 'pioneer',
        name: 'Pioneer Backer',
        description: 'Awarded for being one of the first 10 backers of a campaign.',
        icon: 'Rocket'
    },
    {
        id: 'top-contributor',
        name: 'Top Contributor',
        description: 'Awarded for being the top contributor to a campaign.',
        icon: 'Crown'
    },
     {
        id: 'generous-supporter',
        name: 'Generous Supporter',
        description: 'Awarded for contributing more than 10 ETH to a campaign.',
        icon: 'Gem'
    }
]

export const MOCK_EARNED_BADGES: EarnedBadge[] = [
    {
        badge: AVAILABLE_BADGES.find(b => b.id === 'pioneer')!,
        campaignTitle: 'Aqua-Pure: Clean Water for Everyone',
        timestamp: new Date().getTime()
    }
]

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    owner: MOCK_CREATOR_ADDRESS,
    title: 'Project Phoenix: The Future of Renewable Energy',
    description:
      'Project Phoenix is a groundbreaking initiative to develop and deploy a new generation of solar panels that are 50% more efficient than current technology. Our team of world-class engineers and scientists has already created a working prototype. We are seeking funding to scale up production and bring this revolutionary technology to the world, helping to combat climate change and create a sustainable future for all.',
    summary:
      'A campaign to fund the production of highly efficient, next-generation solar panels.',
    target: 100,
    deadline: addDays(new Date(), 30).getTime(),
    amountCollected: 75,
    image: 'https://picsum.photos/seed/phoenix/600/400',
    contributors: [
      { address: '0x2N34...5678', amount: 25 },
      { address: '0x9R3T...1234', amount: 50 },
    ],
    state: 'fundraising',
  },
  {
    id: 2,
    owner: '0x4cB8...8eF4',
    title: 'Aqua-Pure: Clean Water for Everyone',
    description:
      'Millions of people around the world lack access to clean and safe drinking water. Aqua-Pure is a portable, affordable water filtration system that can remove over 99.9% of bacteria and viruses. We have a finalized design and are ready for mass production. Your contribution will help us manufacture and distribute Aqua-Pure systems to communities in need, saving lives and improving health on a global scale.',
    summary:
      'Funding the mass production of a portable, life-saving water filtration system for communities in need.',
    target: 50,
    deadline: addDays(new Date(), 45).getTime(),
    amountCollected: 20,
    image: 'https://picsum.photos/seed/aquapure/600/400',
    contributors: [{ address: MOCK_USER_ADDRESS, amount: 20 }],
    state: 'fundraising',
  },
  {
    id: 3,
    owner: '0x7aC9...3dEa',
    title: 'CodeConnect: Teaching Kids to Code',
    description:
      "CodeConnect is a free, open-source platform designed to teach children the fundamentals of programming through interactive games and challenges. We believe that coding is an essential skill for the 21st century. Funds will be used to expand our curriculum, add support for more languages, and develop a mobile app to make learning accessible to even more kids worldwide.",
    summary:
      'Help expand a free, open-source platform that teaches children programming through fun and interactive games.',
    target: 25,
    deadline: addDays(new Date(), 15).getTime(),
    amountCollected: 28,
    image: 'https://picsum.photos/seed/codeconnect/600/400',
    contributors: [
      { address: '0x8F9G...1H2J', amount: 10 },
      { address: '0x3K4L...5M6N', amount: 18 },
    ],
    state: 'successful',
  },
    {
    id: 4,
    owner: '0xBd79...7fD2',
    title: 'Bio-Synth: The Next Frontier in Medicine',
    description:
      'This campaign failed to meet its goal. Bio-Synth aimed to research novel biosynthetic pathways for creating life-saving drugs at a fraction of the current cost. The project showed promise but did not attract enough funding before the deadline.',
    summary:
      'A research project for cost-effective drug synthesis that did not meet its funding goal.',
    target: 200,
    deadline: addDays(new Date(), -5).getTime(),
    amountCollected: 40,
    image: 'https://picsum.photos/seed/biosynth/600/400',
    contributors: [
      { address: MOCK_USER_ADDRESS, amount: 15 },
      { address: '0x9R3T...1234', amount: 25 },
    ],
    state: 'expired',
  },
];
