import React, { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../Models/Config";
import axios from "axios";
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";

const Gender = () => {

    const [genders, setGenders] = useState([]);
    const [select, setSelect] = useState(false);
    const [data, setData] = useState({});
    const [page, setPage] = useState(0);
    const [choose, setChoose] = useState(0)

    useEffect(() => {
        axios({
            baseURL: SERVER_ADDRESS + '/api/Value/Gender',
            method: "GET"
        }).then((response) => {
            if (response.status === 200) {
                setGenders(response.data)
            }
        });
    }, []);

    useEffect(() => {
        if (select || (data.hasOwnProperty("pageIndex") && data.pageIndex !== page)) {
            const value = genders[choose];
            axios({
                baseURL: SERVER_ADDRESS + '/api/Population/Gender?value=' + value + (page === 0 ? "" : '&page=' + page),
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
                    {genders.map((item, index) => <p key={index}
                        className={"text-center border rounded py-2" + (select && index === choose ? " bg-primary text-light" : "")}
                        onClick={event => { setSelect(true); setChoose(index); setPage(1); }} role="button">
                        {item}
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
                                                    Tid
                                                </th>
                                                <th className="border-0">
                                                    R??kna
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.recordes.map((item, index) => <tr key={index}><td><Link className="text-decoration-none" to={"/region/" + item.region}>{item.region}</Link></td><td>{item.year}</td><td>{item.count}</td></tr>)}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination total={data.totalPages} current={page} onClick={setPage} />
                            </div>
                            :
                            <h3 className="text-center">V??nligen V??lja k??n</h3>
                    }
                </div>
            </div>
        </div>

    );

};

export default Gender;