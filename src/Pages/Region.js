import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { SERVER_ADDRESS } from "../Models/Config";

const Region = () => {
    const parameters = useParams();
    const [page, setPage] = useState(1);
    const [data, setData] = useState({});

    useEffect(() => {
        if (!data.hasOwnProperty('recordes') || (data.hasOwnProperty('pageIndex') && data.pageIndex !== page)) {
            axios({
                baseURL: SERVER_ADDRESS + '/api/Population/Region?value=' + encodeURI(parameters.name) + '&page=' + page,
                method: "GET"
            }).then(response => {
                setData(response.data);
                setPage(response.data.pageIndex);
            });
        }
    }, [page]);

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        {
                            data.hasOwnProperty('recordes') ?
                                <div className="table-responsive">
                                    <table className="table table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th className="border-0">
                                                    Tid
                                                </th>
                                                <th className="border-0">
                                                    Count
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.recordes.map((item, index) => <tr key={index}><td>{item.year}</td><td>{item.count}</td></tr>)}
                                        </tbody>
                                    </table>
                                    <Pagination total={data.totalPages} current={page} onClick={setPage} />
                                </div> :
                                <h3 className="text-center">Please wait to load data</h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Region;