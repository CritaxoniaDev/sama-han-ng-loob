import {
  Inter,
  Indie_Flower,
  Caveat,
  Kalam,
  Shadows_Into_Light,
  Patrick_Hand,
  Architects_Daughter,
  Homemade_Apple,
  Gloria_Hallelujah,
  Covered_By_Your_Grace,
  Rock_Salt,
  Reenie_Beanie,
  Sacramento,
  Satisfy,
  Marck_Script,
  Nothing_You_Could_Do,
} from 'next/font/google';
import './globals.css'

const inter = Inter({ subsets: ['latin'] });
const indieFlower = Indie_Flower({ weight: '400', subsets: ['latin'] });
const caveat = Caveat({ subsets: ['latin'] });
const kalam = Kalam({ weight: '400', subsets: ['latin'] });
const shadowsIntoLight = Shadows_Into_Light({ weight: '400', subsets: ['latin'] });
const patrickHand = Patrick_Hand({ weight: '400', subsets: ['latin'] });
const architectsDaughter = Architects_Daughter({ weight: '400', subsets: ['latin'] });
const homemadeApple = Homemade_Apple({ weight: '400', subsets: ['latin'] });
const gloriaHallelujah = Gloria_Hallelujah({ weight: '400', subsets: ['latin'] });
const coveredByYourGrace = Covered_By_Your_Grace({ weight: '400', subsets: ['latin'] });
const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] });
const reenieBeanie = Reenie_Beanie({ weight: '400', subsets: ['latin'] });
const sacramento = Sacramento({ weight: '400', subsets: ['latin'] });
const satisfy = Satisfy({ weight: '400', subsets: ['latin'] });
const marckScript = Marck_Script({ weight: '400', subsets: ['latin'] });
const nothingYouCouldDo = Nothing_You_Could_Do({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: 'Sama ng Loob',
  description: 'A virtual whiteboard for your thoughts',
  icons: {
    icon: '/logow.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
