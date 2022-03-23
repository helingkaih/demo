import { renderRoutes } from 'react-router-config';
export default function Setting(props) {
    return (
        <div>
            {renderRoutes(props.route.routes)}
        </div>
    )
}