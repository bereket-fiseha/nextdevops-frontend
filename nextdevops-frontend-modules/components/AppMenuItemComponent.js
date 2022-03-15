import React, { forwardRef } from 'react'
import ListItem from '@material-ui/core/ListItem'
import Link from "next/link";
import styles from '../styles/Nav.module.css';
import clsx from 'clsx';
import { checkParent } from './AppMenu';



const AppMenuItemComponent = ({ className, onClick, link, children, name, hideDrawer, activeLink, parent, customerType }) => {

    let currentPerent = checkParent({ activeLink, customerType });
    // If link is not set return the orinary ListItem
    if (!link || typeof link !== 'string') {
        return (
            <ListItem
                button
                className={clsx(className, {
                    [styles.activeRootItem]: parent == currentPerent,
                })}
                // style={ parent == currentPerent ? { backgroundColor:'red'} : null } 
                children={children}
                onClick={onClick}
            />

        )
    }

    // Return a ListItem with a link component
    return (
        <>
            <ListItem
                button
                className={className}
                children={children}
                // assign ref of link for actual component redirect
                component={forwardRef((props, ref) => {
                    return (
                        <Link href={link}>
                            <span className={clsx(styles.sidebarMenu, {
                                [styles.activeItem]: link === activeLink,
                            })} onClick={() => hideDrawer(link)}>
                                {name}
                            </span>
                        </Link>
                    )
                })}
            />

        </>

    )
}

export default AppMenuItemComponent
