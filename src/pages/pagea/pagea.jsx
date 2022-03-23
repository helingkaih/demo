import './pagea.css';
import { useEffect, useState } from 'react';
import req from '../../utils/request';
import { changeTime } from '../../utils/time';

// 编辑事件信息的缓存
let changeWorkCache = {};
// 添加新事件信息的缓存
const newWorkCache = {};
export default function Pagea(props) {

    const columns = [
        {
            title: '事件名称',
            key: 'name',
            width: '20%'
        },
        {
            title: '备注',
            key: 'remarks',
            width: '20%'
        },
        {
            title: '创建时间',
            key: 'createTime',
        },
        {
            title: '结束时间',
            key: 'endTime',
        }
    ];
    // 表格数据
    const [dataSource, setDataSource] = useState([]);
    /**
     * 获取初始化数据
     */
    useEffect(() => {
        sendReq('init', {});
    }, []);
    /**
     * 事件操作
     * @param {*} action 
     * @param {*} item 
     * @param {*} index 
     */
    function opt(action, item, index) {
        switch (action) {
            case 'add':
                // 名称必填
                const obj = Object.assign({}, newWorkCache);
                if (!obj['name']) {
                    alert('事件名称必填！')
                    return
                }
                obj['createTime'] = changeTime('YYMMDDhhmmss', new Date());
                obj['endTime'] = '';
                sendReq(action, obj);
                break;
            case 'edit': // 编辑
                item['edit'] = true;
                changeWorkCache = {
                    name: item.name,
                    remarks: item.remarks
                };
                setDataSource([...dataSource]);
                break;
            case 'cancel': // 取消编辑
                item['edit'] = false;
                setDataSource([...dataSource]);
                break;
            case 'save': // 保存编辑
                // 名称必填
                if (!changeWorkCache['name']) {
                    if (!changeWorkCache['remarks']) {
                        // 无任何修改，取消编辑模式
                        item['edit'] = false;
                        setDataSource([...dataSource]);
                        return
                    };
                    alert('事件名称必填！')
                    return
                }
                item['edit'] = false;
                item['name'] = changeWorkCache['name'];
                item['remarks'] = changeWorkCache['remarks'] || '';
                sendReq(action, item);
                break;
            case 'delete': // 删除
                sendReq(action, { id: item.id }, index);
                break;
            case 'finish': // 完成
                item['endTime'] = changeTime('YYMMDDhhmmss', new Date());
                sendReq(action, item);
                break;
            default:
                break;
        }
    }

    /**
     * 发送请求
     * @param {*} action 
     * @param {*} param 
     * @param {*} index
     */
    function sendReq(action, param, index) {
        req(action, param, "POST").then((data) => {
            if (data.code === 1) {
                // 获取初始化数据
                switch (action) {
                    case 'add':
                        param['id'] = data.data.id;
                        setDataSource([...dataSource, param]);
                        break;
                    case 'init':
                        setDataSource(data.data.workList);
                        break;
                    case 'delete':
                        dataSource.splice(index, 1);
                        setDataSource([...dataSource]);
                        break;
                    case 'save':
                        setDataSource([...dataSource]);
                        changeWorkCache = {};
                        break;
                    case 'finish':
                        setDataSource([...dataSource]);
                        changeWorkCache = {};
                        break;
                    default:
                        break;
                };
            }
        })
    }

    /**
     * 编辑事件信息
     * @param {*} value 
     */
    function editValue(value) {
        changeWorkCache[value.target.name] = value.target.value;
    }

    /**
     * 添加新的事件
     * @param {*} value 
     */
    function addNew(value) {
        newWorkCache[value.target.name] = value.target.value;
    }

    return (
        <div className='pagea'>
            <p className='title'>待办事项</p>
            <div className="add">
                <input type="text" placeholder='事件名称' defaultValue='' name="name" onChange={addNew} />
                <input type="text" placeholder='备注' defaultValue='' name="remarks" onChange={addNew} />
                <button className='btn opt-edit' onClick={() => (opt('add'))}>添加</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            {/* 这一列是序号列 */}
                        </th>
                        {columns.map((item) => (
                            <th key={item.key} width={item.width}>{item.title}</th>
                        ))}
                        <th width={'30%'}>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {dataSource.map((item, idnex) => (
                        <tr key={item.id}>
                            {/* 序号 */}
                            <td>{idnex + 1}</td>
                            {/* 事件名称 */}
                            <td>
                                {item.edit ?
                                    <input type="text" name="name" defaultValue={item.name} onChange={editValue} />
                                    :
                                    item.name || ''
                                }
                            </td>
                            {/* 事件备注 */}
                            <td>
                                {item.edit ?
                                    <input type="text" name="remarks" defaultValue={item.remarks} onChange={editValue} />
                                    :
                                    item.remarks || ''
                                }
                            </td>
                            {/* 创建时间 */}
                            <td>{item.createTime || ''}</td>
                            {/* 结束时间 */}
                            <td>{item.endTime || ''}</td>
                            {/* 操作 */}
                            <td>
                                {item.edit ?
                                    <>
                                        <button className='btn opt-edit' onClick={() => (opt('save', item, idnex))}>保存</button>
                                        <button className='btn opt-edit' onClick={() => (opt('cancel', item, idnex))}>取消</button>
                                    </>
                                    :
                                    <button className='btn opt-edit' onClick={() => (opt('edit', item, idnex))}>编辑</button>
                                }
                                <button className='btn opt-delete' onClick={() => (opt('delete', item, idnex))}>删除</button>
                                <button className='btn opt-finish' onClick={() => (opt('finish', item, idnex))}>完成</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}