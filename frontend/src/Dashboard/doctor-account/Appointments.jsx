/* eslint-disable react/prop-types */

import { formateDate } from "../../utils/formateDate";

const Appointments = ({ appointments }) => {
    return (
        <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th className="px-6 py-3" scope="col">
                        Name
                    </th>
                    <th className="px-6 py-3" scope="col">
                        Gender
                    </th>
                    <th className="px-6 py-3" scope="col">
                        Payment
                    </th>
                    <th className="px-6 py-3" scope="col">
                        Price
                    </th>
                    <th className="px-6 py-3" scope="col">
                        Booked on
                    </th>
                </tr>
            </thead>
            <tbody className="">
                {appointments?.map(item => <tr key={item._id}>
                    <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap" scope="row">
                        <img src={item.user.photo} alt="" className="w-10 h-10 rounded-full" />
                        <div className="pl-3">
                            <div className="text-base font-semibold ">{item.user.name}</div>
                            <div className="text-normal text-gray-500">{item.user.email}</div>
                        </div>
                    </th>
                    <td className="px-6 py-4">{item.user.gender}</td>
                    <td className="px-6 py-4">
                        {item.isPaid && <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2
                            "></div>
                            Paid
                        </div>}
                        {!item.isPaid && <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2
                            "></div>
                            Unpaid
                        </div>}
                    </td>
                    <td className="px-6 py-4">{item.ticketPrice}</td>
                    <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
                </tr>)}
            </tbody>
        </table>
    )
}

export default Appointments;