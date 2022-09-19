import '../../css/dashboard.css';
import { Route } from 'react-router-dom';
import DashboardTopNav from './DashboardTopNav';
import DashboardSideNav from './DashboardSideNav';
import Analytics from './Analytics';
import AllCollections from './AllCollections';
import AllColors from './AllColors';
import AllGenders from './AllGenders';
import AllProducts from './AllProducts';
import AllSizes from './AllSizes';
import UpdateCollections from './UpdateCollections';
import UpdateColors from './UpdateColors';
import UpdateGenders from './UpdateGenders';
import UpdateProducts from './UpdateProducts';
import UpdateSizes from './UpdateSizes';

const Dashboard = () => {
    return (
        <>
            <DashboardTopNav />
            <div className='row gx-0 w-100' style={{backgroundColor: '#F5F7FB'}}>
                <div className='side-nav col-2'>
                    <DashboardSideNav />
                </div>
                <div className='screen container col-10 p-5'>
                    <Route exact path='/dashboard' component={Analytics} />
                    <Route path='/dashboard/allCollections' component={AllCollections} />
                    <Route path='/dashboard/allColors' component={AllColors} />
                    <Route path='/dashboard/allGenders' component={AllGenders} />
                    <Route path='/dashboard/allProducts' component={AllProducts} />
                    <Route path='/dashboard/allSizes' component={AllSizes} />
                    <Route path='/dashboard/updateCollections' component={UpdateCollections} />
                    <Route path='/dashboard/updateColors' component={UpdateColors} />
                    <Route path='/dashboard/updateGenders' component={UpdateGenders} />
                    <Route path='/dashboard/updateProducts' component={UpdateProducts} />
                    <Route path='/dashboard/updateSizes' component={UpdateSizes} />
                </div>
            </div>
        </>
    );
}
 
export default Dashboard;