import '../../css/dashboard.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardSideNav = () => {

    // variables
    const
        dropMenus = document.getElementsByClassName('drop-menu'),
        titles = document.getElementsByClassName('title'),
        angleIcon = document.getElementsByClassName('fa-angle-down'),
        buts = document.getElementsByClassName('but'),
        [screenNum, setScreenNum] = useState(sessionStorage.getItem('screenNumber') ? sessionStorage.getItem('screenNumber') : 0);

    // check which screen is selected for button color
    useEffect(() => {
        screenNum ? buts[screenNum].style.color = 'rgb(209, 174, 111)' : buts[0].style.color = 'rgb(209, 174, 111)' ;
    }, [])

    // control screen content
    function screenControler(e) {
        for(let i = 0; i < buts.length; i++) {
            if(e.currentTarget == buts[i]){
                buts[i].style.color = 'rgb(209, 174, 111)';
                for( let y = 0; y < buts.length; y++) {
                    if( y == i) {
                        setScreenNum(i)
                        sessionStorage.setItem('screenNumber', i);
                    }
                }
            }else{
                buts[i].style.color = 'white'; 
            }
        }
    }

    // control side menu clicks and animations
    function dropMenu(e){
        for(let i = 0; i < titles.length; i++) {
            if( e.currentTarget == titles[i]){ 
                if(dropMenus[i].style.height == 0 || dropMenus[i].style.height == '0px'){
                    dropMenus[i].style.transition = '0.5s';
                    angleIcon[i].style.transition = '0.5s';
                    dropMenus[i].style.height = '72px';
                    angleIcon[i].style.transform = 'rotate(180deg)';
                }else {
                    dropMenus[i].style.height = '0';
                    angleIcon[i].style.transform = 'rotate(0deg)';
                }
            }else{
                dropMenus[i].style.height = '0';
                angleIcon[i].style.transform = 'rotate(0deg)';
            }
        }        
    }

    return (
        <div className='menu pt-5'>
            <ul className='mb-0'>
                <li onClick={screenControler} className='pb-2 but vip'>
                    <Link to='/dashboard' className='text-decoration-none overColor'>
                        <i className="icon pe-2 fa-solid fa-chart-line"></i>    
                        Analytics
                    </Link>
                </li>

                <li>
                    <div onClick={dropMenu} className='title mt-4 drob d-flex justify-content-between align-items-center pe-4'> 
                        <div className='d-flex align-items-center'>
                            <i className="icon pe-2 fa-solid fa-box-archive"></i>
                            <p className='mb-0'>Collections</p>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div> 
                    <ul className='drop-menu pt-2'>
                        <Link to='/dashboard/allCollections' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but'>All Collections</li>
                        </Link>
                        <Link to='/dashboard/updateCollections' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but overColor'>Update Collection</li>
                        </Link>
                    </ul>
                </li>

                <li>
                    <div onClick={dropMenu} className='title mt-4 drob d-flex justify-content-between align-items-center pe-4'> 
                        <div className='d-flex align-items-center'>
                            <i className="icon pe-2 fa-solid fa-shirt"></i>
                            <p className='mb-0'>Products</p>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <ul className='drop-menu pt-2'>
                        <Link to='/dashboard/allProducts' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but'>All Products</li>
                        </Link>
                        <Link to='/dashboard/updateProducts' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but'>Add & Update Products</li>
                        </Link>
                    </ul>
                </li>

                <li>
                    <div onClick={dropMenu} className='title mt-4 drob d-flex justify-content-between align-items-center pe-4'> 
                        <div className='d-flex align-items-center'>
                            <i className="icon pe-2 fa-solid fa-ruler-combined"></i>
                            <p className='mb-0'>Sizes</p>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div> 
                    <ul className='drop-menu pt-2'>
                        <Link to='/dashboard/allSizes' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but'>All Sizes</li>
                        </Link>
                        <Link to='/dashboard/updateSizes' className='text-decoration-none overColor'>
                            <li onClick={screenControler}  className='mb-2 but'>Update Sizes</li>
                        </Link>
                    </ul>
                </li>

                <li>
                    <div onClick={dropMenu} className='title mt-4 drob d-flex justify-content-between align-items-center pe-4'> 
                        <div className='d-flex align-items-center'>
                            <i className="icon pe-2 fa-solid fa-palette"></i>
                            <p className='mb-0'>Colors</p>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div> 
                    <ul className='drop-menu pt-2'>
                        <Link to='/dashboard/allColors' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but'>All Colors</li>
                        </Link>
                        <Link to='/dashboard/updateColors' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but'>Update Colors</li>
                        </Link>
                    </ul>   
                </li>

                <li>
                    <div onClick={dropMenu} className='title mt-4 drob d-flex justify-content-between align-items-center pe-4'> 
                        <div className='d-flex align-items-center'>
                            <i className="icon pe-2 fa-solid fa-mars-and-venus"></i>
                            <p className='mb-0'>Genders</p>
                        </div>
                        <i className="fa-solid fa-angle-down"></i>
                    </div> 
                    <ul className='drop-menu pt-2'>
                        <Link to='/dashboard/allGenders' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but'>All Genders</li>
                        </Link>
                        <Link to='/dashboard/updateGenders' className='text-decoration-none overColor'>
                            <li onClick={screenControler} className='mb-2 but'>Update Genders</li>
                        </Link>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default DashboardSideNav;