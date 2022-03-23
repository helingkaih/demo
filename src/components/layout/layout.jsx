import './layout.css';
import React, { useState } from "react";
import Menu from "../menu/menu";
import Head from "../head/head";
import { renderRoutes } from 'react-router-config';
import routeConfig from '../../route/route';
import { HashRouter } from 'react-router-dom';
export default function Layout(props) {
    // 菜单栏展开收起状态
    const [changeOpen, setChangeOpen] = useState(true);

    /**
     * 通知 Menu 组件控制菜单栏
     */
    function open() {
        setChangeOpen(!changeOpen)
    }

    return (
        <HashRouter>
            <div className="layout-main">
                <div>
                    <Menu changeOpen={changeOpen} />
                </div>
                <div className='right'>
                    <Head open={open} />
                    <div className='main-content'>
                        {renderRoutes(routeConfig)}
                    </div>
                </div>
            </div>
        </HashRouter>

    )
}