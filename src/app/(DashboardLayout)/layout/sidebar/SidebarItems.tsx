import React from 'react';
import { usePathname } from 'next/navigation';
import { Box, List, ListSubheader, styled, Theme } from '@mui/material';

import Menuitems from './MenuItems';
import NavItem from './NavItem';

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  const ListSubheaderStyle = styled((props: Theme | any) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********有子選單**********/}
          if (item.subheader) {
            return (
              <>
                <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>
                {item.items.map((childItem) => {
                  return (
                    <NavItem
                      item={childItem}
                      key={childItem.id}
                      pathDirect={pathDirect}
                      onClick={toggleMobileSidebar}
                    />
                  );
                })}
              </>
            );

            // {/********沒有子選單，直接顯示**********/}
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} onClick={toggleMobileSidebar} />;
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
