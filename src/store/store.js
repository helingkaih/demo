import { createStore } from 'redux';

const store = createStore((state = {
    activeRoute: '/home/pagea', // 默认是 /home/pagea 页面
}, action) => {
    switch (action.type) {
        case 'setActiveRoute':
            return {
                ...state,
                activeRoute: action.activeRoute
            }
        default:
            return state
    }
})
export default store