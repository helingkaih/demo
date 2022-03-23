import { renderRoutes } from 'react-router-config';
export default function Home(props) {
    return (
        <div>
            {renderRoutes(props.route.routes)}
        </div>
    )
}