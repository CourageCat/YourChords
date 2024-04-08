import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import React from "react";
import styles from "./SideBar.module.scss";
import classNames from "classnames/bind";
import { Sidebar } from "react-pro-sidebar";
const cx = classNames.bind(styles);
const SideBar = ({listGenres, listMusicianName, handleSearchByGenres, handleSearchByMusicianName, page}) => {
    console.log("Page" + page)
    if(page === 1)
    return (
        <div style={{ height: "100%", zIndex:'0' }}>
            <div className={cx("aside-1")} style={{ height: "100%" }}>
                <Sidebar className={cx("sidebar")}>
                    <Menu className={cx("menu-item")}>
                        <MenuItem className="menu1">
                            <h2>List Beat</h2>
                        </MenuItem>                
                        <SubMenu label="Genre">
                            {listGenres.map((item) => {
                                return <MenuItem onClick={() => handleSearchByGenres(item.name)} > {item.name}</MenuItem>
                            })}
                        </SubMenu>
                        {console.log(listMusicianName)}
                        <SubMenu label="Musician">
                            {listMusicianName.map((item) => {
                                return <MenuItem onClick={() => handleSearchByMusicianName(item)}>{item}</MenuItem>
                            })}
                        </SubMenu>
                    </Menu>
                </Sidebar>
            </div>
        </div>
    );
    else{
        return (
        <div style={{ height: "100%", zIndex:'0' }}>
            <div className={cx("aside-1")} style={{ height: "100%" }}>
                <Sidebar className={cx("sidebar")}>
                    <Menu className={cx("menu-item")}>
                        <MenuItem className="menu1">
                            <h2>List Beat</h2>
                        </MenuItem>                
                        <SubMenu label="Genre">
                            {listGenres.map((item) => {
                                return <MenuItem> {item.name}</MenuItem>
                            })}
                        </SubMenu>
                        {console.log(listMusicianName)}
                        <SubMenu label="Musician">
                            {listMusicianName.map((item) => {
                                return <MenuItem>{item}</MenuItem>
                            })}
                        </SubMenu>
                    </Menu>
                </Sidebar>
            </div>
        </div>)
    }
};
export default SideBar;