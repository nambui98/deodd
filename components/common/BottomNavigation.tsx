import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { DashboardIcon, FlipIcon, LoyaltyIcon, ShopIcon } from 'utils/Icons';

export default function MyBottomNavigation() {
    const [value, setValue] = React.useState('recents');
    //  const [value, setValue] = React.useState(0);
    //   const ref = React.useRef<HTMLDivElement>(null);
    //   const [messages, setMessages] = React.useState(() => refreshMessages());

    //   React.useEffect(() => {
    //     (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    //     setMessages(refreshMessages());
    //   }, [value, setMessages]);
    //     const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //         setValue(newValue);
    // };
    const handleChange = () => { }
    return (
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            <BottomNavigationAction
                label="Recents"
                value="recents"
                icon={<FlipIcon />}
            />
            <BottomNavigationAction
                label="Favorites"
                value="favorites"
                icon={<DashboardIcon />}
            />
            <BottomNavigationAction
                label="Nearby"
                value="nearby"
                icon={<ShopIcon />}
            />
            <BottomNavigationAction label="Folder" value="folder" icon={<LoyaltyIcon />} />
        </BottomNavigation>
    );
}