import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind"
import styles from "./ViewIncome.module.scss"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axiosInstance from '../../authorization/axiosInstance'
import useToken from '../../authorization/useToken'
import jwtDecode from 'jwt-decode'
import Pagination from '../../components/Pagination'
import CardBeatItem from "../../components/CardBeatItem";
import { useNavigate } from 'react-router-dom'
import ListSplitter from '@/components/ListSplitter'

const cx = classNames.bind(styles)

function ViewIncome() {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [msOrders, setMsOrders] = useState([])
  const [income, setIncome] = useState(0)
  const token = useToken()
  const navigate = useNavigate()
  let userId = ""
  if (token) {
    userId = jwtDecode(token).sub
  }

  useEffect(() => {
    const loadMsOrders = async () => {
      if (!token) {
        navigate("/login")
        return
      }
      await axiosInstance.get(`http://localhost:8080/api/v1/request/beat/income/detail/${userId}`)
        .then((res) => {
          if (res.data.length === 0) {
            setMsOrders(res.data)
          }
          else {
            const newGroup = ListSplitter({ data: res.data, groupSize: 4 })
            for (let i = 0; i < newGroup.length; i++) {
              if (page === i + 1) {
                setMsOrders(newGroup[i])
              }
            }
            setPages(newGroup.length)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    loadMsOrders()
  }, [page])

  useEffect(() => {
    loadIncome()
  }, [])

  const loadIncome = async () => {
    await axiosInstance.get(`http://localhost:8080/api/v1/request/beat/income/${userId}`)
      .then((res) => {
        setIncome(res.data.price)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div style={{ marginTop: 100, marginBottom: 600, display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column" }}>
      <div style={{ margin: "0px" }} className={cx("text-header")} >
        <h1 style={{ margin: "0px" }} className={cx("text-welcome")}>
          My Income
        </h1>
      </div>

      <h1>Income: ${income}</h1>

      <section className={cx("shop-card")}>
        {/* Header */}




        {msOrders.length !== 0 ?
          <div>

            {/* <div className={cx("card-names")}> */}

            <table className={cx("table-frame")}>
              <tr className={cx("table-header")} >
                <th className={cx("th-frame")}>IMAGE</th>
                <th className={cx("th-frame")}>STT</th>
                <th className={cx("th-frame")}>BEATNAME</th>
                <th className={cx("th-frame")}>CREATED AT</th>
                <th className={cx("th-frame")}>USERNAME</th>
                <th className={cx("th-frame")}>PRICE ($)</th>
                <th className={cx("th-frame")}>STATUS</th>
              </tr>
              {/* </div> */}
              {/* <div className={cx("list-card")}> */}
              <tbody>


                {msOrders.map((item, index) => {
                  const dateReleasing = new Date(item.creatAt);
                  const month = dateReleasing.getUTCMonth() + 1;
                  const day = dateReleasing.getUTCDate();
                  const year = dateReleasing.getUTCFullYear();

                  return (<tr >

                    <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <img src={require("../../assets/images/Other/beat-trong-am-nhac-la-gi1.jpg")} className={cx("card-img")} alt="anh dep" />
                      
                    </td>

                    <td>
                      <div>{index + 1}.</div>
                    </td>

                    <td>

                      {item.beatName}
                    </td>
                    <td>{`${day}/${month}/${year}`}</td>
                    <td>{item.userName.fullName}</td>
                    <td>{item.price}$</td>
                    {item.status === -2 ?
                      <td style={{ color: "red" }}>Canceled</td>
                      : item.status === -1 ?
                      <td style={{ color: "green" }}>Completed</td>
                        : <td style={{ color: "orange" }}>Prepaid</td>}
                  </tr>
                    // <CardBeatItem
                    //   id={item.id}
                    //   name={item.beatName}
                    //   author={item.orderInformation.userId.fullName}
                    //   date={item.orderInformation.createAt}
                    //   price={item.price}
                    //   beatId={item.id}

                    // />
                  );


                })}
              </tbody>
            </table>
            {pages !== 1 ?
              <div className={cx("pagination")}>
                <Pagination pages={pages} page={page} setPage={setPage} />
              </div>
              : <div></div>}

            {/* </div> */}
          </div> : <div style={{ zindex: '1', fontSize: 20 }}>You are not ordered by any customer!</div>}
      </section>
    </div>
  );
}

export default ViewIncome