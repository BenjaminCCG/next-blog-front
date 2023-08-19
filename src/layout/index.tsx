import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import Footer from './Footer';
import HeadNav from './HeadNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <HeadNav />
      <div
        className=" flex-auto"
        style={{
          background: 'linear-gradient(225deg,#ffdee9,#b5fffc)'
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
