import './menu.css';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';
function Menu(props) {
    // 获取当前激活的路由;
    const activeRoute = useSelector(state => state.activeRoute);
    // 控制菜单栏是否展开
    const { changeOpen } = props;

    const dispatch = useDispatch();

    // 菜单栏数据
    const [menuList, setMenuList] = useState([
        {
            label: '主页',
            path: '/home',
            child: [
                { label: '页面a', path: '/home/pagea' },
                { label: '页面b', path: '/home/pageb' },
                { label: '页面c', path: '/home/pagec' },
            ]
        },
        {
            label: '工作台',
            path: '/workbench',
            child: [
                { label: '页面d', path: '/workbench/paged' },
            ]
        },
        {
            label: '系统配置',
            path: '/setting',
            child: [
                { label: '页面e', path: '/setting/pagee' },
            ]
        }
    ]);

    /**
     * 切换路由
     * @param {*} path 
     * @param {*} index 
     */
    function to(path, index) {
        // 有这个参数说明是点击父路由，转换成该父路由下的第一个子路由
        if (index) {
            // 这里 -1 是因为 0 被判断为 false,所以 index 之前都 +1 了
            path = menuList[index - 1].child[0].path;
        }
        props.history.push(path);
        dispatch({ type: 'setActiveRoute', activeRoute: path });
    }

    /**
     * 鼠标进入事件
     * @param {*} fatherRoute 
     */
    function onMouseEnter(fatherRoute) {
        if (!fatherRoute['showChild']) {
            fatherRoute['showChild'] = true;
            setMenuList([...menuList]);
        }
    }

    /**
     * 鼠标移出事件
     * @param {*} fatherRoute 
     */
    function onMouseLeave(fatherRoute) {
        if (fatherRoute['showChild']) {
            fatherRoute['showChild'] = false;
            setMenuList([...menuList]);
        }
    }
    return (
        <div className={changeOpen ? 'menu-main' : 'menu-main menu-hidden'}>
            <ul>
                {menuList.map((fatherRoute, index) => (
                    <li onClick={() => to(fatherRoute.path, index + 1)} className={activeRoute.indexOf(fatherRoute.path) !== -1 ? 'activeRoute fatherRoute' : 'fatherRoute'} key={fatherRoute.path}
                        onMouseEnter={() => onMouseEnter(fatherRoute)} onMouseLeave={() => onMouseLeave(fatherRoute)}>
                        {fatherRoute.label}
                        <div className={fatherRoute['showChild'] ? 'subMenu show' : 'subMenu'}
                        >
                            <ul>
                                {fatherRoute.child.map((childRoute) => (
                                    <li onClick={e => {
                                        e.stopPropagation();
                                        to(childRoute.path)
                                    }
                                    }
                                        className={activeRoute.indexOf(childRoute.path) !== -1 ? 'activeRoute childRoute' : 'childRoute'} key={childRoute.path}>
                                        {childRoute.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default withRouter(Menu)