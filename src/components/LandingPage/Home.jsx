import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import ContactUs from './ContactUs';

function Home() {
    return (
        <div className='main-div'>
            <HeroSection/>
            <FeatureSection/>
            <ContactUs/>
        </div>
    );
}

export default Home;
