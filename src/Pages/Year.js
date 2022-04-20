import React, { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../Models/Config";
import axios from "axios";
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";

const Year = () => {
    const [years, setYears] = useState([]);
    const [select, setSelect] = useState(false);
    const [choose, setChoose] = useState(0);
    const [data, setData] = useState({});
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios({
            baseURL: SERVER_ADDRESS + '/api/Value/Year',
            method: "GET"
        }).then((response) => {
            if (response.status === 200) {
                setYears(response.data.recordes)
            }
        });
    }, []);

    useEffect(() => {
        if (select || (data.hasOwnProperty("pageIndex") && data.pageIndex !== page)) {
            const value = years[choose].number;
            axios({
                baseURL: SERVER_ADDRESS + '/api/Population/Year?value=' + value + (page === 0 ? "" : '&page=' + page),
                method: "GET"
            }).then(response => {
                if (response.status === 200) {
                    setData(response.data);
                    setPage(response.data.pageIndex);
                }
            });
        }
    }, [choose, page]);

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-12 col-lg-3">
                    {years.map((item, index) => <p key={index}
                        className={"text-center border rounded py-2" + (select && index === choose ? " bg-primary text-light" : "")}
                        onClick={event => { setSelect(true); setChoose(index); setPage(1); }} role="button">
                        {item.number}
                    </p>)}
                </div>
                <div className="col-12 col-lg-9">
                    {
                        data.hasOwnProperty("totalPages") ?

                            <div>
                                <div className="table-responsive">
                                    <table className="table table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th className="border-0">
                                                    Region
                                                </th>
                                                <th className="border-0">
                                                    Räkna
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.recordes.map((item, index) => <tr key={index}><td><Link className="text-decoration-none" to={"/region/" + item.region}>{item.region}</Link></td><td>{item.count}</td></tr>)}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination total={data.totalPages} current={page} onClick={setPage} />
                            </div>
                            :
                            <h3 className="text-center">Vänligen välja tid</h3>
                    }
                </div>
            </div>
        </div>

    );
};

export default Year;