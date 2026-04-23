import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PackageHome from '../Package/PackageHome';
import GuideHome from '../Guide/GuideHome';
import { FiPackage, FiUsers } from 'react-icons/fi';

const PackageGuideHome = () => {
    return (
        <section className="section bg-ink-50/50">
            <div className="container-page">
                <div className="max-w-3xl mx-auto text-center mb-10">
                    <span className="eyebrow">Discover</span>
                    <h2 className="heading-lg mt-4">Packages & Expert Guides</h2>
                    <p className="lead mt-4">
                        Browse curated trips or meet the people who'll bring them to life.
                    </p>
                </div>

                <Tabs>
                    <TabList className="flex justify-center gap-2 mb-10 flex-wrap">
                        <Tab className="cursor-pointer">
                            <span className="inline-flex items-center gap-2">
                                <FiPackage /> Our Packages
                            </span>
                        </Tab>
                        <Tab className="cursor-pointer">
                            <span className="inline-flex items-center gap-2">
                                <FiUsers /> Meet Our Guides
                            </span>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <PackageHome />
                    </TabPanel>
                    <TabPanel>
                        <GuideHome />
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    );
};

export default PackageGuideHome;
