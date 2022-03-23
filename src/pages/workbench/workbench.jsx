import { renderRoutes } from 'react-router-config';
export default function Workbench(props) {
    return (
        <div>
            {renderRoutes(props.route.routes)}
        </div>
    )
}