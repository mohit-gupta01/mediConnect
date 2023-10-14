import React from 'react';
import { formateDate } from '../../utils/formateDate';

const DoctorAbout = () => {
    return (
        <div>
            <div className="">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">About of
                    <span className='text-irisBlueColor font-bold text-[24px] leading-9'>Mohit Gupta</span>
                </h3>
                <p className="text__para">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sunt tempora natus nulla culpa praesentium facilis consequatur sed, voluptas alias? Reiciendis est distinctio eligendi veritatis, laborum alias labore unde commodi. Enim repudiandae illo, odit cum eos accusantium quis obcaecati id sunt ipsum minus possimus nesciunt itaque aliquam quam dicta eum.
                </p>
            </div>
            <div className="mt-12">
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education</h3>
                <ul className='pt-4 md:p-5'>
                    <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                        <div>
                            <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formateDate('07-27-2017')} - {formateDate('08-27-2019')}</span>
                            <p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
                        </div>
                        <p className='text-[14px] leading-5 font-medium text-textColor'>New Apollo Hospital, New York.</p>
                    </li>
                    <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                        <div>
                            <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formateDate('12-05-2015')} - {formateDate('06-05-2017')}</span>
                            <p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
                        </div>
                        <p className='text-[14px] leading-5 font-medium text-textColor'>New Apollo Hospital, New York.</p>
                    </li>
                </ul>
            </div>

            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
                    Experience
                </h3>
                <ul>
                    
                </ul>
            </div>
        </div>
    )
}

export default DoctorAbout
